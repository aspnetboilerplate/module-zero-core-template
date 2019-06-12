using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.IO;

namespace Azurely.Serverless.Storage
{
    public class StorageAppService : ServerlessAppServiceBase, IStorageAppService
    {
        [HttpPost]
        public async System.Threading.Tasks.Task<string> UploadBlobAsync(Microsoft.AspNetCore.Http.IFormFile file)
        {
            var _StorageFlag = System.Convert.ToBoolean(Azurely.Serverless.Configuration.AppConfigurations.GetAppSettingsValue("IsAzureStorageUploadsEnabled"));
            string _url = string.Empty;
            if (_StorageFlag)
            {
                var _stream = file.OpenReadStream();
                var _name = file.FileName;
                _url = await UploadFileAsBlob(_stream, _name);
            }
            else
            {
                //save to DB or File system
            }
            return _url; //null just to make error free
        }

        /// Upload file in azure storage
        /// </summary>
        /// <param name="stream"></param>
        /// <param name="filename"></param>
        /// <returns></returns>
        public async System.Threading.Tasks.Task<string> UploadFileAsBlob(Stream stream, string filename)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(Azurely.Serverless.Configuration.AppConfigurations.GetAppSettingsValue("AzureStorageStorageConnectionString"));

            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();            

            // Retrieve a reference to a container.
            CloudBlobContainer container = blobClient.GetContainerReference(Azurely.Serverless.Configuration.AppConfigurations.GetAppSettingsValue("AzureStorageContainerName"));

            CloudBlockBlob blockBlob = container.GetBlockBlobReference(filename);

            await blockBlob.UploadFromStreamAsync(stream);

            stream.Dispose();
            return blockBlob?.Uri.ToString();
        }
    }
}

