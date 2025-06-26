# shellcheck disable=SC2148
set_binary() {
	ui_print "Копирование nfqws.."
	cp "$MODPATH/binary/nfqws_$ARCH" "$MODPATH/system/bin/nfqws"
	ui_print "Очистка..."	
}

set_list() {
	ui_print "Создание директории для zapret..."
	mkdir -p "/data/adb/zapret"
	cp "$MODPATH/list/DPI_list.txt" "/data/adb/zapret/DPI_list.txt"
	cp "$MODPATH/list/DPI_ignore.txt" "/data/adb/zapret/DPI_ignore.txt"
	ui_print "Установка разрешений..."
	set_perm "/data/adb/zapret/DPI_list.txt" 0 0 666
	set_perm "/data/adb/zapret/DPI_ignore.txt" 0 0 666
}

cleanup() {
	rm -rf "$MODPATH/binary"
	rm -rf "$MODPATH/list"
}

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

cleanup

