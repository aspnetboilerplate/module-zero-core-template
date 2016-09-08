using System;
using System.Threading;
using Abp.Dependency;
using Abp.MultiTenancy;
using Abp.Runtime.Session;
using Microsoft.AspNetCore.Http;
using AbpCompanyName.AbpProjectName.MultiTenancy;

namespace AbpCompanyName.AbpProjectName.Web.MultiTenancy
{
    /// <summary>
    /// Implements <see cref="ITenantIdAccessor"/> to try to get current tenant id
    /// using <see cref="ITenancyNameFinder"/> and using <see cref="HttpContext"/>
    /// </summary>
    public class TenantIdAccessor : ITenantIdAccessor, ISingletonDependency
    {
        private const string HttpContextKey = "AbpProjectNameCurrentTenantCacheItem";

        private readonly ITenantCache _tenantCache;
        private readonly IIocResolver _iocResolver;
        private readonly IHttpContextAccessor _httpContextAccessor;

        private readonly AsyncLocal<int?> _currentTenant;
        private readonly Lazy<IAbpSession> _abpSession;
        private readonly Lazy<ITenancyNameFinder> _tenancyNameFinder;

        private int? CurrentTenantId
        {
            get
            {
                if (_httpContextAccessor.HttpContext != null)
                {
                    _currentTenant.Value = _httpContextAccessor.HttpContext.Items[HttpContextKey] as int?;
                    return _currentTenant.Value;
                }

                return _currentTenant.Value;
            }

            set
            {
                _currentTenant.Value = value;
                if (_httpContextAccessor.HttpContext != null)
                {
                    _httpContextAccessor.HttpContext.Items[HttpContextKey] = _currentTenant.Value;
                }
            }
        }

        public TenantIdAccessor(
            ITenantCache tenantCache,
            IIocResolver iocResolver,
            IHttpContextAccessor httpContextAccessor)
        {
            _tenantCache = tenantCache;
            _iocResolver = iocResolver;
            _httpContextAccessor = httpContextAccessor;

            _currentTenant = new AsyncLocal<int?>();
            _abpSession = new Lazy<IAbpSession>(() => _iocResolver.Resolve<IAbpSession>(), true);
            _tenancyNameFinder = new Lazy<ITenancyNameFinder>(() => _iocResolver.Resolve<ITenancyNameFinder>(), true);
        }

        /// <summary>
        /// Gets current tenant id.
        /// Use <see cref="IAbpSession.TenantId"/> wherever possible (if user logged in).
        /// This method tries to get current tenant id even if current user did not log in.
        /// </summary>
        /// <param name="useSession">Set false to skip session usage</param>
        public int? GetCurrentTenantIdOrNull(bool useSession = true)
        {
            if (useSession)
            {
                return _abpSession.Value.TenantId;
            }

            return CurrentTenantId;
        }

        /// <summary>
        /// This method is called on request beginning to obtain current tenant id.
        /// </summary>
        public void SetCurrentTenantId()
        {
            var tenancyName = _tenancyNameFinder.Value.GetCurrentTenancyNameOrNull();
            if (tenancyName == null)
            {
                CurrentTenantId = null;
                return;
            }

            CurrentTenantId = _tenantCache.GetOrNull(tenancyName)?.Id;
        }
    }
}