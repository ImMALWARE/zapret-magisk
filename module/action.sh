#!/system/bin/sh

if pgrep "nfqws" > /dev/null; then
    zapret stop
else
    zapret start
fi