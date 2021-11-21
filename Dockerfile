FROM node:alpine as builder
COPY ./ ./
RUN npm install
RUN npm run build

FROM nginx
COPY --from=builder ./build/_app /etc/nginx/html
