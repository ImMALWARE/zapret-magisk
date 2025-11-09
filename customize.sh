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

cat > "/data/adb/zapret/autohosts.txt" << EOL
7tv.app
amnezia.org
ampproject.org
api.cloudflareclient.com
apkmirror.com
appspot.com
avira.com
blancvpn.net
botnadzor.org
cdninstagram.com
censorship.no
censortracker.org
chess.com
cloudflare-ech.com
cock.li
conversations.im
discord-attachments-uploads-prd.storage.googleapis.com
discord.com
discord.gg
discord.media
discordapp.com
discordapp.net
dolphin-anty.com
emkei.cz
engage.cloudflareclient.com
facebook.com
fbcdn.net
fbsbx.com
ficbook.net
files.catbox.moe
forumlib.me
freedomhouse.org
gekkk.co
ggpht.com
godaddy.com
google.ua
googlevideo.com
imagedelivery.net
instagram.com
ipvanish.com
itch.io
jnn-pa.googleapis.com
jut.su
kemono.su
linkedin.com
linktr.ee
lolz.guru
matrix-client.matrix.org
matrix.org
matrix.to
medium.com
mega.co.nz
mega.nz
mullvad.net
musixmatch.com
news.google.com
nnmclub.to
nordvpn.com
notepad-plus-plus.org
ntc.party
pages.dev
patreon.com
picuki.com
play.google.com
privateinternetaccess.com
prnt.sc
proton.me
protonmail.ch
protonmail.com
protonvpn.com
protonvpn.net
psiphon.ca
quora.com
redshieldvpn.com
rentry.co
rentry.org
riseup.net
roskomsvoboda.org
rutracker.cc
rutracker.org
sb.scorecardresearch.com
signal.org
snapchat.com
sndcdn.com
soundcloud.com
speedtest.net
t.co
te-st.org
thonny.org
tmailor.com
torproject.org
tuta.com
twimg.com
twitter.com
ulta.team
vector.im
viber.com
vpnlove.me
wide-youtube.l.google.com
windscribe.com
wixmp.com
x.com
xvpn.io
youtu.be
youtube-nocookie.com
youtube-ui.l.google.com
youtube.com
youtubeembeddedplayer.googleapis.com
youtubei.googleapis.com
yt-video-upload.l.google.com
yt.be
yt3.googleusercontent.com
ytimg.com
ytimg.l.google.com
zelenka.guru
znanija.com

EOL
chmod 666 "/data/adb/zapret/autohosts.txt";

cat > "/data/adb/zapret/ignore.txt" << EOL
accounts.google.com
ajax.googleapis.com
android.googleapis.com
blum.codes
connectivitycheck.gstatic.com
firefox.com
fonts.googleapis.com
fonts.gstatic.com
github.com
githubusercontent.com
googlesyndication.com
gosuslugi.ru
mi.com
mozilla.com
mozilla.net
mozilla.org
sberbank.ru
steamstatic.com
t2.ru
tele2.ru
tonhub.com
userapi.com
vivaldi.com
vk.com
vtb.ru
www.google.com
www.googleapis.com
www.gstatic.com
xiaomi.com
xiaomi.net

EOL
chmod 666 "/data/adb/zapret/ignore.txt";

cat > "/data/adb/zapret/config.txt" << EOL
--filter-udp=443 --hostlist-auto={hosts} --hostlist-exclude={ignore} --dpi-desync=fake --dpi-desync-repeats=6 --dpi-desync-fake-quic={quicgoogle} --dpi-desync-fwmark=0x40000000/0x40000000 --new
--filter-udp=19294-19344,50000-50100 --filter-l7=discord,stun --dpi-desync=fake --dpi-desync-repeats=6 --dpi-desync-fwmark=0x40000000/0x40000000 --new
--filter-tcp=2053,2083,2087,2096,8443 --hostlist-domains=discord.media --dpi-desync=multisplit --dpi-desync-split-seqovl=568 --dpi-desync-split-pos=1 --dpi-desync-split-seqovl-pattern={tlsgoogle} --dpi-desync-fwmark=0x40000000/0x40000000 --new
--filter-tcp=443 --hostlist-auto={hosts} --hostlist-exclude={ignore} --ip-id=zero --dpi-desync=multisplit --dpi-desync-split-seqovl=681 --dpi-desync-split-pos=1 --dpi-desync-split-seqovl-pattern={tlsgoogle} --dpi-desync-fwmark=0x40000000/0x40000000 --new
--filter-tcp=80 --hostlist={hosts} --hostlist-exclude={ignore} --dpi-desync=multisplit --dpi-desync-split-seqovl=568 --dpi-desync-split-pos=1 --dpi-desync-split-seqovl-pattern={tlsgoogle} --dpi-desync-fwmark=0x40000000/0x40000000
EOL
chmod 666 "/data/adb/zapret/config.txt";

touch "/data/adb/zapret/autostart"

ui_print "Read the guide at https://wiki.malw.link/network/vpns/zapret"