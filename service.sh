#!/system/bin/sh

if [ -f /data/adb/modules/zapret64bitcompat/autostart ]; then
    su -c "zapret start"
fi
