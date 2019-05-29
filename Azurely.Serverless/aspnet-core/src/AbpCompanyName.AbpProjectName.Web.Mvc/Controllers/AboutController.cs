﻿using Microsoft.AspNetCore.Mvc;
using Abp.AspNetCore.Mvc.Authorization;
using Azurely.Serverless.Controllers;

namespace Azurely.Serverless.Web.Controllers
{
    [AbpMvcAuthorize]
    public class AboutController : ServerlessControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
	}
}

