using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Abp.Authorization.Users;
using Abp.AutoMapper;
using Abp.Configuration.Startup;
using Abp.Domain.Uow;
using Abp.Extensions;
using Abp.Threading;
using Abp.UI;
using Abp.Web.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Mvc;
using AbpCompanyName.AbpProjectName.Authorization;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.MultiTenancy;
using AbpCompanyName.AbpProjectName.Web.MultiTenancy;
using AbpCompanyName.AbpProjectName.Users;
using AbpCompanyName.AbpProjectName.Web.Authentication;
using AbpCompanyName.AbpProjectName.Web.Models.Account;

namespace AbpCompanyName.AbpProjectName.Web.Controllers
{
    public class AccountController : AbpProjectNameControllerBase
    {
        private readonly UserManager _userManager;
        private readonly RoleManager _roleManager;
        private readonly TenantManager _tenantManager;
        private readonly IMultiTenancyConfig _multiTenancyConfig;
        private readonly IUnitOfWorkManager _unitOfWorkManager;
        private readonly ITenancyNameFinder _tenancyNameFinder;
        private readonly AbpLoginResultTypeHelper _abpLoginResultTypeHelper;

        public AccountController(
            UserManager userManager,
            IMultiTenancyConfig multiTenancyConfig,
            RoleManager roleManager,
            TenantManager tenantManager,
            IUnitOfWorkManager unitOfWorkManager,
            ITenancyNameFinder tenancyNameFinder,
            AbpLoginResultTypeHelper abpLoginResultTypeHelper)
        {
            _userManager = userManager;
            _multiTenancyConfig = multiTenancyConfig;
            _roleManager = roleManager;
            _tenantManager = tenantManager;
            _unitOfWorkManager = unitOfWorkManager;
            _tenancyNameFinder = tenancyNameFinder;
            _abpLoginResultTypeHelper = abpLoginResultTypeHelper;
        }

        #region Login / Logout

        public ActionResult Login(string userNameOrEmailAddress = "", string returnUrl = "", string successMessage = "")
        {
            if (string.IsNullOrWhiteSpace(returnUrl))
            {
                returnUrl = GetAppHomeUrl();
            }

            return View(new LoginFormViewModel
            {
                ReturnUrl = returnUrl,
                IsMultiTenancyEnabled = _multiTenancyConfig.IsEnabled
            });
        }

        [HttpPost]
        [UnitOfWork]
        public virtual async Task<JsonResult> Login(LoginViewModel loginModel, string returnUrl = "",
            string returnUrlHash = "")
        {
            var loginResult = await GetLoginResultAsync(loginModel.UsernameOrEmailAddress, loginModel.Password, loginModel.TenancyName);

            await SignInAsync(loginResult.User, loginResult.Identity, loginModel.RememberMe);
            await UnitOfWorkManager.Current.SaveChangesAsync();

            if (string.IsNullOrWhiteSpace(returnUrl))
            {
                returnUrl = GetAppHomeUrl();
            }

            if (!string.IsNullOrWhiteSpace(returnUrlHash))
            {
                returnUrl = returnUrl + returnUrlHash;
            }

            return Json(new AjaxResponse { TargetUrl = returnUrl });
        }

        public async Task<ActionResult> Logout()
        {
            await HttpContext.Authentication.SignOutAsync(Startup.AuthConfigurer.AuthenticationScheme);
            return RedirectToAction("Login");
        }

        private async Task SignInAsync(User user, ClaimsIdentity identity = null, bool rememberMe = false)
        {
            if (identity == null)
            {
                identity = await _userManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            }

            await HttpContext.Authentication.SignOutAsync(Startup.AuthConfigurer.AuthenticationScheme);
            await HttpContext.Authentication.SignInAsync(
                Startup.AuthConfigurer.AuthenticationScheme,
                new ClaimsPrincipal(identity),
                new Microsoft.AspNetCore.Http.Authentication.AuthenticationProperties
                {
                    IsPersistent = rememberMe
                }
            );
        }

        private async Task<AbpUserManager<Tenant, Role, User>.AbpLoginResult> GetLoginResultAsync(
            string usernameOrEmailAddress, string password, string tenancyName)
        {
            var loginResult = await _userManager.LoginAsync(usernameOrEmailAddress, password, tenancyName);

            switch (loginResult.Result)
            {
                case AbpLoginResultType.Success:
                    return loginResult;
                default:
                    throw _abpLoginResultTypeHelper.CreateExceptionForFailedLoginAttempt(loginResult.Result,
                        usernameOrEmailAddress, tenancyName);
            }
        }

        #endregion

        #region Register

        public ActionResult Register()
        {
            return RegisterView(new RegisterViewModel());
        }

