echo " Welcome to docker build"
echo ""
echo ""

$ABP_MVC="abp/mvc"
$ABP_MVC_DOCKERFILE_PATH="src/AbpCompanyName.AbpProjectName.Web.Mvc/Dockerfile"
$ABP_NG="abp/ng"

cd ..
echo " Building docker image $ABP_MVC..."
docker build -t $ABP_MVC -f $ABP_MVC_DOCKERFILE_PATH . 
echo " Done. -- Building docker image $ABP_MVC..."
echo ""
echo ""

# echo " Pushing docker image $ABP_MVC..."
# docker push $ABP_MVC
# echo " Done. -- Pushing docker image $ABP_MVC..."
# echo ""
# echo ""
