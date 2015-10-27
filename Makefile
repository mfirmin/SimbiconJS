

all: static/bundle.js Makefile

clean: 
	rm static/bundle.js

static/bundle.js: src/main.js src/world/world.js src/entity/entity.js src/entity/box.js src/entity/capsule.js src/entity/cylinder.js src/entity/sphere.js 
	browserify src/main.js -o static/bundle.js
