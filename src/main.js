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
    var e = new Sphere('s1', 1, {mass: 1});
    var ground = new Box('ground', [50,50,50], {mass: 0});

    e.setPosition([0,11,0]);

    ground.setPosition([0,-25,0]);

    world.addEntity(e);
    world.addEntity(ground);

    world.go();

});
