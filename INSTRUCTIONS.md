## How to containerized a new Asp.net Boiler Plate Application 

#### Intro:

This instructions will allow runing one aspnetboilerplate application as docker containers. The Dockerfile and docker-compose files are taken from a repository pull request listed below.

#### Requirements:

To follow along this instructions you will need to be familiar with git, aspnetboilerplate, docker, aspnet core, angular. 

The tools being used here are:
- Git command line for Linux or Mac or Git bash for Windows
- Docker for Linux or Mac or Windows
- Docker Compose for Linux or Mac or Windows
- MS SQL Server Instance 

#### Instructions:

- Download the new application from aspnetboilerplate website. Ex: `https://aspnetboilerplate.com/Templates`. For our example we are taking ASP.NET Core target version v7.x and Single Page Web Application with Angular. 
- Leave the Options by default which will be Include login, register, user, roles and tenant management pages. And untick the One solution. 
- Set your project name to be MyCollege.
- Enter the captcha code, leave the latest stable version and click the download project button. 
- You will get a MyCollege.zip file. 
- Extract this file, and inside you will file the version number in our example we have 7.3. We don't need this version now. Go inside the version number folder and create a git repository in there. In my example, I will be doing: 
    - `unzip MyCollege.zip -d MyCollege/`
    - `cd MyCollege/7.3.0/`
- Once terminal and navigated to inside the version number folder, once there execute those commands:
    - `git init`
    - `git add .`
    - `git commit -m 'my initial commit'`
- Then we are going to add some Docker files from this repository pull request `https://github.com/aspnetboilerplate/module-zero-core-template/pull/613`. Basically we are taking all updated and new files from this pull request and copy them over to our new project folder. In my example I am copying those file with this command:
    - `cp -r ../../copy-from-merge/* ./`
- Open the root of the repository folder with any IDE/text editor of your preference, I am using VS Code. 
- Update the file `aspnet-core/Dockerfile` place holder `AbpCompanyName.AbpProjectName` with your project own name. In my case I am doing `MyCollege` name, and executing this commands: 
    - `cat ./aspnet-core/Dockerfile`
    - `sed -i "s/AbpCompanyName.AbpProjectName/MyCollege/g" ./aspnet-core/Dockerfile`
    - `cat ./aspnet-core/Dockerfile`
- Create a new database in your MS SQL Server, for me it will be dbMyCollege. Therefore I am going to MS SQL Management Studio and executing the `CREATE DATABASE MyCollegeDb` command.
- Go back to VS code and set the connection string in the `aspnet-core/src/MyCollege.Migrator/appsettings.json` file. For my example the connection string will be:  `Server=192.168.22.101;Database=dbMyCollege;User Id=sa;Password=D8JeW7jjSmBVXLcRxWLDwMjYLnf6xVG8;`. For my example:
    - `cat ./aspnet-core/src/MyCollege.Migrator/appsettings.json`
    - `sed -i "s/Server=localhost; Database=MyCollegeDb; Trusted_Connection=True;/Server=192.168.22.101;Database=dbMyCollege;User Id=sa;Password=D8JeW7jjSmBVXLcRxWLDwMjYLnf6xVG8;/g" ./aspnet-core/src/MyCollege.Migrator/appsettings.json`
    - `cat ./aspnet-core/src/MyCollege.Migrator/appsettings.json`
- With your terminal navigate to migration project folder and run this project with the following command:
    - `cd ./aspnet-core/src/MyCollege.Migrator`
    - `dotnet run`
- Build the container image for the Angular Application and the Aspnet Core Application by running the script hosted in `aspnet-core/build/build-with-ng-updated.sh`. Please note this script is expecting you to navigate your terminal to the folder `aspnet-core/build` and then execute the script from there. 
    - `cd ../../../aspnet-core/build`
    - `ls -al`
    - `cat ./build-with-ng-updated.sh`
    - `./build-with-ng-updated.sh`
- Run your docker-compose file by navigating your terminal to: `aspnet-core/docker/ng`. And executing the following command:
    - `docker-compose up -d`.

#### Final Notes:
Once the pull request is merged all you would need to run your application as docker container is follow the steps number 11 and 15. 
