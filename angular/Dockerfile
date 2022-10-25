# stage 1
FROM node:14 as node
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run ng build --configuration production
# stage 2
FROM nginx
COPY --from=node /app/dist /usr/share/nginx/html
# This is a workaround to avoid updating the file outside the container. 
RUN sed -i "s/https/http/g" /usr/share/nginx/html/assets/appconfig.production.json
COPY fast-nginx-default.conf /etc/nginx/conf.d/default.conf
