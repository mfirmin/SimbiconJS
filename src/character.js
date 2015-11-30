var World       = require('./world/world');
var Sphere      = require('./entity/sphere');
var Box         = require('./entity/box');
var Capsule     = require('./entity/capsule');
var Cylinder    = require('./entity/cylinder');
var Hinge       = require('./joints/hinge');
var Ball        = require('./joints/ball');

function Character(name, opts) {

    this.opts = (opts === undefined) ? {} : opts;

    this.name = name;

    this.initialize();
}

Character.prototype.constructor = Character;

Character.prototype.initialize = function() {
    this._entities = {};
    this._joints = {};
};

Character.prototype.setFromJSON = function(data, overlayMesh) {

    this._overlayMesh = overlayMesh;

    for (var e in data.parts) {
        var eInfo = data.parts[e];

        var entity;
        switch (eInfo.type) {
            case "SPHERE": 
                entity = new Sphere(e, eInfo.radius, { "mass": eInfo.mass });
                break;
            case "CAPSULE": 
                entity = new Capsule(e, (eInfo.radiusTop + eInfo.radiusBottom)/2.0, eInfo.height, {"mass": eInfo.mass});
                break;
            case "BOX":
                entity = new Box(e, eInfo.sides, { "mass": eInfo.mass });
                break;
            default:
                throw "Unknown Entity type: " + eInfo.type;
        }
        entity.setPosition(eInfo.position);
        var offset = 0.01;
        /*
        if (e === 'rForearm' || e === 'rArm') {
            offset += .065;
        } else if (e === 'rHand') {
            offset += .08;
        } else if (e === 'lForearm' || e === 'lArm') {
            offset += -.065;
        } else if (e === 'lHand') {
            offset += -.08;
        } else if (e === 'rShin') {
            offset += .04;
        } else if (e === 'lShin') {
            offset += .04;
        } else if (e === 'rThigh') {
            offset += -.008;
        } else if (e === 'rFoot' || e === 'lFoot') {
            offset += .2;
        } 
        */
    }
    for (var j in data.joints) {
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
        this.addJoint(joint);
    }

};

Character.prototype.addEntity = function(e) {
    this._entities[e.name] = e;
};

Character.prototype.addJoint = function(j) {
    this._joints[j.name] = j;
};


module.exports = Character;
