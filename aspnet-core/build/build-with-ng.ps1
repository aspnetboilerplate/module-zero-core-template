echo " Welcome to docker build"
echo ""
echo ""

$ABP_HOST="abp/host"
$ABP_NG="abp/ng"

cd ..
echo " Building docker image $ABP_HOST..."
docker build -t $ABP_HOST .
echo " Done. -- Building docker image $ABP_HOST..."
echo ""
echo ""

# echo " Pushing docker image $ABP_HOST..."
# docker push $ABP_HOST
# echo " Done. -- Pushing docker image $ABP_HOST..."
# echo ""
# echo ""

cd ..
cd angular/
echo " Building docker image $ABP_NG..."
docker build -t $ABP_NG -f Dockerfile .
echo " Done. -- Building docker image $ABP_NG..."
echo ""
echo ""

# echo " Pushing docker image $ABP_NG..."
# docker push $ABP_NG
# echo " Done. -- Pushing docker image $ABP_NG..."
# echo ""
# echo ""
