#!/bin/sh

if ! command -v curl >/dev/null 2>&1; then
    echo "curl not installed!"
    read -p ""
    exit 1
fi

while IFS= read -r line; do
    if [ -n "$line" ]; then
        printf "Checking %s... " "$line"
        response=$(curl --connect-timeout 5 --max-time 5 -s --show-error -o /dev/null -w "%{http_code}" "https://$line" 2>&1)
        if [[ "$response" == *000 ]]; then
            echo "${response%000}"
        else
            echo "$response"
        fi
    fi
done < "/data/adb/zapret/autohosts.txt"