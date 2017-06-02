# COMMON PATHS

$buildFolder = (Get-Item -Path "./" -Verbose).FullName
$slnFolder = Join-Path $buildFolder "../"
$outputFolder = Join-Path $buildFolder "outputs"
$webHostFolder = Join-Path $slnFolder "src/AbpCompanyName.AbpProjectName.Web.Host"
$ngFolder = Join-Path $buildFolder "../../angular"

## CLEAR ######################################################################

Remove-Item $outputFolder -Force -Recurse
New-Item -Path $outputFolder -ItemType Directory

## RESTORE NUGET PACKAGES #####################################################

Set-Location $slnFolder
dotnet restore

## PUBLISH WEB HOST PROJECT ###################################################

Set-Location $webHostFolder
dotnet publish --output (Join-Path $outputFolder "Host")

## PUBLISH ANGULAR UI PROJECT #################################################

Set-Location $ngFolder
& ng build -prod
Copy-Item (Join-Path $ngFolder "dist") (Join-Path $outputFolder "ng") -Recurse
Copy-Item (Join-Path $ngFolder "Dockerfile") (Join-Path $outputFolder "ng")

# Change UI configuration
$ngConfigPath = Join-Path $outputFolder "ng/assets/appconfig.json"
(Get-Content $ngConfigPath) -replace "21021", "9901" | Set-Content $ngConfigPath
(Get-Content $ngConfigPath) -replace "4200", "9902" | Set-Content $ngConfigPath

## CREATE DOCKER IMAGES #######################################################

# Host
Set-Location (Join-Path $outputFolder "Host")

docker rmi zero/host -f
docker build -t zero/host .

# Angular UI
Set-Location (Join-Path $outputFolder "ng")

docker rmi zero/ng -f
docker build -t zero/ng .

## DOCKER COMPOSE FILES #######################################################

Copy-Item (Join-Path $slnFolder "docker/ng/*.*") $outputFolder

## FINALIZE ###################################################################

Set-Location $outputFolder