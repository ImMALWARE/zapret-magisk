package iptables

import (
	"fmt"
)

type ErrSetupPortRule struct {
	Protocol  string
	Multiport bool
	Connbytes bool
	Mark      bool
	Err       error
}

func (e *ErrSetupPortRule) Error() string {
	return fmt.Sprintf("protocol: %s, multiport: %v, connbytes %v, mark %v, error: %s", e.Protocol, e.Multiport, e.Connbytes, e.Mark, e.Err)
}
