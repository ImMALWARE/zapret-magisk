#!/system/bin/env sh



if pgrep "nfqws" > /dev/null; then
    echo "Stopping..."
    zapret stop
else
    echo "Running..."
    zapret start
fi
