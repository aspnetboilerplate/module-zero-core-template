FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/AbpCompanyName.AbpProjectName.Web.Host/AbpCompanyName.AbpProjectName.Web.Host.csproj", "src/AbpCompanyName.AbpProjectName.Web.Host/"]
COPY ["src/AbpCompanyName.AbpProjectName.Web.Core/AbpCompanyName.AbpProjectName.Web.Core.csproj", "src/AbpCompanyName.AbpProjectName.Web.Core/"]
COPY ["src/AbpCompanyName.AbpProjectName.Application/AbpCompanyName.AbpProjectName.Application.csproj", "src/AbpCompanyName.AbpProjectName.Application/"]
COPY ["src/AbpCompanyName.AbpProjectName.Core/AbpCompanyName.AbpProjectName.Core.csproj", "src/AbpCompanyName.AbpProjectName.Core/"]
COPY ["src/AbpCompanyName.AbpProjectName.EntityFrameworkCore/AbpCompanyName.AbpProjectName.EntityFrameworkCore.csproj", "src/AbpCompanyName.AbpProjectName.EntityFrameworkCore/"]
WORKDIR "/src/src/AbpCompanyName.AbpProjectName.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/AbpCompanyName.AbpProjectName.Web.Host", "src/AbpCompanyName.AbpProjectName.Web.Host"]
COPY ["src/AbpCompanyName.AbpProjectName.Web.Core", "src/AbpCompanyName.AbpProjectName.Web.Core"]
COPY ["src/AbpCompanyName.AbpProjectName.Application", "src/AbpCompanyName.AbpProjectName.Application"]
COPY ["src/AbpCompanyName.AbpProjectName.Core", "src/AbpCompanyName.AbpProjectName.Core"]
COPY ["src/AbpCompanyName.AbpProjectName.EntityFrameworkCore", "src/AbpCompanyName.AbpProjectName.EntityFrameworkCore"]
WORKDIR "/src/src/AbpCompanyName.AbpProjectName.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "AbpCompanyName.AbpProjectName.Web.Host.dll"]