        private ActionResult RegisterView(RegisterViewModel model)
        {
            ViewBag.IsMultiTenancyEnabled = _multiTenancyConfig.IsEnabled;

            return View("Register", model);
        }

        [HttpPost]
        [UnitOfWork]
        public virtual async Task<ActionResult> Register(RegisterViewModel model)
        {
            try
            {
                //Get tenancy name and tenant
                if (!_multiTenancyConfig.IsEnabled)
                {
                    model.TenancyName = Tenant.DefaultTenantName;
                }
                else if (model.TenancyName.IsNullOrEmpty())
                {
                    throw new UserFriendlyException(L("TenantNameCanNotBeEmpty"));
                }

                CurrentUnitOfWork.SetTenantId(null);

                var tenant = await GetActiveTenantAsync(model.TenancyName);

                CurrentUnitOfWork.SetTenantId(tenant.Id);

                //Create user
                var user = new User
                {
                    TenantId = tenant.Id,
                    Name = model.Name,
                    Surname = model.Surname,
                    EmailAddress = model.EmailAddress,
                    IsActive = true
                };

                //Get external login info if possible
                ExternalLoginUserInfo externalLoginInfo = null;
                if (model.IsExternalLogin)
                {
                    externalLoginInfo = await HttpContext.Authentication.GetExternalLoginUserInfo(model.ExternalLoginAuthSchema);
                    if (externalLoginInfo == null)
                    {
                        throw new ApplicationException("Can not external login!");
                    }

                    user.Logins = new List<UserLogin>
                    {
                        new UserLogin
                        {
                            LoginProvider = externalLoginInfo.LoginInfo.LoginProvider,
                            ProviderKey = externalLoginInfo.LoginInfo.ProviderKey,
                            TenantId = tenant.Id
                        }
                    };

                    model.UserName = model.UserName;
                    model.Password = Users.User.CreateRandomPassword();

                    if (string.Equals(externalLoginInfo.EmailAddress, model.EmailAddress, StringComparison.InvariantCultureIgnoreCase))
                    {
                        user.IsEmailConfirmed = true;
                    }
                }
                else
                {
                    if (model.UserName.IsNullOrEmpty() || model.Password.IsNullOrEmpty())
                    {
                        throw new UserFriendlyException(L("FormIsNotValidMessage"));
                    }
                }

                user.UserName = model.UserName;
                user.Password = new PasswordHasher().HashPassword(model.Password);

                //Add default roles
                user.Roles = new List<UserRole>();
                foreach (var defaultRole in await _roleManager.Roles.Where(r => r.IsDefault).ToListAsync())
                {
                    user.Roles.Add(new UserRole { RoleId = defaultRole.Id });
                }

                //Save user
                CheckErrors(await _userManager.CreateAsync(user));
                await _unitOfWorkManager.Current.SaveChangesAsync();

                //Directly login if possible
                if (user.IsActive)
                {
                    AbpUserManager<Tenant, Role, User>.AbpLoginResult loginResult;
                    if (externalLoginInfo != null)
                    {
                        loginResult = await _userManager.LoginAsync(externalLoginInfo.LoginInfo, tenant.TenancyName);
                    }
                    else
                    {
                        loginResult = await GetLoginResultAsync(user.UserName, model.Password, tenant.TenancyName);
                    }

                    if (loginResult.Result == AbpLoginResultType.Success)
                    {
                        await SignInAsync(loginResult.User, loginResult.Identity);
                        return Redirect(Url.Action("Index", "Home"));
                    }

                    Logger.Warn("New registered user could not be login. This should not be normally. login result: " + loginResult.Result);
                }

                //If can not login, show a register result page
                return View("RegisterResult", new RegisterResultViewModel
                {
                    TenancyName = tenant.TenancyName,
                    NameAndSurname = user.Name + " " + user.Surname,
                    UserName = user.UserName,
                    EmailAddress = user.EmailAddress,
                    IsActive = user.IsActive
                });
            }
            catch (UserFriendlyException ex)
            {
                ViewBag.IsMultiTenancyEnabled = _multiTenancyConfig.IsEnabled;
                ViewBag.ErrorMessage = ex.Message;

                return View("Register", model);
            }
        }

        #endregion

        #region External Login

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            var redirectUrl = Url.Action(
                "ExternalLoginCallback",
                "Account",
                new
                {
                    ReturnUrl = returnUrl,
                    tenancyName = _tenancyNameFinder.GetCurrentTenancyNameOrNull() ?? "",
                    authSchema = provider
                });

