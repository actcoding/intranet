FROM dunglas/frankenphp:php8.3-alpine

RUN install-php-extensions \
        pgsql \
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
    php artisan storage:link && \
    rm composer

VOLUME [ "/app/storage" ]

EXPOSE 8000

CMD [ "php", "artisan", "octane:start", "--host=0.0.0.0", "--port=8000" ]
