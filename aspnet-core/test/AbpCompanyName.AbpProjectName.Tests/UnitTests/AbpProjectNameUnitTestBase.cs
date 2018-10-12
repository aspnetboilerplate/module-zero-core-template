using Abp.Dependency;
using Abp.ObjectMapping;
using Abp.TestBase;
using AbpCompanyName.AbpProjectName.Tests.UnitTests.FakeServices;
using Castle.Core.Logging;
using Castle.MicroKernel.Registration;

namespace AbpCompanyName.AbpProjectName.Tests.UnitTests
{
    public abstract class AbpProjectNameUnitTestBase : AbpIntegratedTestBase<UnitTestModule>
    {
        private FakeLogger FakeLogger { get; set; }
        private new IIocManager LocalIocManager { get; set; }
        protected IObjectMapper ObjectMapper { get; set; }

        public AbpProjectNameUnitTestBase()
        {
            ObjectMapper = base.LocalIocManager.Resolve<IObjectMapper>();
            FakeLogger = new FakeLogger();
            LocalIocManager = new IocManager();
            LocalIocManager.IocContainer.Register(Component.For<ILogger>().Instance(FakeLogger));
        }
    }
}
