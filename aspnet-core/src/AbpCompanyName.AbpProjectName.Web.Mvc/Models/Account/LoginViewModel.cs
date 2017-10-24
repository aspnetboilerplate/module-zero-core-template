using System.ComponentModel.DataAnnotations;

namespace AbpCompanyName.AbpProjectName.Web.Models.Account
{
    public class LoginViewModel
    {
        [Required]
        public string UsernameOrEmailAddress { get; set; }

        [Required]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}
