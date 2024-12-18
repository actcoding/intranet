#!/bin/sh

set -ex

php artisan optimize

php artisan octane:start --host=0.0.0.0 --port=8000
