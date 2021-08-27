#!/bin/bash
sudo echo " Welcome to docker build"
sudo echo ""
sudo echo ""

ABP_HOST="abp/host"
ABP_NG="abp/ng"

cd ..
sudo echo " Building docker image $ABP_HOST..."
sudo docker build -t $ABP_HOST .
sudo echo " Done. -- Building docker image $ABP_HOST..."
sudo echo ""
sudo echo ""

# sudo echo " Pushing docker image $ABP_HOST..."
# sudo docker push $ABP_HOST
# sudo echo " Done. -- Pushing docker image $ABP_HOST..."
# sudo echo ""
# sudo echo ""

cd ..
cd angular/
sudo echo " Building docker image $ABP_NG..."
sudo docker build -t $ABP_NG .
sudo echo " Done. -- Building docker image $ABP_NG..."
sudo echo ""
sudo echo ""

# sudo echo " Pushing docker image $ABP_NG..."
# sudo docker push $ABP_NG
# sudo echo " Done. -- Pushing docker image $ABP_NG..."
# sudo echo ""
# sudo echo ""
