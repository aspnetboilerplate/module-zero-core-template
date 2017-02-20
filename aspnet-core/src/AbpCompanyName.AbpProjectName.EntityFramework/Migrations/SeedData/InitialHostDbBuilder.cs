using AbpCompanyName.AbpProjectName.EntityFramework;
using EntityFramework.DynamicFilters;

namespace AbpCompanyName.AbpProjectName.Migrations.SeedData
{
    public class InitialHostDbBuilder
    {
        private readonly AbpProjectNameDbContext _context;

        public InitialHostDbBuilder(AbpProjectNameDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            _context.DisableAllFilters();

            new DefaultEditionsCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new HostRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();
        }
    }
}
