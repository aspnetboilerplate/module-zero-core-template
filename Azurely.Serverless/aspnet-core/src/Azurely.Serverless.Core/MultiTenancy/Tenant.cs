using Abp.MultiTenancy;
using Azurely.Serverless.Authorization.Users;

namespace Azurely.Serverless.MultiTenancy
{
    public class Tenant : AbpTenant<User>
    {
        public Tenant()
        {            
        }

        public Tenant(string tenancyName, string name)
            : base(tenancyName, name)
        {
        }
    }
}

