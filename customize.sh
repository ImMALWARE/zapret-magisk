#!/system/bin/sh

ui_print "Copying nfqws для $ARCH"
case "$ARCH" in
    arm64)   cp -af "$MODPATH/common/nfqws_arm64" "$MODPATH/system/bin/nfqws";;
    arm)     cp -af "$MODPATH/common/nfqws_arm" "$MODPATH/system/bin/nfqws";;
    x86)     cp -af "$MODPATH/common/nfqws_x86" "$MODPATH/system/bin/nfqws";;
    x64)     cp -af "$MODPATH/common/nfqws_x64" "$MODPATH/system/bin/nfqws";;
esac
chmod 755 "$MODPATH/system/bin/nfqws"

if ! [ -d "/data/adb/zapret" ]; then
    ui_print "Creating directory for zapret";
    mkdir -p "/data/adb/zapret";
fi;

ui_print "Filling autohosts.txt, ignore.txt, config.txt"

cat "$MODPATH/common/autohosts.txt" > "/data/adb/zapret/autohosts.txt"
chmod 666 "/data/adb/zapret/autohosts.txt";

cat "$MODPATH/common/ignore.txt" > "/data/adb/zapret/ignore.txt"
chmod 666 "/data/adb/zapret/ignore.txt";

cat "$MODPATH/common/config.txt" > "/data/adb/zapret/config.txt"
chmod 666 "/data/adb/zapret/config.txt";

rm -rf "$MODPATH/common"

touch "/data/adb/zapret/autostart"

ui_print "Read the guide at https://wiki.malw.link/network/vpns/zapret"