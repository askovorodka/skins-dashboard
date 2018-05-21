FROM nginx:alpine
COPY docker-conf/default.conf /etc/nginx/conf.d/
COPY ./ /var/www/
WORKDIR /var/www/
RUN apk update \
	&& apk add nodejs
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