            return Challenge(
                new Microsoft.AspNetCore.Http.Authentication.AuthenticationProperties
                {
                    Items = { { "LoginProvider", provider } },
                    RedirectUri = redirectUrl
                },
                provider
            );
        }

        [UnitOfWork]
        public virtual async Task<ActionResult> ExternalLoginCallback(string returnUrl, string authSchema, string tenancyName = "", string remoteError = null)
        {
            if (remoteError != null)
            {
                Logger.Error("Remote Error in ExternalLoginCallback: " + remoteError);
                throw new UserFriendlyException(L("CouldNotCompleteLoginOperation"));
            }

            var userInfo = await HttpContext.Authentication.GetExternalLoginUserInfo(authSchema);

            if (userInfo.LoginInfo.LoginProvider.IsNullOrEmpty() || userInfo.LoginInfo.ProviderKey.IsNullOrEmpty())
            {
                Logger.Warn("Could not get LoginProvider and ProviderKey from external login.");
                return RedirectToAction("Login");
            }

            //Try to find tenancy name
            if (tenancyName.IsNullOrEmpty())
            {
                tenancyName = _tenancyNameFinder.GetCurrentTenancyNameOrNull();
                if (tenancyName.IsNullOrEmpty())
                {
                    var tenants = await FindPossibleTenantsOfUserAsync(userInfo.LoginInfo);
                    switch (tenants.Count)
                    {
                        case 0:
                            return await RegisterViewForExternalLogin(userInfo, tenancyName);
                        case 1:
                            tenancyName = tenants[0].TenancyName;
                            break;
                        default:
                            return View("TenantSelection", new TenantSelectionViewModel
                            {
                                Action = "ExternalLoginCallback",
                                ReturnUrl = returnUrl,
                                AuthSchema = authSchema,
                                Tenants = tenants.MapTo<List<TenantSelectionViewModel.TenantInfo>>()
                            });
                    }
                }
            }

            var loginResult = await _userManager.LoginAsync(userInfo.LoginInfo, tenancyName);

            switch (loginResult.Result)
            {
                case AbpLoginResultType.Success:
                    await SignInAsync(loginResult.User, loginResult.Identity, true);

                    if (string.IsNullOrWhiteSpace(returnUrl))
                    {
                        returnUrl = GetAppHomeUrl();
                    }

                    return Redirect(returnUrl);
                case AbpLoginResultType.UnknownExternalLogin:
                    return await RegisterViewForExternalLogin(userInfo, tenancyName);
                default:
                    throw _abpLoginResultTypeHelper.CreateExceptionForFailedLoginAttempt(
                        loginResult.Result,
                        userInfo.EmailAddress ?? userInfo.LoginInfo.ProviderKey,
                        tenancyName
                    );
            }
        }

        private async Task<ActionResult> RegisterViewForExternalLogin(ExternalLoginUserInfo userInfo, string tenancyName = null)
        {
            var viewModel = new RegisterViewModel
            {
                TenancyName = tenancyName,
                EmailAddress = userInfo.EmailAddress,
                Name = userInfo.Name,
                Surname = userInfo.Surname,
                IsExternalLogin = true,
                ExternalLoginAuthSchema = userInfo.LoginInfo.LoginProvider
            };

            if (!tenancyName.IsNullOrEmpty() && userInfo.HasAllNonEmpty())
            {
                return await Register(viewModel);
            }

            return RegisterView(viewModel);
        }

        [UnitOfWork]
        protected virtual async Task<List<Tenant>> FindPossibleTenantsOfUserAsync(UserLoginInfo login)
        {
            List<User> allUsers;
            using (_unitOfWorkManager.Current.DisableFilter(AbpDataFilters.MayHaveTenant))
            {
                allUsers = await _userManager.FindAllAsync(login);
            }

            return allUsers
                .Where(u => u.TenantId != null)
                .Select(u => AsyncHelper.RunSync(() => _tenantManager.FindByIdAsync(u.TenantId.Value)))
                .ToList();
        }

        #endregion

        #region Common private methods

        private async Task<Tenant> GetActiveTenantAsync(string tenancyName)
        {
            var tenant = await _tenantManager.FindByTenancyNameAsync(tenancyName);
            if (tenant == null)
            {
                throw new UserFriendlyException(L("ThereIsNoTenantDefinedWithName{0}", tenancyName));
            }

            if (!tenant.IsActive)
            {
                throw new UserFriendlyException(L("TenantIsNotActive", tenancyName));
            }

            return tenant;
        }

        #endregion

        #region Helpers

        public ActionResult RedirectToAppHome()
        {
            return RedirectToAction("Index", "Home");
        }

        public string GetAppHomeUrl()
        {
            return Url.Action("Index", "Home");
        }

        #endregion
    }
}