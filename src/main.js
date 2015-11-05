var $           = require('jquery');

var World       = require('./world/world');
var Renderer    = require('./renderer/renderer');
var Simulator   = require('./simulator/simulator');
var Sphere      = require('./entity/sphere');
var Box         = require('./entity/box');
var Capsule     = require('./entity/capsule');
var Cylinder    = require('./entity/cylinder');

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

    var box1 = new Box('box1', [1,1,1], {
        mass: 1,
        color: [0,0,255],
    });
    box1.setPosition([.5,10,.5]);
    world.addEntity(box1);

    world.simulator.addJoint('pt2wall', {'A': 'box1'}, [-.5,.5,-.5]);

    var box2 = new Box('box2', [1,1,1], {
        mass: 1,
        color: [0,0,255],
    });
    box2.setPosition([1.5,10,.5]);
    world.addEntity(box2);

    world.simulator.addJoint('pt2pt', {'A': 'box1', 'B': 'box2'}, [.5,-.5,.5], [-.5, -.5, .5]);

    var box3 = new Box('box3', [1,1,1], {
        mass: 1,
        color: [0,0,255],
    });
    box3.setPosition([2.5,10,.5]);
    world.addEntity(box3);

    world.simulator.addJoint('pt2pt', {'A': 'box2', 'B': 'box3'}, [.5,.5,-.5], [-.5, .5, -.5]);

    ground.setPosition([0,-2.5,0]);

    world.addEntity(ground);

    world.go();

    var i = 0;
    $('#addsphere').click(function() {
        var sphere = new Sphere('sphere'+(++i), Math.random()*2, {
            mass: 1,
            color: [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)],
        });
        sphere.setPosition([Math.random()*10-5,Math.random()*10+5,Math.random()*10-5]);
        world.addEntity(sphere);
    });
    $('#addbox').click(function() {
        var box = new Box('box'+(++i), [Math.random()*2, Math.random()*2, Math.random()*2], {
            mass: 1,
            color: [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)],
        });
        box.setPosition([Math.random()*10-5,Math.random()*10+5,Math.random()*10-5]);
        world.addEntity(box);
    });

    $('#addcylinder').click(function() {
        var cylinder = new Cylinder('cylinder'+(++i), Math.random()*2, Math.random()*2, {
            mass: 1,
            color: [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)],
        });
        cylinder.setPosition([Math.random()*10-5,Math.random()*10+5,Math.random()*10-5]);
        world.addEntity(cylinder);
    });

    $('#addcapsule').click(function() {
        var capsule = new Capsule('capsule'+(++i), Math.random()*2, Math.random()*2, {
            mass: 1,
            color: [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)],
        });
        capsule.setPosition([Math.random()*10-5,Math.random()*10+5,Math.random()*10-5]);
        world.addEntity(capsule);
    });

});
