var $           = require('jquery');

var World       = require('./world/world');
var Renderer    = require('./renderer/renderer');
var Simulator   = require('./simulator/simulator');
var Sphere      = require('./entity/sphere');
var Box         = require('./entity/box');

var FPS = 1000/30;


$(document).ready(function() {

    var simulator = new Simulator();
    var renderer  = new Renderer();

    var world = new World(renderer, simulator, {FPS: FPS});
    var ground = new Box('ground', [10,5,10], {mass: 0});

    var e = new Sphere('s1', 1, {
        mass: 1,
        color: [255,0,0],
    });
    e.setPosition([0,1,0]);
    world.addEntity(e);

    var e2 = new Sphere('s2', 1, {
        mass: 1,
        color: [0,255,0],
    });
    e2.setPosition([2,1,0]);
    world.addEntity(e2);

    var e3 = new Sphere('s3', 1, {
        mass: 1,
        color: [0,0,255],
    });
    e3.setPosition([1,2,0]);
    world.addEntity(e3);

    ground.setPosition([0,-2.5,0]);

    world.addEntity(ground);

    world.go();

});
