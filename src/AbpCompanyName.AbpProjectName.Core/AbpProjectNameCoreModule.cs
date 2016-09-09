﻿using System.Reflection;
using Abp.Modules;
using Abp.Timing;
using Abp.Zero;
using AbpCompanyName.AbpProjectName.Localization;
using Abp.Zero.Configuration;
using AbpCompanyName.AbpProjectName.MultiTenancy;
using AbpCompanyName.AbpProjectName.Authorization.Roles;
using AbpCompanyName.AbpProjectName.Users;
using AbpCompanyName.AbpProjectName.Configuration;
using AbpCompanyName.AbpProjectName.Timing;

namespace AbpCompanyName.AbpProjectName
{
    [DependsOn(typeof(AbpZeroCoreModule))]
    public class AbpProjectNameCoreModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Auditing.IsEnabledForAnonymousUsers = true;

            //Declare entity types
            Configuration.Modules.Zero().EntityTypes.Tenant = typeof(Tenant);
            Configuration.Modules.Zero().EntityTypes.Role = typeof(Role);
            Configuration.Modules.Zero().EntityTypes.User = typeof(User);

            AbpProjectNameLocalizationConfigurer.Configure(Configuration.Localization);

            //todo@ismail -> check this.
            //Adding feature providers
            //Configuration.Features.Providers.Add<AppFeatureProvider>();

            //Adding setting providers
            Configuration.Settings.Providers.Add<AppSettingProvider>();

            //todo@ismail -> check this.
            //Adding notification providers
            //Configuration.Notifications.Providers.Add<AppNotificationProvider>();

            //Enable this line to create a multi-tenant application.
            Configuration.MultiTenancy.IsEnabled = true;

            //Enable LDAP authentication (It can be enabled only if MultiTenancy is disabled!)
            //Configuration.Modules.ZeroLdap().Enable(typeof(AppLdapAuthenticationSource));

            //Configure roles
            AppRoleConfig.Configure(Configuration.Modules.Zero().RoleManagement);
            
            //Configure permissions
            Configuration.Authorization.Providers.Add<AbpProjectNameAuthorizationProvider>();
            
            //todo@ismail -> check this.
            //if (DebugHelper.IsDebug)
            //{
            //    //Disabling email sending in debug mode
            //    IocManager.Register<IEmailSender, NullEmailSender>(DependencyLifeStyle.Transient);
            //}

            //todo@ismail -> check this.
            //Configuration.ReplaceService<IAbpSession, AspNetZeroAbpSession>();

        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }

        public override void PostInitialize()
        {
            IocManager.Resolve<AppTimes>().StartupTime = Clock.Now;
        }
    }
}
