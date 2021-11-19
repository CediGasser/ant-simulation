FROM nginx
RUN npm run build
COPY ./build/_app /etc/nginx/html