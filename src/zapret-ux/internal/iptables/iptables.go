package iptables

import (
	"context"
	"fmt"
	"os/exec"
	"strings"

	"github.com/spf13/viper"
)

type iptables struct {
	connbytesSupport bool
	markSupport      bool
	multiportSupport bool
	nfqwsPortsTcp    []string
	nfqwsPortsUdp    []string
}

func NewIptables() *iptables {
	return &iptables{
		connbytesSupport: viper.GetBool("iptables.connbytesSupport"),
		markSupport:      viper.GetBool("iptables.markSupport"),
		multiportSupport: viper.GetBool("iptables.multiportSupport"),
		nfqwsPortsTcp:    viper.GetStringSlice("nfqws.ports.tcp"),
		nfqwsPortsUdp:    viper.GetStringSlice("nfqws.ports.udp"),
	}
}

func (ip *iptables) SetupIptables(ctx context.Context) error {
	if ip.multiportSupport {
		if err := ip.setupIptablesMultiport(ctx); err != nil {
			return err
		}
	} else {
		if err := ip.setupIptablesTcp(ctx); err != nil {
			return err
		}
		if err := ip.setupIptablesUdp(ctx); err != nil {
			return err
		}
	}

	if err := exec.CommandContext(ctx, "sysctl", "-w", "net.netfilter.nf_conntrack_tcp_be_liberal=1").Run(); err != nil {
		return err
	}

	return nil
}

func (ip *iptables) CleanIptables(ctx context.Context) error {
	if err := exec.CommandContext(ctx, "iptables", "-t", "mangle", "-F").Run(); err != nil {
		return err
	}
	return nil
}

func (ip *iptables) enableMarkAndConnbytes(iptablesArgs *[]string) {
	if ip.markSupport {
		*iptablesArgs = append(*iptablesArgs, []string{"-m", "mark", "!", "--mark", "0x40000000/0x40000000"}...)
	}
	if ip.connbytesSupport {
		*iptablesArgs = append(*iptablesArgs, []string{"-m", "connbytes", "--connbytes-dir=original",
			"--connbytes-mode=packets", "--connbytes", "1:6"}...)
	}
}

func (ip *iptables) setupIptablesMultiport(ctx context.Context) error {
	tcpPortsString := strings.Join(ip.nfqwsPortsTcp, ",")
	udpPortsString := strings.Join(ip.nfqwsPortsUdp, ",")

	fmt.Printf("Добавление правила для TCP портов %s (multiport)\n", tcpPortsString)
	cmdArgsTCP := []string{"-t", "mangle", "-I", "POSTROUTING", "-p", "tcp", "-m", "multiport",
		"--dports", tcpPortsString, "-j", "NFQUEUE", "--queue-num", "200", "--queue-bypass"}
	ip.enableMarkAndConnbytes(&cmdArgsTCP)
	if err := exec.CommandContext(ctx, "iptables", cmdArgsTCP...).Run(); err != nil {
		return &ErrSetupPortRule{
			Protocol:  "tcp",
			Multiport: true,
			Connbytes: ip.connbytesSupport,
			Mark:      ip.markSupport,
			Err:       err,
		}
	}

	fmt.Printf("Добавление правила для UDP портов %s (multiport)\n", udpPortsString)
	cmdArgsUDP := []string{"-t", "mangle", "-I", "POSTROUTING", "-p", "udp", "-m", "multiport",
		"--dports", udpPortsString, "-j", "NFQUEUE", "--queue-num", "200", "--queue-bypass"}
	ip.enableMarkAndConnbytes(&cmdArgsUDP)
	if err := exec.CommandContext(ctx, "iptables", cmdArgsUDP...).Run(); err != nil {
		return &ErrSetupPortRule{
			Protocol:  "udp",
			Multiport: true,
			Connbytes: ip.connbytesSupport,
			Mark:      ip.markSupport,
			Err:       err,
		}
	}

	return nil
}

func (ip *iptables) setupIptablesTcp(ctx context.Context) error {
	for _, port := range ip.nfqwsPortsTcp {
		fmt.Printf("Добавление правила для TCP порта %s\n", port)
		cmdArgs := []string{"-t", "mangle", "-I", "POSTROUTING", "-p", "tcp", "--dport", port,
			"-j", "NFQUEUE", "--queue-num", "200", "--queue-bypass"}
		ip.enableMarkAndConnbytes(&cmdArgs)
		if err := exec.CommandContext(ctx, "iptables", cmdArgs...).Run(); err != nil {
			return &ErrSetupPortRule{
				Protocol:  "tcp",
				Multiport: false,
				Connbytes: ip.connbytesSupport,
				Mark:      ip.markSupport,
				Err:       err,
			}
		}
	}

	return nil
}

func (ip *iptables) setupIptablesUdp(ctx context.Context) error {
	for _, port := range ip.nfqwsPortsUdp {
		fmt.Printf("Добавление правила для UDP порта %s\n", port)
		cmdArgs := []string{"-t", "mangle", "-I", "POSTROUTING", "-p", "udp", "--dport", port,
			"-j", "NFQUEUE", "--queue-num", "200", "--queue-bypass"}
		ip.enableMarkAndConnbytes(&cmdArgs)
		if err := exec.CommandContext(ctx, "iptables", cmdArgs...).Run(); err != nil {
			return &ErrSetupPortRule{
				Protocol:  "udp",
				Multiport: false,
				Connbytes: ip.connbytesSupport,
				Mark:      ip.markSupport,
				Err:       err,
			}
		}
	}

	return nil
}
