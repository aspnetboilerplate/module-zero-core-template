using Microsoft.AspNetCore.Mvc;
using Abp.AspNetCore.Mvc.Authorization;
using AbpCompanyName.AbpProjectName.Controllers;
using AbpCompanyName.AbpProjectName.MultiTenancy;
using AbpCompanyName.AbpProjectName.Roles;
using AbpCompanyName.AbpProjectName.Users;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.Web.Controllers
{
    [AbpMvcAuthorize]
    public class HomeController : AbpProjectNameControllerBase
    {
        private readonly ITenantAppService _tenantAppService;
        private readonly IUserAppService _userAppService;
        private readonly IRoleAppService _roleAppService;

        public HomeController(ITenantAppService tenantAppService,
            IUserAppService userAppService,
            IRoleAppService roleAppService)
        {
            _tenantAppService = tenantAppService;
            _userAppService = userAppService;
            _roleAppService = roleAppService;
        }

        public async Task<ActionResult> Index()
        {
            return View();
        }
    }
}
