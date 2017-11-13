using System.ComponentModel.DataAnnotations;

namespace AbpCompanyName.AbpProjectName.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}