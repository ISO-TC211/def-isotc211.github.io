SHELL := /bin/bash

all: _site

clean:
	rm -rf _site

_site:
	mkdir -p $@; \
	cp -a ontologies $@

update-init:
	git submodule update --init

update-modules:
	git submodule foreach git pull origin master

.PHONY: all update-init update-modules
