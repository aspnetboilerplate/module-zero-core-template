using System.ComponentModel.DataAnnotations;

namespace AbpCompanyName.AbpProjectName.Configuration.Dto
{
    public class ChangeUiThemeInput
    {
        [Required]
        [MaxLength(32)]
        public string Theme { get; set; }
    }
}