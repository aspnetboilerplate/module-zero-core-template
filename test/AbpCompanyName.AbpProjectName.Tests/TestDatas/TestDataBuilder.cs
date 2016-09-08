using AbpCompanyName.AbpProjectName.EntityFramework;

namespace AbpCompanyName.AbpProjectName.Tests.TestDatas
{
    public class TestDataBuilder
    {
        private readonly AbpProjectNameDbContext _context;

        public TestDataBuilder(AbpProjectNameDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            //create test data here...
        }
    }
}