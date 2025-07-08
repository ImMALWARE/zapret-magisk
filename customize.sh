# shellcheck disable=SC2148
set_binary() {
	ui_print "- Копирование nfqws"
	cp "$MODPATH/binaries/nfqws_$ARCH" "$MODPATH/system/bin/nfqws"
}

set_list() {
	ui_print "- Создание директории для zapret"
	mkdir -p "/data/adb/zapret"
	cp "$MODPATH/list/zapret-hosts-user.txt" "/data/adb/zapret/zapret-hosts-user.txt"
	cp "$MODPATH/list/zapret-hosts-user-exclude.txt" "/data/adb/zapret/zapret-hosts-user-exclude.txt"
}

set_permission() {
	ui_print "- Установка разрешений"
	set_perm "$MODPATH/system/bin/zapret" 0 0 744
	set_perm "$MODPATH/system/bin/nfqws" 0 0 744
	set_perm "/data/adb/zapret/zapret-hosts-user.txt" 0 0 666
	set_perm "/data/adb/zapret/zapret-hosts-user-exclude.txt" 0 0 666
}

cleanup() {
	ui_print "- Очистка"
	rm -rf "$MODPATH/binaries"
	rm -rf "$MODPATH/list"
}

if [[ "$ARCH" != "arm" &&
	"$ARCH" != "arm64" &&
	"$ARCH" != "x86" &&
	"$ARCH" != "x64" ]]; then
	abort "- Архитектура $ARCH не поддерживается!"
else
	set_binary
fi

if ! [ -d "/data/adb/zapret" ]; then
	set_list
fi

set_permission
cleanup

