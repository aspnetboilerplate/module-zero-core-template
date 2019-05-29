using Abp.Application.Features;
using Abp.Domain.Repositories;
using Abp.MultiTenancy;
using Azurely.Serverless.Authorization.Users;
using Azurely.Serverless.Editions;

namespace Azurely.Serverless.MultiTenancy
{
    public class TenantManager : AbpTenantManager<Tenant, User>
    {
        public TenantManager(
            IRepository<Tenant> tenantRepository, 
            IRepository<TenantFeatureSetting, long> tenantFeatureRepository, 
            EditionManager editionManager,
            IAbpZeroFeatureValueStore featureValueStore) 
            : base(
                tenantRepository, 
                tenantFeatureRepository, 
                editionManager,
                featureValueStore)
        {
        }
    }
}

