using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Abp.Configuration;
using Abp.Net.Mail;
using Abp.Zero.Configuration;
using AbpCompanyName.AbpProjectName.Authorization.Accounts.Dto;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AbpCompanyName.AbpProjectName.Authorization.Accounts
{
    public class AccountAppService : AbpProjectNameAppServiceBase, IAccountAppService
    {
        private readonly UserRegistrationManager _userRegistrationManager;
        private readonly UserManager _userManager;
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _configuration;

        public AccountAppService(
            UserRegistrationManager userRegistrationManager,
            UserManager userManager,
            IEmailSender emailSender,
            IConfiguration configuration)
        {
            _userRegistrationManager = userRegistrationManager;
            _userManager = userManager;
            _emailSender = emailSender;
            _configuration = configuration;
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
            var user = await _userManager.FindByNameOrEmailAsync(AbpSession.TenantId, userNameOrEmailAddress);
            if (user == null)
            {
                return;
            }

            user.SetNewPasswordResetCode();
            var passwordResetCode = user.PasswordResetCode;

            var email = this.L(
                "PasswordResetEmailBody",
                _configuration.GetSection("App:ClientRootAddress").Value.TrimEnd('/'),
                user.TenantId,
                user.Id,
                WebUtility.UrlEncode(passwordResetCode));
            
            _emailSender.Send(
                from: (await SettingManager.GetSettingValueAsync(EmailSettingNames.DefaultFromAddress)),
                to: user.EmailAddress,
                subject: this.L("PasswordResetEmailSubject"),
                body: email,
                isBodyHtml: true
            );
            
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

                var result = await _userManager.BasicResetPasswordAsync(user, token, newPassword);

                if (!result.Succeeded)
                {
                    throw new Exception(result.Errors.FirstOrDefault()?.ToString());
                }
            }
        }
    }
}