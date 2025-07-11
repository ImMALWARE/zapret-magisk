# Исходники файлов в binaries

- [zapret\_$ARCH](https://github.com/nteditor/zapret-manager)
  - Лицензия: [GPL v3.0 Licence](https://raw.githubusercontent.com/NTeditor/zapret-manager/refs/heads/main/LICENSE)
  - Библиотеки:
    - [cobra](https://github.com/spf13/cobra)
      - Лицензия: [Apache 2.0 Licence](https://raw.githubusercontent.com/spf13/cobra/refs/heads/main/LICENSE.txt)
    - [viper](https://github.com/spf13/viper)
      - Лицензия: [MIT Licence](https://raw.githubusercontent.com/spf13/viper/refs/heads/master/LICENSE)
- [nfqws\_$ARCH](https://github.com/bol-van/zapret)
  - Лицензия: [MIT Licence](https://raw.githubusercontent.com/bol-van/zapret/refs/heads/master/docs/LICENSE.txt)

# Кнопка Action

Кнопка Action в Magisk останавливает/запускает zapret.

# Файлы

- `/data/adb/zapret` - При обновлении не трогается.
  - `config.json` - Файл конфигурации [подробнее](#configjson).
  - `zapret-hosts-user.txt` - Домены которые проходят через nfqws.
  - `zapret-hosts-user-exclude.txt` - Домены которые игнорируются nfwqs.
  - `zapret-hosts-auto.txt` - Используется при режиме autohostlist
- `/data/adb/modules/zapret/list` - Перезаписывается при обновлении.
  - `zapret-hosts.txt` - Домены которые проходят через nfqws.
  - `zapret-hosts-exclude.txt` - Домены которые игнорируются nfwqs.

# KsuWebUI

Удален

# Команды

В Termux(от имени root) можно выполнять команды:

`zapret start` - запуск

`zapret stop` - остановка

`zapret enable` - включить автозапуск

`zapret disable` - отключить автозапуск

`zapret restart` - Перезапуск

`zapret status` - Проверить запущен ли nfqws

# config.json

- iptables
  - connbytesSupport
    - Тип: bool
    - Включает использование connbytes при установки iptables правил.
    - По умольчанию: false
  - markSupport
    - Тип: bool
    - Включает использование mark при установки iptables правил.
    - По умольчанию: true
  - markSupport
    - Тип: bool
    - Включает использование mark при установки iptables правил.
    - По умольчанию: true
  - multiportSupport
    - Тип: bool
    - Включает использование multiport при установки iptables правил.
    - По умольчанию: false
- magisk
  - autostart
    - Тип: bool
    - Включает автозапуск.
    - По умольчанию: false
- nfqws
  - hostlist
    - Тип: string
    - Поддерживаются: `autohostlist`, `hostlist` и `none`
    - При значении `autohostlist` заменяет `<HOSTLIST>` на ключи:
      <font size="2">"--hostlist=/data/adb/modules/zapret/list/zapret-hosts.txt",
      "--hostlist-exclude=/data/adb/modules/zapret/list/zapret-hosts-exclude.txt",
      "--hostlist=/data/adb/zapret/zapret-hosts-user.txt",
      "--hostlist-exclude=/data/adb/zapret/zapret-hosts-user-exclude.txt",
      "--hostlist-auto=/data/adb/zapret/zapret-hosts-auto.txt",
      "--hostlist-auto-fail-threshold=3",
      "--hostlist-auto-fail-time=60",
      "--hostlist-auto-retrans-threshold=3"</font>

    - При значении `hostlist` заменяет `<HOSTLIST>` на ключи:
      <font size="2">"--hostlist=/data/adb/modules/zapret/list/zapret-hosts.txt",
      "--hostlist-exclude=/data/adb/modules/zapret/list/zapret-hosts-exclude.txt",
      "--hostlist=/data/adb/zapret/zapret-hosts-user.txt",
      "--hostlist-exclude=/data/adb/zapret/zapret-hosts-user-exclude.txt"</font>

    - При значении `none` удаляет `<HOSTLIST>`.
    - Важно: `<HOSTLIST>` должен быть отльным аргументом!
    - По умолчанию: `none`

  - opt - Тип: []string - Хранит ключи которые будут применены к nfqws. - Важно: каждый аргумент должен быть отдельным элементом!
  - По умольчанию:
    <font size=1>"--filter-tcp=80", "--domcase", "--methodeol", "--dpi-desync=fake,multisplit", "--dpi-desync-autottl=3", "--dpi-desync-fooling=md5sig", "<HOSTLIST>", "--new", "--filter-tcp=443", "--dpi-desync=fake,multisplit", "--dpi-desync-repeats=11", "--dpi-desync-fooling=md5sig", "--dpi-desync-fake-tls=/data/adb/modules/zapret/fake/tls_clienthello_vk_com.bin", "--dpi-desync-fake-tls-mod=rnd,dupsid,sni=vk.com", "--dpi-desync-split-seqovl=681", "<HOSTLIST>", "--new", "--filter-udp=443", "--dpi-desync=fake", "--dpi-desync-udplen-increment=250", "--dpi-desync-udplen-pattern=/data/adb/modules/zapret/fake/tls_clienthello_gosuslugi_ru.bin", "--dpi-desync-repeats=6", "--dpi-desync-fake-quic=/data/adb/modules/zapret/fake/quic_initial_vk_com.bin", "<HOSTLIST>", "--new", "--filter-udp=50000-50099", "--filter-l7=discord,stun", "--dpi-desync=fake", "--dpi-desync-repeats=5", "--dpi-desync-udplen-increment=200", "--dpi-desync-udplen-pattern=/data/adb/modules/zapret/fake/tls_clienthello_gosuslugi_ru.bin"</font>
  - ports
    - tcp
      - Тип: []string
      - TCP порты трафик на которых будет отправлен на NFQUEUE 200
      - Важно: Диапозоны указываются в формате `<начало диапозона>:<конец диапозона>`
      - По умолчанию: "80", "443"
    - udp
      - Тип: []string
      - UDP порты трафик на которых будет отправлен на NFQUEUE 200
      - Важно: Диапозоны указываются в формате `<начало диапозона>:<конец диапозона>`
      - По умолчанию: "443", "50000:50099"
