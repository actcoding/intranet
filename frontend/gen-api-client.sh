#!/bin/bash

TARGET_DIRECTORY="src/lib/api/generated"

rm -rf "$TARGET_DIRECTORY"

bunx openapi-generator-cli generate \
    -i "http://localhost:8000/docs/api.json" \
    -o "$TARGET_DIRECTORY" \
    -g typescript-fetch
