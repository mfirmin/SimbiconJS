

all: static/pear.js Makefile

clean: 
	rm static/pear.js

static/pear.js: src/pear.js src/world/world.js src/simulator/simulator.js src/renderer/renderer.js src/entity/entity.js src/entity/box.js src/entity/capsule.js src/entity/cylinder.js src/entity/sphere.js src/joint/joint.js src/joint/hinge.js src/joint/ball.js src/controller/pdcontroller.js src/controller/vpdcontroller.js src/utils/utils.js
	browserify src/pear.js --s Pear > static/pear.js
