using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Xunit;

namespace AbpCompanyName.AbpProjectName.Tests.AutoMapper
{
    public class AutoMapper_Tests : AbpProjectNameTestBase
    {
        [Fact]
        public void AssertConfigurationIsValid_Test()
        {
            var mapper = Resolve<IMapper>();
            mapper.ConfigurationProvider.AssertConfigurationIsValid();
        }
    }
}
