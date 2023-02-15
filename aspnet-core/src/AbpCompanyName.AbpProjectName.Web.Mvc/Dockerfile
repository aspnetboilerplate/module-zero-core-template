FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

RUN dotnet tool install -g Microsoft.Web.LibraryManager.Cli
RUN ln -s ~/.dotnet/tools/libman /usr/local/bin/libman

WORKDIR /src
COPY ["src/AbpCompanyName.AbpProjectName.Web.Mvc/AbpCompanyName.AbpProjectName.Web.Mvc.csproj", "src/AbpCompanyName.AbpProjectName.Web.Mvc/"]
COPY ["src/AbpCompanyName.AbpProjectName.Web.Core/AbpCompanyName.AbpProjectName.Web.Core.csproj", "src/AbpCompanyName.AbpProjectName.Web.Core/"]
COPY ["src/AbpCompanyName.AbpProjectName.Application/AbpCompanyName.AbpProjectName.Application.csproj", "src/AbpCompanyName.AbpProjectName.Application/"]
COPY ["src/AbpCompanyName.AbpProjectName.Core/AbpCompanyName.AbpProjectName.Core.csproj", "src/AbpCompanyName.AbpProjectName.Core/"]
COPY ["src/AbpCompanyName.AbpProjectName.EntityFrameworkCore/AbpCompanyName.AbpProjectName.EntityFrameworkCore.csproj", "src/AbpCompanyName.AbpProjectName.EntityFrameworkCore/"]
WORKDIR "/src/src/AbpCompanyName.AbpProjectName.Web.Mvc"
RUN dotnet restore 

WORKDIR /src
COPY ["src/AbpCompanyName.AbpProjectName.Web.Mvc", "src/AbpCompanyName.AbpProjectName.Web.Mvc"]
COPY ["src/AbpCompanyName.AbpProjectName.Web.Core", "src/AbpCompanyName.AbpProjectName.Web.Core"]
COPY ["src/AbpCompanyName.AbpProjectName.Application", "src/AbpCompanyName.AbpProjectName.Application"]
COPY ["src/AbpCompanyName.AbpProjectName.Core", "src/AbpCompanyName.AbpProjectName.Core"]
COPY ["src/AbpCompanyName.AbpProjectName.EntityFrameworkCore", "src/AbpCompanyName.AbpProjectName.EntityFrameworkCore"]
WORKDIR "/src/src/AbpCompanyName.AbpProjectName.Web.Mvc"
RUN libman restore
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "AbpCompanyName.AbpProjectName.Web.Mvc.dll"]
