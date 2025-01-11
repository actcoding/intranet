#!/bin/sh

TARGET_DIRECTORY="src/lib/api/generated"
INPUT="http://localhost:8000/docs/api.json"

rm -rf "$TARGET_DIRECTORY"

curl -sf "$INPUT" > /dev/null
if [ $? = 7 ]; then
    INPUT="./api.json"

    if [ ! -f "$INPUT" ]; then
        echo " >> No input found. Skipping api client generation!"
        exit 0
    fi
fi

echo " >> Using input \"$INPUT\" …"

bunx openapi-generator-cli generate \
    -i "$INPUT" \
    -o "$TARGET_DIRECTORY" \
    -g typescript-fetch \
    -p "importFileExtension=.ts"
