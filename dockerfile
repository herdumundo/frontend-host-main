FROM node:19 as build_stage

ENV NODE_ENV=development
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install

ENV NODE_ENV=production
RUN npm run build

FROM nginx:1.25.0
COPY --from=build_stage /app/build /usr/share/nginx/html
COPY --from=build_stage /app/src/public/static /usr/share/nginx/html/static
COPY --from=build_stage /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
