var Renderer    = require('../renderer/renderer');
var Simulator   = require('../simulator/simulator');
var Box      = require('../entity/box');
var Cylinder = require('../entity/cylinder');
var Sphere   = require('../entity/sphere');
var Capsule  = require('../entity/capsule');
var Plane    = require('../entity/plane');

function World(opts) {

    opts = (opts === undefined) ? {} : opts;


    this.FPS = (opts.FPS === undefined) ? 1/30. : opts.FPS;
    this.dt  = (opts.dt === undefined) ? 0.0001 : opts.dt;

    this.renderer = new Renderer();
    this.simulator = new Simulator(this.dt);

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

World.prototype.go = function(opts) {

    var scope = this;
    var ready = true;
    var fpms = this.FPS*1000;

    this.simulator.setCallback(opts.simulationCallback);
    this.renderer.setCallback(opts.renderCallback);

    function animate() {

        requestAnimationFrame(animate);

        var now = Date.now();
        if (ready) {
            ready = false;
            var time = 0;
            while (Date.now() - now < fpms) {
                scope.step();
                time += this.dt;
            }

            scope.render(time);
            ready = true;
        }
    }

    requestAnimationFrame(animate);

};

World.prototype.render = function(time) {
    this.renderer.render(time);
};

World.prototype.step = function() {

    this.simulator.step();

};

module.exports = World;
