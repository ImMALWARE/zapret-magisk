#!/system/bin/sh

ui_print "Copying nfqws для $ARCH"
case "$ARCH" in
    arm64)   cp -af "$MODPATH/common/nfqws_arm64" "$MODPATH/system/bin/nfqws";;
    arm)     cp -af "$MODPATH/common/nfqws_arm" "$MODPATH/system/bin/nfqws";;
    x86)     cp -af "$MODPATH/common/nfqws_x86" "$MODPATH/system/bin/nfqws";;
    x64)     cp -af "$MODPATH/common/nfqws_x64" "$MODPATH/system/bin/nfqws";;
esac
rm -rf "$MODPATH/common"
chmod 755 "$MODPATH/system/bin/nfqws"

if ! [ -d "/data/adb/zapret" ]; then
    ui_print "Creating directory for zapret";
    mkdir -p "/data/adb/zapret";
fi;

ui_print "Filling autohosts.txt, ignore.txt, config.txt"

cat "$MODPATH/lists/hosts-list.txt" > "/data/adb/zapret/autohosts.txt"
chmod 666 "/data/adb/zapret/autohosts.txt";

cat "$MODPATH/lists/ignore-list.txt" > "/data/adb/zapret/ignore.txt"
chmod 666 "/data/adb/zapret/ignore.txt";

cat > "/data/adb/zapret/config.txt" << EOL
--filter-udp=443 --hostlist-auto={hosts} --hostlist-exclude={ignore} --dpi-desync=fake --dpi-desync-repeats=6 --dpi-desync-fake-quic={quicgoogle} --dpi-desync-fwmark=0x40000000/0x40000000 --new
--filter-udp=19294-19344,50000-50100 --filter-l7=discord,stun --dpi-desync=fake --dpi-desync-repeats=6 --dpi-desync-fwmark=0x40000000/0x40000000 --new
--filter-tcp=2053,2083,2087,2096,8443 --hostlist-domains=discord.media --dpi-desync=multisplit --dpi-desync-split-seqovl=568 --dpi-desync-split-pos=1 --dpi-desync-split-seqovl-pattern={tlsgoogle} --dpi-desync-fwmark=0x40000000/0x40000000 --new
--filter-tcp=443 --hostlist-auto={hosts} --hostlist-exclude={ignore} --ip-id=zero --dpi-desync=multisplit --dpi-desync-split-seqovl=681 --dpi-desync-split-pos=1 --dpi-desync-split-seqovl-pattern={tlsgoogle} --dpi-desync-fwmark=0x40000000/0x40000000 --new
--filter-tcp=80 --hostlist={hosts} --hostlist-exclude={ignore} --dpi-desync=multisplit --dpi-desync-split-seqovl=568 --dpi-desync-split-pos=1 --dpi-desync-split-seqovl-pattern={tlsgoogle} --dpi-desync-fwmark=0x40000000/0x40000000
EOL
chmod 666 "/data/adb/zapret/config.txt";

rm -rf "$MODPATH/lists"

touch "/data/adb/zapret/autostart"

ui_print "Read the guide at https://wiki.malw.link/network/vpns/zapret"