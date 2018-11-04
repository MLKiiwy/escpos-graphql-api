FROM nginx:stable-alpine

ADD ./dist/nginx/ /data/www

ADD ./config/nginx.conf /etc/nginx/conf.d/default.conf

ADD ./scripts/replace-assets-url.sh /usr/local/bin/replace-assets-url.sh

RUN apk add bash \
  && chmod +x /usr/local/bin/replace-assets-url.sh
