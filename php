#!/bin/sh

BINARIES=("php8.3" "php83" "php")

found=""

for bin in "${BINARIES[@]}"; do
    if command -v "${bin}" 2>&1 >/dev/null; then
        found="${bin}"
        break
    fi
done

exec "${found}" $@
