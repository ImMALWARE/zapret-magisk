# Magisk module with zapret
[README на русском](https://github.com/ImMALWARE/zapret-magisk/blob/main/README.md)
> Original zapret repository: https://github.com/bol-van/zapret

1. Download the module here: https://github.com/ImMALWARE/zapret-magisk/releases/latest/download/zapret_module.zip
2. Install the module and reboot as usual. **zapret** will be launched automatically.

# All control methods
### Action Button
The Action button in Magisk stops/starts zapret.
### Files
The list of blocked site domains is located in `/data/adb/zapret/autohosts.txt`. Add a domain there in case the site you need does not work.

If an unblocked site stops opening, add its domain to `/data/adb/zapret/ignore.txt`.

The config (strategy) is located in `/data/adb/zapret/config.txt`.
### KsuWebUI
The module has a KsuWebUI web interface. Download the application of the same name here: https://github.com/5ec1cff/KsuWebUIStandalone/releases/download/v1.0/KsuWebUI-1.0-34-release.apk

When you launch it, grant it root access and select zapret.

On the Main tab, you can stop/start zapret, and enable/disable autostart on Android boot.

On the Domains tab, you can add/remove domains by editing **autohosts** and **ignore**.

On the Config tab, you can edit the config.

On the Check tab, the script will check the connection to all domains from `autohosts.txt` with the current strategy.
### Commands
In Termux, you can execute commands:

`su -c zapret start` - start

`su -c zapret stop` - stop

`su -c zapret autostart-on` - enable autostart

`su -c zapret autostart-off` - disable autostart
# Variables in config.txt

`{hosts}` — will substitute the path to `autohosts.txt`

`{ipset}` — will substitute the path to `ipset.txt`

`{ignore}` — will substitute the path to `ignore.txt`

`{youtube}` — will substitute the path to `/etc/youtube.txt`

`{quicgoogle}` — will substitute the path to `/etc/quic_initial_www_google_com.bin`

`{tlsgoogle}` — will substitute the path to `/etc/tls_clienthello_www_google_com.bin`