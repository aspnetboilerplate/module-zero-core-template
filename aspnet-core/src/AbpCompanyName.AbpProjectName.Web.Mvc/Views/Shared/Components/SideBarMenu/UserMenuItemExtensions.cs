using Abp.Application.Navigation;
using System.Collections.Generic;
using System.Linq;

namespace AbpCompanyName.AbpProjectName.Web.Views.Shared.Components.SideBarMenu
{
    public static class UserMenuItemExtensions
    {
        public static IOrderedEnumerable<UserMenuItem> OrderByCustom(this IEnumerable<UserMenuItem> menuItems)
        {
            return menuItems
                .OrderBy(menuItem => menuItem.Order)
                .ThenBy(menuItem => menuItem.DisplayName);
        }
    }
}
