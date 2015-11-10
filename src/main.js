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

var PDController = require('./controller/pdcontroller');
var VPDController = require('./controller/vpdcontroller');

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

    var t = 0;
    var pdc = new PDController(world.joints['rShoulder'], 0, {kp: 300, kd: 0});
    world.go(function() {

        if (t < 4) {
            world.simulator.entities['uTorso'].body.applyForce(new Ammo.btVector3(1,0,0));
        }
        else {
            pdc.goal = -1.57;
            var torque = pdc.evaluate()
            world.joints['rShoulder'].addTorque(torque);
            console.log(torque);
        }
        

        t += 1/1000;

    });

    /*
    var controllers = {};
    var dt    = .3;
    var dt2   = .03;
    var cde   = 0;
    var cdo   = -2.2;
    var cve   = -.2;
    var cvo   = 0;
    var tor   = 0;
    var swhe  = -.4;
    var swho  = .7;
    var swke  =  1.1;
    var swko  = .05;
    var stke  = .05;
    var stko  = .1;
    var ankle = -.2;

    for (var name in human.joints) {
        controllers[name] = new PDController(world.joints[name], 0);
    }

    var rHip_uTorsoVPD = new VPDController(world.joints['rHip'], world.entities['uTorso'], 0);
    var lHip_lThighVPD = new VPDController(world.joints['lHip'], world.entities['rThigh'], 0);

    var lHip_uTorsoVPD = new VPDController(world.joints['lHip'], world.entities['uTorso'], 0);
    var rHip_rThighVPD = new VPDController(world.joints['rHip'], world.entities['lThigh'], 0);

    var lHip = world.joints['lHip'];
    var rHip = world.joints['rHip'];


    var t = 0;
    var phase = 0;
    world.go(function() {

            t += 1/1000;

            if (phase === 0) {

                lHip_uTorsoVPD.goal = tor;
                rHip_rThighVPD.goal = swhe;

                var lh_ut_torque = lHip_uTorsoVPD.evaluate();
                lHip.addTorque(lh_ut_torque);

                var rh_rt_torque = rHip_rThighVPD.evaluate();
                rHip.addTorque(rh_rt_torque);


                controllers['neck2head'].goal = 0;
                controllers['uTorso2neck'].goal = 0;
                controllers['waist'].goal = 0;
                controllers['waist'].kp = 600;
                controllers['waist'].kd = 60;

                controllers['lTorso2uTorso'].goal = 0;
                controllers['lTorso2uTorso'].kp = 600;
                controllers['lTorso2uTorso'].kd = 60;

                controllers['lWrist'].goal = 0;
                controllers['lWrist'].kp = 5;
                controllers['lWrist'].kd = 3;

                controllers['rWrist'].goal = 0;
                controllers['rWrist'].kp = 5;
                controllers['rWrist'].kd = 3;

                controllers['rKnee'].goal = swke;
                controllers['rAnkle'].goal = ankle;
                controllers['lKnee'].goal = stke;
                controllers['lAnkle'].goal = ankle;

                controllers['rShoulder'].goal = .3;
                controllers['rShoulder'].kp = 100;
                controllers['rShoulder'].kd = 30;

                controllers['rElbow'].goal = 0;
                controllers['rElbow'].kp = 100;
                controllers['rElbow'].kd = 30;


                controllers['lShoulder'].goal = -.3;
                controllers['lShoulder'].kp = 100;
                controllers['lShoulder'].kd = 30;

                controllers['rElbow'].goal = -.4;
                controllers['rElbow'].kp = 100;
                controllers['rElbow'].kd = 30;
                if (t > dt) {
                    t = 0;
                    phase = 1;
                }
            } else if (phase === 1) {

                controllers['rKnee'].goal = swko;
                controllers['lKnee'].goal = stko;

                lHip_uTorsoVPD.goal = tor;
                rHip_rThighVPD.goal = swho;

                var lh_ut_torque = lHip_uTorsoVPD.evaluate();
                lHip.addTorque(lh_ut_torque);
                console.log(lh_ut_torque);

                var rh_rt_torque = rHip_rThighVPD.evaluate();
                rHip.addTorque(rh_rt_torque);

                var test = new Ammo.ConcreteContactResultCallback();
                test.addSingleResult = function( cp, colObj0, partid0, index0, colObj1, partid1, index1 ) {
                    t= 0;
                    phase = 2;
                }
                world.simulator.dynamicsWorld.contactPairTest(world.simulator.entities['rFoot'].body, world.simulator.entities['ground'].body, test);

            } else if (phase === 2) {
                controllers['lKnee'].goal = swke;
                controllers['rKnee'].goal = stke;
                controllers['rShoulder'].goal = -.3;
                controllers['lShoulder'].goal = .3;
                controllers['rElbow'].goal = -.4;
                controllers['lElbow'].goal = 0;

                rHip_uTorsoVPD.goal = tor;
                lHip_lThighVPD.goal = swhe;

                var rh_ut_torque = rHip_uTorsoVPD.evaluate();
                rHip.addTorque(rh_ut_torque);

                var lh_lt_torque = lHip_lThighVPD.evaluate();
                lHip.addTorque(lh_lt_torque);

                if (t > dt) {
                    t = 0;
                    phase = 3;
                }
            } else if (phase === 3) {
                controllers['lKnee'].goal = swko;
                controllers['rKnee'].goal = stko;

                rHip_uTorsoVPD.goal = tor;
                lHip_lThighVPD.goal = swho;

                var rh_ut_torque = rHip_uTorsoVPD.evaluate();
                rHip.addTorque(rh_ut_torque);

                var lh_lt_torque = lHip_lThighVPD.evaluate();
                lHip.addTorque(lh_lt_torque);

                var test = new Ammo.ConcreteContactResultCallback();
                test.addSingleResult = function( cp, colObj0, partid0, index0, colObj1, partid1, index1 ) {
                    t = 0;
                    phase = 0;
                }
                world.simulator.dynamicsWorld.contactPairTest(world.simulator.entities['lFoot'].body, world.simulator.entities['ground'].body, test);
            }

            for (var name in controllers) {
                var torque = controllers[name].evaluate();
                controllers[name].joint.addTorque(torque);
            }
        }
    );
    */

});
