[![Build Status](https://dev.azure.com/rajanbhayana/azurely-serverless/_apis/build/status/rajanbhayana.Azurely-Serverless?branchName=master)](https://dev.azure.com/rajanbhayana/azurely-serverless/_build/latest?definitionId=1&branchName=master)


# Introduction

This is a template to provide a base project with Devops and Azure Integrations for **ASP.NET Core MVC / Angular** based startup projects. It is derived using ASPNETBoilerPlate template. Repository provides 3 key Resources to speed up website builds.
- ARM Template to create azure hosting, leveraging standard HA/DR template - https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/app-service-web-app/multi-region
- YAML File to speed up CI/CD using github and Azure Devops.
- ASPNETCORE source code with full integration to azure services. Integration include
 - Log Management to Application Insights
 - Storage/Uploads to Azure Blob Storage
 - Azure Redis cache for cache Management
 - Web apps for front end hosting 
 - Azure Functions for Batch Jobs (Template provided)
 - Azure SQL Serverless DB for backend.
 - All Replication around multiregion setup.

1. [ASP.NET Core MVC & jQuery](https://aspnetboilerplate.com/Pages/Documents/Zero/Startup-Template-Core) (server rendered multi-page application).
2. [ASP.NET Core & Angular](https://aspnetboilerplate.com/Pages/Documents/Zero/Startup-Template-Angular) (single page application).
 
 
 # Documentation

* [ASP.NET Core MVC & jQuery version.](https://aspnetboilerplate.com/Pages/Documents/Zero/Startup-Template-Core)
* [ASP.NET Core & Angular  version.](https://aspnetboilerplate.com/Pages/Documents/Zero/Startup-Template-Angular)

# License

[MIT](LICENSE).
