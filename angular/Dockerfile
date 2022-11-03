# stage 1
FROM node:14 as node
WORKDIR /app
COPY . .
# This is a workaround to avoid updating appconfig.production.json file. 
# If you prefer to updating appconfig.production.json file instead of appconfig.container.json please delete this line.
RUN mv ./src/assets/appconfig.container.json ./src/assets/appconfig.production.json
RUN yarn install
RUN yarn run ng build --configuration production
# stage 2
FROM nginx
COPY --from=node /app/dist /usr/share/nginx/html
COPY fast-nginx-default.conf /etc/nginx/conf.d/default.conf
