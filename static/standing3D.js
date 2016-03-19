var $     = Coach.lib.$;
var utils = Coach.utils;

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
        {"X": 0, "Y": 0, "Z": 0},
        {
            kp: -300,
            kd: -30
        }
    );


    var lHip_uTorsoVPD = new Coach.controllers.VPDController3D(
        world.joints['human.lHip'],
        world.entities['human.uTorso'],
        {"X": 0, "Y": 0, "Z": 0},
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

        for (var name in controllers) {
            if (name === 'human.rHip') {continue; }
            if (name === 'human.lHip') {continue; }
            var torque = controllers[name].evaluate();
            controllers[name].joint.addTorque(torque);
        }

        var torque = rHip_uTorsoVPD.evaluate(dt);
        torque = utils.rotateVector(torque, utils.RFromQuaternion(utils.getQuaternionInverse(world.joints["human.rHip"].parent.getOrientation())));
        world.joints['human.rHip'].addTorque(torque);

        var torque2 = lHip_uTorsoVPD.evaluate(dt);
        torque2 = utils.rotateVector(torque2, utils.RFromQuaternion(utils.getQuaternionInverse(world.joints["human.lHip"].parent.getOrientation())));
        world.joints['human.lHip'].addTorque(torque2);
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
