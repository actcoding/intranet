FROM dunglas/frankenphp:php8.3-alpine

RUN apk add --no-cache \
        git \
    && \
    install-php-extensions \
        pgsql \
        pdo_pgsql \
        redis \
        opcache \
        pcntl \
    && \
    mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" && \
    addgroup -g 1001 intranet && \
    adduser -D -h /app -u 1001 -G intranet intranet && \
    chown -R intranet:intranet /data/caddy && \
    chown -R intranet:intranet /config/caddy && \
    setcap -r /usr/local/bin/frankenphp;

COPY --chown=intranet:intranet . /app

USER intranet

WORKDIR /app

RUN wget https://github.com/composer/composer/releases/download/2.7.6/composer.phar -O composer && \
    php composer install --no-dev && \
    rm composer

VOLUME [ "/app/storage" ]

EXPOSE 8000

CMD [ "/app/docker-entrypoint.sh" ]
