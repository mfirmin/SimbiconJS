

all: static/bundle.js Makefile

clean: 
	rm static/bundle.js

static/bundle.js: src/main.js src/world/world.js src/simulator/simulator.js src/renderer/renderer.js src/entity/entity.js src/entity/box.js src/entity/capsule.js src/entity/cylinder.js src/entity/sphere.js src/joints/joint.js src/joints/hinge.js src/joints/ball.js src/controller/pdcontroller.js
	browserify src/main.js -o static/bundle.js
