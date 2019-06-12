using System.Threading.Tasks;
using Abp.Application.Services;
namespace Azurely.Serverless.Storage
{
    public interface IStorageAppService : IApplicationService
    {
        Task<string> UploadBlobAsync(Microsoft.AspNetCore.Http.IFormFile File);

        Task<string> UploadFileAsBlob(System.IO.Stream stream, string filename);
    }
}

