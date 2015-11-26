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
        this.renderer.addEntity(e, opts);
    }

    if (opts.simulate) {
        this.simulator.addEntity(e);
    }

    this.entities[name] = e;

};

World.prototype.go = function(simulationCallback, renderCallback) {

    var scope = this;
    var ready = true;
    var fps = 1000/30;

    function animate() {

        requestAnimationFrame(animate);

        var now = Date.now();
        if (ready) {
            ready = false;
            var time = 0;
            while (Date.now() - now < fps) {
                scope.step(simulationCallback);
                time += 0.0001;
            }

            renderCallback(time);
            scope.render();
            ready = true;
        }
    }

    requestAnimationFrame(animate);

};

World.prototype.render = function() {
    this.renderer.render();
};

World.prototype.step = function(elapsed) {

    this.simulator.step(elapsed);

};

module.exports = World;
