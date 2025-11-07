SHELL := /bin/bash

all: _site

clean:
	bundle exec jekyll clean
	rm -rf build_source

build_source:
	mkdir -p $@; \
	cp -a source/* build_source; \

_site: build_source
	bundle exec jekyll build

serve: _site
	bundle exec jekyll serve


.PHONY: all clean serve update-init update-modules
