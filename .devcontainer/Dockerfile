FROM dunglas/frankenphp:php8.3-bookworm

COPY rootfs /

RUN apt-get update && \
    apt-get -y install \
        curl \
        wget \
        jq \
        git \
        p7zip-full \
        openjdk-17-jre \
        sudo \
        zsh \
    && \
    install-php-extensions \
        xdebug \
        pgsql \
        pdo_pgsql \
        redis \
        opcache \
        pcntl \
        zip \
    && \
    mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"

RUN curl -sSL https://getcomposer.org/installer | php && \
    chmod +x composer.phar && \
    mv composer.phar /usr/local/bin/composer

RUN rm -rf /app && \
    groupadd -g 1001 vscode && \
    useradd -d /app -m -u 1001 -g vscode -s /bin/zsh vscode && \
    echo vscode ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/vscode && \
    chmod 0440 /etc/sudoers.d/vscode && \
    chown -R vscode:vscode /data/caddy && \
    chown -R vscode:vscode /config/caddy && \
    setcap -r /usr/local/bin/frankenphp;

USER vscode

WORKDIR /app

RUN curl -sS https://starship.rs/install.sh | sh -s -- --yes
