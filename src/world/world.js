var Box      = require('../entity/box');
var Cylinder = require('../entity/cylinder');
var Sphere   = require('../entity/sphere');
var Capsule  = require('../entity/capsule');
var Plane    = require('../entity/plane');

function World(renderer, simulator, opts) {

    opts = (opts === undefined) ? {} : opts;

    this.renderer = renderer;
    this.simulator = simulator;

    this.FPS = (opts.FPS === undefined) ? 1000/30. : opts.FPS;

    this.entities = {};
    this.joints   = {};
}

World.prototype.constructor = World;

World.prototype.addJoint = function(j, opts) {
    opts = (opts === undefined) ? {} : opts;
    opts['render'] = (opts.render === undefined) ? false: opts.render;

    var name = j.name;
    if (name in this.entities) {
        console.error('Cannot add entity. Entity with name ' + name + 'already exists.');
        return -1;
    }

    if (opts.render) {
        this.renderer.addJoint(j);
    }

    this.simulator.addJoint(j);

    this.joints[name] = j;

};

World.prototype.addEntity = function(e, opts) {

    opts = (opts === undefined) ? {} : opts;
    opts['render'] = (opts.render === undefined) ? true : opts.render;

    opts['simulate'] = (opts.simulate === undefined) ? true : opts.simulate;
    
    var name = e.name;
    if (name in this.entities) {
        console.error('Cannot add entity. Entity with name ' + name + 'already exists.');
        return -1;
    }

    if (opts.render) {
        this.renderer.addEntity(e);
    }

    if (opts.simulate) {
        this.simulator.addEntity(e);
    }

    this.entities[name] = e;

};

World.prototype.go = function(simulationCallback, renderCallback) {

    var scope = this;

    var last = Date.now();
    function animate() {

        requestAnimationFrame(animate);

        var now = Date.now();
        var elapsed = now - last;
        if (elapsed > 1/30*1000) {
            for (var time = 0; time < 1/60; time+= 0.0001) {
                scope.step(simulationCallback);
            }

            renderCallback();
            scope.render();
            last = now;
        }

    }

    /*
    for (var i = 0; i < 1000; i++) {
        animate();
    }
    */

    requestAnimationFrame(animate);

};

World.prototype.render = function() {
    this.renderer.render();
};

World.prototype.step = function(elapsed) {

    this.simulator.step(elapsed);

};

module.exports = World;
