package nfqws

import (
	"context"
	"fmt"
	"log"
	"os/exec"
	"time"

	"github.com/nteditor/zapret-manager/internal/iptables"
	"github.com/spf13/viper"
)

type nfqws struct {
	opt          []string
	markSupport  bool
	hostlistMode string
}

func NewNfqws() *nfqws {
	return &nfqws{
		opt:          viper.GetStringSlice("nfqws.opt"),
		markSupport:  viper.GetBool("iptables.markSupport"),
		hostlistMode: viper.GetString("nfqws.hostlist"),
	}
}

func (nf *nfqws) Start() {
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(5)*time.Second)
	defer cancel()

	iptables := iptables.NewIptables()
	if err := iptables.SetupIptables(ctx); err != nil {
		if err := iptables.CleanIptables(ctx); err != nil {
			log.Printf("%v", err)
		}
		log.Fatalf("%v", err)
	}

	nfqwsArgs := []string{"--debug=android", "--daemon", "--qnum=200", "--uid=0:0"}
	nf.enableMark(&nfqwsArgs)

	nf.enableHostlist(&nf.opt)

	output, err := exec.CommandContext(ctx, "/system/bin/nfqws", append(nfqwsArgs, nf.opt...)...).CombinedOutput()
	fmt.Println(string(output))
	if err != nil {
		if _, ok := err.(*exec.ExitError); !ok {
			log.Fatalf("%v", err)
		}
	}
}

func (nf *nfqws) Stop() {
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(5)*time.Second)
	defer cancel()

	output, err := exec.CommandContext(ctx, "killall", "nfqws").CombinedOutput()
	fmt.Println(string(output))
	if err != nil {
		if _, ok := err.(*exec.ExitError); !ok {
			log.Printf("%v", err)
		}
	} else {
		fmt.Println("nfqws успешно остоновлен")
	}

	if err := iptables.NewIptables().CleanIptables(ctx); err != nil {
		log.Fatalf("%v", err)
	} else {
		fmt.Println("iptables правила успешно очищены")
	}
}

func (nf *nfqws) Status() (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(5)*time.Second)
	defer cancel()

	if err := exec.CommandContext(ctx, "pgrep", "nfqws").Run(); err != nil {
		if err, ok := err.(*exec.ExitError); ok && err.ExitCode() != 0 {
			return false, nil
		} else {
			return false, err
		}
	} else {
		return true, nil
	}
}

func (nf *nfqws) enableHostlist(nfqwsArgs *[]string) {
	var updatedArgs []string

	switch nf.hostlistMode {
	case "autohostlist":
		for _, opt := range *nfqwsArgs {
			if opt == "<HOSTLIST>" {
				updatedArgs = append(updatedArgs, []string{
					"--hostlist=/data/adb/modules/zapret/list/zapret-hosts.txt",
					"--hostlist-exclude=/data/adb/modules/zapret/list/zapret-hosts-exclude.txt",
					"--hostlist=/data/adb/zapret/zapret-hosts-user.txt",
					"--hostlist-exclude=/data/adb/zapret/zapret-hosts-user-exclude.txt",
					"--hostlist-auto=/data/adb/zapret/zapret-hosts-auto.txt",
					"--hostlist-auto-fail-threshold=3",
					"--hostlist-auto-fail-time=60",
					"--hostlist-auto-retrans-threshold=3",
				}...)
			} else {
				updatedArgs = append(updatedArgs, opt)
			}
		}
	case "hostlist":
		for _, opt := range *nfqwsArgs {
			if opt == "<HOSTLIST>" {
				updatedArgs = append(updatedArgs, []string{
					"--hostlist=/data/adb/modules/zapret/list/zapret-hosts.txt",
					"--hostlist-exclude=/data/adb/modules/zapret/list/zapret-hosts-exclude.txt",
					"--hostlist=/data/adb/zapret/zapret-hosts-user.txt",
					"--hostlist-exclude=/data/adb/zapret/zapret-hosts-user-exclude.txt",
				}...)
			} else {
				updatedArgs = append(updatedArgs, opt)
			}
		}
	default:
		for _, opt := range *nfqwsArgs {
			if opt == "<HOSTLIST>" {
				continue
			} else {
				updatedArgs = append(updatedArgs, opt)
			}
		}
	}

	*nfqwsArgs = updatedArgs
}

func (nf *nfqws) enableMark(nfqwsArgs *[]string) {
	if nf.markSupport {
		*nfqwsArgs = append(*nfqwsArgs, "--dpi-desync-fwmark=0x40000000")
	}
}
