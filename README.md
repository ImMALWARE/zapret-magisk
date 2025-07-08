# Magisk модуль с zapret
> Оригинальный репозиторий zapret: https://github.com/bol-van/zapret

1. Скачайте модуль тут: https://github.com/ImMALWARE/zapret-magisk/releases/download/7/zapret_module.zip
2. Установите модуль, перезагрузитесь, как обычно. **zapret** будет запущен автоматически.

# Все способы управления
### Кнопка Action
Кнопка Action в Magisk останавливает/запускает zapret.
### Файлы
Список доменов заблокированных сайтов находится в `/data/adb/zapret/autohosts.txt`. Добавьте туда домен в случае, если нужный вам сайт не работает.

Если незаблокированный сайт почему-то перестал открываться, добавьте его домен в `/data/adb/zapret/ignore.txt`.

Конфиг (стратегия) находится в `/data/adb/zapret/config.txt`.
### KsuWebUI
Модуль имеет веб-интерфейс KsuWebUI. Скачайте одноименное приложение тут: https://github.com/5ec1cff/KsuWebUIStandalone/releases/download/v1.0/KsuWebUI-1.0-34-release.apk

При запуске разрешите ему root, выберите zapret.

На вкладке Главная можно останавливать/запускать zapret, включать/отключать автозапуск при загрузке Android.

На вкладке Домены можно добавлять/удалять домены, редактируя autohosts и ignore

На вкладке Конфиг можно отредактировать конфиг

На вкладке Проверка скрипт проверит соединение ко всем доменам из `autohosts.txt` с текущей стратегией.
### Команды
В Termux можно выполнять команды:

`su -c zapret start` - запуск

`su -c zapret start` - остановка

`su -c zapret autostart-on` - включить автозапуск

`su -c zapret autostart-off` - отключить автозапуск
# Переменные в config.txt

`{hosts}` — подставит путь к `autohosts.txt`

`{ignore}` — подставит путь к `ignore.txt`

`{youtube}` — подставить путь к `/etc/youtube.txt`

`{quicgoogle}` — подставит путь к `/etc/quic_initial_www_google_com.bin`

`{tlsgoogle}` — подставит путь к `/etc/tls_clienthello_www_google_com.bin`