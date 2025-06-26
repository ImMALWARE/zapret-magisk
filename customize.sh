if [[ "$ARCH" != "arm" && \
      "$ARCH" != "arm64" && \
			"$ARCH" != "x86" && \
			"$ARCH" != "x64" ]]; then
	abort "- Архитектура $ARCH не поддерживается!"
else
	set_binary
fi


if ! [ -d "/data/adb/zapret" ]; then
	set_list
fi

ui_print "Готово."

set_binary() {
	ui_print "Копирование nfqws.."
	cp "$MODPATH/binary/nfqws_$ARCH" "$MODPATH/system/bin/nfqws"
	ui_print "Готово."
}

set_list() {
	ui_print "Создание директории для zapret..."
	mkdir -p "/data/adb/zapret"
	cat > "/data/adb/zapret/DPI_list.txt" << EOL
7tv.app
adtidy.org
amnezia.org
ampproject.org
appspot.com
avira.com
botnadzor.org
bsky.app
cdninstagram.com
censorship.no
censortracker.org
cloudflare-ech.com
cloudflareclient.com
conversations.im
cpuid.com
discord-attachments-uploads-prd.storage.googleapis.com
discord.com
discord.gg
discord.media
discordapp.com
discordapp.net
facebook.com
fbcdn.net
fbsbx.com
ficbook.net
files.catbox.moe
gentoo.org
ggpht.com
godaddy.com
googlevideo.com
instagram.com
jnn-pa.googleapis.com
jut.su
linkedin.com
linktr.ee
lolz.guru
looking.house
malw.lol
malw.ru
matrix.org
matrix.to
medium.com
musixmatch.com
news.google.com
nnmclub.to
notepad-plus-plus.org
ntc.party
pages.dev
patreon.com
picuki.com
play.google.com
prnt.sc
proton.me
protonmail.com
protonvpn.com
quora.com
rentry.co
riseup.net
roskomsvoboda.org
rustdesk.com
rutracker.org
signal.org
soundcloud.com
t.co
te-st.org
tomshardware.com
torproject.org
twimg.com
twitter.com
vector.im
viber.com
vivaldistatus.com
wide-youtube.l.google.com
wixmp.com
x.com
youtu.be
youtube-nocookie.com
youtube-ui.l.google.com
youtube.com
youtubeembeddedplayer.googleapis.com
youtubei.googleapis.com
yt-video-upload.l.google.com
yt.be
ytimg.com
ytimg.l.google.com
zelenka.guru
znanija.com

EOL
	set_perm "/data/adb/zapret/DPI_list.txt" 0 0 666

	cat > "/data/adb/zapret/DPI_ignore.txt" << EOL
4pda.to
accounts.google.com
ajax.googleapis.com
android.googleapis.com
blum.codes
cloudflare-dns.com
connectivitycheck.gstatic.com
dns.google
firefox.com
fonts.googleapis.com
fonts.gstatic.com
github.com
githubusercontent.com
googlesyndication.com
mi.com
doubleclick.net
mozilla.com
mozilla.net
mozilla.org
nztcdn.com
steamstatic.com
t2.ru
tele2.ru
tonhub.com
userapi.com
vivaldi.com
vivaldi.net
vk.com
vtb.ru
www.google.com
www.googleapis.com
www.gstatic.com
xiaomi.com
xiaomi.net

EOL
	set_perm "/data/adb/zapret/DPI_ignore.txt" 0 0 666
}
