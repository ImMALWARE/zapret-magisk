# Magisk модуль с zapret

## Скачать тут: 

## Установите модуль, перезагрузитесь, как обычно. **zapret** будет запущен автоматически. YouTube и Discord (с голосовыми чатами) должны работать корректно.

Другие заблокированные сайты впервые откроются не сразу, только с ~пятого раза. Потому что zapret работает в режиме автоматического списка. После того, как они хотя бы один раз открылись, в следующий раз они будут открываться сразу.

Если нужно остановить zapret, придётся установить приложение Termux и выполнить команду:
```sh
su -c zapret stop
```
Если не нужен автозапуск, то выполните команду:
```sh
su -c rm /data/adb/modules/zapret/autostart
```
Если нужно сново включить автозапуск, выполнните команду:
```sh
su -c touch /data/adb/modules/zapret/autostart
```
Запускать zapret тогда нужно будет по команде:
```sh
su -c zapret start
```
