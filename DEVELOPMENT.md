## Development

### Prerequisites

- Php 8.3 with extensions:
  - dom
  - mbstring
  - pgsql
  - redis
  - xml
- [Composer](https://getcomposer.org/) installed to `~/bin`
- Docker
- [Bun](https://bun.sh/)

If using Ubuntu / Debian, install the following PPA: [ondrej/php](https://launchpad.net/~ondrej/+archive/ubuntu/php)

Then install Php 8.3:

```
$ sudo apt install -y \
    php8.3-cli \
    php8.3-dev \
    php8.3-gd \
    php8.3-igbinary \
    php8.3-intl \
    php8.3-mbstring \
    php8.3-opcache \
    php8.3-pgsql \
    php8.3-redis \
    php8.3-xdebug \
    php8.3-xml \
    php8.3-zip
```

### Ports

The following ports should be available:

- 8000 (Backend)
- 3000 (Frontend)
- 5432 (Database)
- 5433 (pgAdmin)
- 6379 (Redis)
- 7700 (MeiliSearch)
- 8888 (Keycloak)

### Workflow

Use the local `composer` and `artisan` scripts directly, they are executable and configured
to use the correct Php version.

In case they are not:

```
$ chmod +x ./artisan ./composer
```

### Setup Laravel / Backend

1. Install dependencies:

```
$ ./composer install
```

2. Configure the environment:

```
$ cp .env.example .env
$ ./artisan app:key-generate
```

Fill out the missing details in the `.env` file.

3. Start services:

```
$ docker compose up -d
```

This will start:

- PostgreSQL
- Redis
- MeiliSearch
- pgAdmin
- Keycloak

### Setup Next.js / Frontend

1. Go to the `frontend` directory:

```
$ cd frontend/
```

2. Install dependencies:

```
$ bun i --frozen-lockfile
```

### Start everything

If you're using VSCode, there are some preconfigured tasks.
Press `Ctrl+Shift+P` or `Cmd+Shift+P`, select `Tasks: Run Task` and then select `Dev`.
