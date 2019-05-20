using System.Threading.Tasks;
using Abp.Application.Services;
using BoundedContext.Application.Dtos;

namespace BoundedContext.Application
{
    public interface IVehicleAppService : IApplicationService
    {
        Task CreateOrUpdateVehicle(CreateOrUpdateVehicleInput input);
    }
}
