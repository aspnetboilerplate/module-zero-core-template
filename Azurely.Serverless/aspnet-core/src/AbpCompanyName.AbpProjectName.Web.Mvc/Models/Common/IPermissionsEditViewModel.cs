using System.Collections.Generic;
using Azurely.Serverless.Roles.Dto;

namespace Azurely.Serverless.Web.Models.Common
{
    public interface IPermissionsEditViewModel
    {
        List<FlatPermissionDto> Permissions { get; set; }
    }
}
