FROM docker:latest

RUN apk add docker-compose php php-fpm php7-opcache php7-phar php7-bcmath php7-ctype php7-fileinfo php7-json php7-mbstring php7-yaml php7-openssl php7-pdo php7-tokenizer php7-xml 
RUN mkdir -p /run/nginx
RUN apk add nginx curl

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
update-ca-certificates

WORKDIR /var/www
