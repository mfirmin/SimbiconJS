var $ = Coach.lib.$;

var FPS = 30;
var dt = 0.0002;

$(document).ready(function() {

    var world = new Coach.World({
        "FPS": 30.,
        "dt": dt,
        "cameraOptions": {
            "type": "perspective",
            "position": [5, 2, 5],
            "target": [0,1,0],
        },
    }, '#simbicon');

    var ground = new Coach.entities.Box('ground', [100,1,100], {mass: 0, color: [100,100,100]});
    ground.setPosition([0,-.5,0]);
    world.addEntity(ground, {shader: {fragmentShader: 'ground_fragShader', vertexShader: 'ground_vertShader'}});

    // MAKE HUMAN!

    var humanoid = new Coach.Character('human');

    humanoid.setFromJSON(human);

    world.addCharacter(humanoid);

    controllers = {};
    for (var name in human.joints) {
        var coeffs = {"kp": 300, "kd": 30};
        if (['lAnkle', 'rAnkle', 'lWrist', 'rWrist'].indexOf(name) !== -1) {
            coeffs["kp"] =  30;
            coeffs["kd"] =  3;
        }
        if (['uTorso2neck', 'neck2head'].indexOf(name) !== -1) {
            coeffs["kp"] =  30;
            coeffs["kd"] =  3;
        }
        controllers['human.'+name] = new Coach.controllers.PDController3D(world.joints['human.'+name], {
            "X": 0,
            "Y": 0,
            "Z": 0,
        }, coeffs);
    }

    var pivot  = new Coach.entities.Sphere('pivot', .1, {mass: 0, color: [255,0,0]});
    pivot.setPosition([0,1,0]);
    var j0 = new Coach.joints.Ball('j0', pivot, world.entities['human.uTorso'], [0,1,0]);

    world.addEntity(pivot);
    world.addJoint(j0);

    var renderCallback = function(camera, time) {
        $('#simRate').text((time*30.).toFixed(1));
    }


    var simbiconParams = {
        dt: .3,
        cde: 0,
        cdo: -2.2,
        cve: -.2,
        cvo: 0,
        tor: 0.,
        swhe: -.4,
        swho: .7,
        swke: -1.1,
        swko: -.05,
        stke: -.05,
        stko: .1,
        ankle: -.2,
    }

    setSimbiconParameters = function(set) {
        for (var entry in set) {
            simbiconParams[entry] = set[entry];
        }
    };


    var rHip_uTorsoVPD = new Coach.controllers.VPDController3D(
        world.joints['human.rHip'],
        world.entities['human.uTorso'],
        [0,0,0],
        {
            kp: 300,
            kd: 30
        }
    );

    var lHip_lThighVPD = new Coach.controllers.VPDController3D(
        world.joints['human.lHip'],
        world.entities['human.lThigh'],
        [0,0,0],
        {
            kp: -300,
            kd: -30
        }
    );

    var lHip_uTorsoVPD = new Coach.controllers.VPDController3D(
        world.joints['human.lHip'],
        world.entities['human.uTorso'],
        [0,0,0],
        {
            kp: 300,
            kd: 30
        }
    );
    var rHip_rThighVPD = new Coach.controllers.VPDController3D(
        world.joints['human.rHip'],
        world.entities['human.rThigh'],
        0,
        {
            kp: -300,
            kd: -30
        }
    );

    var lHip = world.joints['human.lHip'];
    var rHip = world.joints['human.rHip'];


    var COM = { color: [255,0,0], position: [0,1,0], getRadius: function() { return .06; }};

//    var comObj = world.renderer.addSphere(COM);
 //   comObj.position.y = 1;
  //  world.renderer.scene.add(comObj);

    function getCOM() {
        var massTot = 0;
        var posTot = [0,0,0];
        for (var name in human.parts) {
            var pos = world.entities['human.'+name].getPosition();
            var mass = world.entities['human.'+name].getMass();

            posTot = [posTot[0] + pos[0]*mass,posTot[1] + pos[1]*mass,posTot[2] + pos[2]*mass];
            massTot += mass;
        }
        var ret = [posTot[0]/massTot, posTot[1]/massTot, posTot[2]/massTot];
        return ret;
    }

    var com_last = getCOM();

    var t = 0;
    var phase = 0;

    var simulationCallback = function(dt) {

        var com = getCOM();
        var com_vel = [(com[0]-com_last[0])*(1.0/dt), (com[1]-com_last[1])*(1.0/dt), (com[2]-com_last[2])*(1.0/dt), ];

        com_last = [com[0], com[1], com[2]];

        t += dt;

        if (phase === 0) {


            // COMFB

            var d = com[0] - world.joints['human.rAnkle'].getPosition()[0];

            var optimizer = (simbiconParams.cde*d + simbiconParams.cve*com_vel[0]);

//            lHip_uTorsoVPD.setGoal({"Z": simbiconParams.tor});
//            rHip_rThighVPD.setGoal({"Z": (simbiconParams.swhe + optimizer)});

//            var lh_ut_torque = lHip_uTorsoVPD.evaluate(dt);
//            console.log(lh_ut_torque);
//            lHip.addTorque(lh_ut_torque);

//            var rh_rt_torque = rHip_rThighVPD.evaluate(dt);
//            rHip.addTorque(rh_rt_torque);
//            lHip.addTorque([-rh_rt_torque[0], -rh_rt_torque[1], -rh_rt_torque[2]]);


            controllers['human.neck2head'].setGoal({"Z": 0});
            controllers['human.uTorso2neck'].setGoal({"Z": 0});
            controllers['human.waist'].setGoal({"Z": 0});
            controllers['human.waist'].kp = 600;
            controllers['human.waist'].kd = 60;

            controllers['human.lTorso2uTorso'].setGoal({"Z": 0});
            controllers['human.lTorso2uTorso'].kp = 600;
            controllers['human.lTorso2uTorso'].kd = 60;

            controllers['human.lWrist'].setGoal({"Z": 0});
            controllers['human.lWrist'].kp = 5;
            controllers['human.lWrist'].kd = 3;

            controllers['human.rWrist'].setGoal({"Z": 0});
            controllers['human.rWrist'].kp = 5;
            controllers['human.rWrist'].kd = 3;

            controllers['human.rKnee'].setGoal({"Z": simbiconParams.swke});

            controllers['human.rAnkle'].setGoal({"Z": simbiconParams.ankle});

            controllers['human.lKnee'].setGoal({"Z": simbiconParams.stke});

            controllers['human.lAnkle'].setGoal({"Z": simbiconParams.ankle});

            controllers['human.rShoulder'].setGoal({"Z": .3});
            controllers['human.rShoulder'].kp = 100;
            controllers['human.rShoulder'].kd = 30;

            controllers['human.rElbow'].setGoal({"Z": 0});
            controllers['human.rElbow'].kp = 100;
            controllers['human.rElbow'].kd = 30;


            controllers['human.lShoulder'].setGoal({"Z": -.3});
            controllers['human.lShoulder'].kp = 100;
            controllers['human.lShoulder'].kd = 30;

            controllers['human.rElbow'].setGoal({"Z": -.4});
            controllers['human.rElbow'].kp = 100;
            controllers['human.rElbow'].kd = 30;
            if (t > simbiconParams.dt) {
                t = 0;
                phase = 1;
            }
        } else if (phase === 1) {

            var d = com[0] - world.joints['human.rAnkle'].getPosition()[0];

            var optimizer = simbiconParams.cdo*d + simbiconParams.cvo*com_vel;

            controllers['human.rKnee'].setGoal({"Z": simbiconParams.swko});
            controllers['human.lKnee'].setGoal({"Z": simbiconParams.stko});

//            lHip_uTorsoVPD.setGoal({"Z": simbiconParams.tor});
//            rHip_rThighVPD.setGoal({"Z": (simbiconParams.swho + optimizer)});
//
//            var lh_ut_torque = lHip_uTorsoVPD.evaluate(dt);
//            lHip.addTorque(lh_ut_torque);
//
//            var rh_rt_torque = rHip_rThighVPD.evaluate(dt);
//            rHip.addTorque(rh_rt_torque);
//            lHip.addTorque([-rh_rt_torque[0], -rh_rt_torque[1], -rh_rt_torque[2]]);

            var test = new Ammo.ConcreteContactResultCallback();
            test.addSingleResult = function( cp, colObj0, partid0, index0, colObj1, partid1, index1 ) {
                t= 0;
                phase = 2;
            }
            world.simulator.dynamicsWorld.contactPairTest(world.simulator.entities['human.rFoot'].body, world.simulator.entities['ground'].body, test);

        } else if (phase === 2) {
            var d = com[0] - world.joints['human.lAnkle'].getPosition()[0];

            var optimizer = simbiconParams.cde*d + simbiconParams.cve*com_vel;

            controllers['human.lKnee'].setGoal({"Z": simbiconParams.swke});
            controllers['human.rKnee'].setGoal({"Z": simbiconParams.stke});
            controllers['human.rShoulder'].setGoal({"Z": -.3});
            controllers['human.lShoulder'].setGoal({"Z": .3});
            controllers['human.rElbow'].setGoal({"Z": -.4});
            controllers['human.lElbow'].setGoal({"Z": 0});

//            rHip_uTorsoVPD.setGoal({"Z": simbiconParams.tor});
//            lHip_lThighVPD.setGoal({"Z": (simbiconParams.swhe + optimizer)});
//
//            var rh_ut_torque = rHip_uTorsoVPD.evaluate(dt);
//            rHip.addTorque(rh_ut_torque);
//
//            var lh_lt_torque = lHip_lThighVPD.evaluate(dt);
//            lHip.addTorque(lh_lt_torque);
//            rHip.addTorque([-lh_lt_torque[0], -lh_lt_torque[1], -lh_lt_torque[2]]);

            if (t > simbiconParams.dt) {
                t = 0;
                phase = 3;
            }
        } else if (phase === 3) {

            var d = com[0] - world.joints['human.lAnkle'].getPosition()[0];

            var optimizer = simbiconParams.cdo*d + simbiconParams.cvo*com_vel;

            controllers['human.lKnee'].setGoal({"Z": simbiconParams.swko});
            controllers['human.rKnee'].setGoal({"Z": simbiconParams.stko});
//
//            rHip_uTorsoVPD.setGoal({"Z": simbiconParams.tor});
//            lHip_lThighVPD.setGoal({"Z": (simbiconParams.swho + optimizer)});
//
//            var rh_ut_torque = rHip_uTorsoVPD.evaluate(dt);
//            rHip.addTorque(rh_ut_torque);
//
//            var lh_lt_torque = lHip_lThighVPD.evaluate(dt);
//            lHip.addTorque(lh_lt_torque);
//            rHip.addTorque([-lh_lt_torque[0], -lh_lt_torque[1], -lh_lt_torque[2]]);

            var test = new Ammo.ConcreteContactResultCallback();
            test.addSingleResult = function( cp, colObj0, partid0, index0, colObj1, partid1, index1 ) {
                t = 0;
                phase = 0;
            }
            world.simulator.dynamicsWorld.contactPairTest(world.simulator.entities['human.lFoot'].body, world.simulator.entities['ground'].body, test);
        }

        for (var name in controllers) {
            if (name === 'human.lHip') {continue; }
            if (name === 'human.rHip') {continue; }
            var torque = controllers[name].evaluate();
            controllers[name].joint.addTorque(torque);
        }
    };
    var renderCallback = function(camera,time) {
//        var com = getCOM();
//
//        var pos = camera.getPosition();
//        camera.setPosition([com[0], pos[1], pos[2]]);
//
//        world.renderer.light.position.x = com[0];
//
//        $('#simRate').text((time*30.).toFixed(1));
    }

    world.go({renderCallback: renderCallback, simulationCallback: simulationCallback})

//    $('#fwalk').click(function() {
//        setSimbiconParameters({
//            dt: .2,
//            cde: 0,
//            cdo: -2.,
//            cve: -.2,
//            cvo: 0,
//            tor: 0.1,
//            swhe: -.73,
//            swho: .7,
//            swke:  1.83,
//            swko: .05,
//            stke: .05,
//            stko: .1,
//            ankle: -.2,
//        });
//    });
//
//    $('#walk').click(function() {
//        setSimbiconParameters({
//            dt: .3,
//            cde: 0,
//            cdo: -2.2,
//            cve: -.2,
//            cvo: 0,
//            tor: 0.,
//            swhe: -.4,
//            swho: .7,
//            swke:  1.1,
//            swko: .05,
//            stke: .05,
//            stko: .1,
//            ankle: -.2,
//        });
//    });


});
