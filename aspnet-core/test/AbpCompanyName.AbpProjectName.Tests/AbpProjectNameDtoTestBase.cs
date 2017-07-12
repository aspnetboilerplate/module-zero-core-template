using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

using Shouldly;

namespace AbpCompanyName.AbpProjectName.Tests
{
    public abstract class AbpProjectNameDtoTestBase<TDto>
        where TDto : class
    {
        protected abstract TDto GetDto();

        protected async Task Validate(TDto createDto)
        {
            ValidationContext context = new ValidationContext(createDto);
            ICollection<ValidationResult> results = new List<ValidationResult>();
            bool isValid = Validator.TryValidateObject(createDto, context, results, true);

            if (!isValid)
            {
                var message = "";
                foreach (ValidationResult result in results)
                {
                    message += result.ErrorMessage;
                }

                throw new ShouldAssertException(message);
            }
        }
    }
}
