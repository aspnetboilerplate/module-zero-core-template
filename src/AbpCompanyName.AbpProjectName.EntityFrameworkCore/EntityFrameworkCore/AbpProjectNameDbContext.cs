using Abp.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AbpCompanyName.AbpProjectName.EntityFrameworkCore
{
    public class AbpProjectNameDbContext : AbpDbContext
    {
        public AbpProjectNameDbContext(DbContextOptions<AbpProjectNameDbContext> options) 
            : base(options)
        {

        }
    }
}
