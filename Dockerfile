FROM node:alpine as builder
COPY ./ ./
RUN npm install
RUN npm run build

FROM nginx
COPY --from=builder ./build /usr/share/nginx/html/
COPY --from=builder ./nginx/custom.conf /etc/nginx/conf.d
