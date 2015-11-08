var $           = require('jquery');

var World       = require('./world/world');
var Renderer    = require('./renderer/renderer');
var Simulator   = require('./simulator/simulator');
var Sphere      = require('./entity/sphere');
var Box         = require('./entity/box');
var Capsule     = require('./entity/capsule');
var Cylinder    = require('./entity/cylinder');
var Hinge       = require('./joints/hinge');
var Ball        = require('./joints/ball');

var FPS = 1000/30;


$(document).ready(function() {

    var simulator = new Simulator();
    var renderer  = new Renderer();

    var world = new World(renderer, simulator, {FPS: FPS});
    var ground = new Box('ground', [10,5,10], {mass: 0, color: [0,0,255]});
    ground.setPosition([0,-2.5,0]);
    world.addEntity(ground);

    // MAKE HUMAN!

    for (var e in human.parts) {
        var eInfo = human.parts[e];

        var entity;
        switch (eInfo.type) {
            case "SPHERE": 
                entity = new Sphere(e, eInfo.radius, { "mass": eInfo.mass });
                break;
            case "CAPSULE": 
                entity = new Capsule(e, (eInfo.radiusTop + eInfo.radiusBottom)/2, eInfo.height, {"mass": eInfo.mass});
                break;
            case "BOX":
                entity = new Box(e, eInfo.sides, { "mass": eInfo.mass });
                break;
            default:
                throw "Unknown Entity type: " + eInfo.type;
        }
        entity.setPosition(eInfo.position);
        world.addEntity(entity);
    }

    for (var j in human.joints) {
        var jInfo = human.joints[j];

        var joint;
        switch(jInfo.type) {
            case "HINGE":
                joint = new Hinge(j, 
                                  {"A": jInfo.A, "B": jInfo.B}, 
                                  jInfo.position, 
                                  jInfo.axis, 
                                  {"lo": jInfo.min[2], "hi": jInfo.max[2]});
                break;
            default:
                throw "Unknown Joint type: " + jInfo.type;
        }
        world.addJoint(joint, true);
    }

    world.go();

    /*
    var box1 = new Box('box1', [1,1,1], {
        mass: 1,
        color: [0,0,255],
    });
    box1.setPosition([.5,5,.5]);
    world.addEntity(box1);

    var b1_world = new Ball('b1_world', {'A': 'box1'}, [0, 5.5, 0]);
    world.addJoint(b1_world);

    var box2 = new Box('box2', [1,1,1], {
        mass: 1,
        color: [0,0,255],
    });
    box2.setPosition([1.5,5,.5]);
    world.addEntity(box2);

    var b1_b2 = new Hinge('b1_b2', {'A': 'box1', 'B': 'box2'}, [1, 4.5, .5], [0,0,1]);
    world.addJoint(b1_b2);
    */

});
