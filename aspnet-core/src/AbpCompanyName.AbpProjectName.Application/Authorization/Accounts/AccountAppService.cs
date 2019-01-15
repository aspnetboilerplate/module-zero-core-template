using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Abp.Configuration;
using Abp.Domain.Uow;
using Abp.Net.Mail;
using Abp.Zero.Configuration;
using AbpCompanyName.AbpProjectName.Authorization.Accounts.Dto;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using Microsoft.EntityFrameworkCore;

namespace AbpCompanyName.AbpProjectName.Authorization.Accounts
{
    public class AccountAppService : AbpProjectNameAppServiceBase, IAccountAppService
    {
        private readonly UserRegistrationManager _userRegistrationManager;
        private readonly UserManager _userManager;
        private readonly IEmailSender _emailSender;

        public AccountAppService(
            UserRegistrationManager userRegistrationManager,
            UserManager userManager,
            IEmailSender emailSender
        )
        {
            _userRegistrationManager = userRegistrationManager;
            _userManager = userManager;
            _emailSender = emailSender;
        }

        public async Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input)
        {
            var tenant = await TenantManager.FindByTenancyNameAsync(input.TenancyName);
            if (tenant == null)
            {
                return new IsTenantAvailableOutput(TenantAvailabilityState.NotFound);
            }

            if (!tenant.IsActive)
            {
                return new IsTenantAvailableOutput(TenantAvailabilityState.InActive);
            }

            return new IsTenantAvailableOutput(TenantAvailabilityState.Available, tenant.Id);
        }

        public async Task<RegisterOutput> Register(RegisterInput input)
        {
            var user = await _userRegistrationManager.RegisterAsync(
                input.Name,
                input.Surname,
                input.EmailAddress,
                input.UserName,
                input.Password,
                true // Assumed email address is always confirmed. Change this if you want to implement email confirmation.
            );

            var isEmailConfirmationRequiredForLogin = await SettingManager.GetSettingValueAsync<bool>(
                AbpZeroSettingNames.UserManagement.IsEmailConfirmationRequiredForLogin);

            return new RegisterOutput
            {
                CanLogin = user.IsActive && (user.IsEmailConfirmed || !isEmailConfirmationRequiredForLogin)
            };
        }

        public async Task SendPasswordResetEmail(string userNameOrEmailAddress)
        {
            // validate if tenant is valid
            var tenant = await _userRegistrationManager.GetActiveTenantAsync();

            // use from absession since host is a possibility
            var user = await _userManager.FindByNameOrEmailAsync(AbpSession.TenantId, userNameOrEmailAddress);
            if (user == null)
            {
                // don't throw erros to avoid security issue
                // pretend the email was sent
                return;
            }

            user.SetNewPasswordResetCode();
            var passwordResetCode = user.PasswordResetCode;

            // TODO: verify if this is the best possible solution
            // -> maybe the client should send the base address during request
            // -> maybe the client should send the address structure during request
            // ---> I don't think the back-end should have any knowledge of the URL or its structure, but this works for now
            var email = this.L(
                "PasswordResetEmailBody",
                AppConsts.ClientRootAddress.TrimEnd('/'),
                user.TenantId,
                user.Id,
                WebUtility.UrlEncode(passwordResetCode));

#if DEBUG
            Console.WriteLine(email);
#endif
            try
            {
                _emailSender.Send(
                    from: (await SettingManager.GetSettingValueAsync(EmailSettingNames.DefaultFromAddress)),
                    to: user.EmailAddress,
                    subject: this.L("PasswordResetEmailSubject"),
                    body: email,
                    isBodyHtml: true
                );
            }
            catch (Exception)
            {
                // ignored
            }
        }

        public async Task<bool> VerifyPasswordResetCode(int? tenantId, long userId, string passwordResetCode)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var user = await _userManager.GetUserByIdAsync(userId);

                return await _userManager.VerifyPasswordResetCodeAsync(user, passwordResetCode);
            }
        }

        public async Task ResetPassword(int? tenantId, long userId, string token, string newPassword)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var user = await _userManager.GetUserByIdAsync(userId);

                await _userManager.BasicResetPasswordAsync(user, token, newPassword);
            }
        }
    }
}