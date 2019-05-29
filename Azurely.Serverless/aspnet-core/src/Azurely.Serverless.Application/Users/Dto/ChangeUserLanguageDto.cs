using System.ComponentModel.DataAnnotations;

namespace Azurely.Serverless.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}
