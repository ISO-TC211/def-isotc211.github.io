SHELL := /bin/bash

all: _site

clean:
	rm -rf _site build_source

build_source:
	mkdir -p $@; \
	mkdir -p $@/ontologies; \
	cp -a source/* build_source; \
	cp -a ontologies/* build_source; \
	cp -a ontologies/* build_source/ontologies; \

_site: build_source
	bundle exec jekyll build

serve: _site
	bundle exec jekyll serve

update-init:
	git submodule update --init

update-modules:
	git submodule foreach git pull origin master

.PHONY: all clean serve update-init update-modules
