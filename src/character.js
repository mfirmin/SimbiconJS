var World       = require('./world/world');
var Sphere      = require('./entity/sphere');
var Box         = require('./entity/box');
var Capsule     = require('./entity/capsule');
var Cylinder    = require('./entity/cylinder');
var Hinge       = require('./joint/hinge');
var Ball        = require('./joint/ball');

function Character(name, opts) {

    this.opts = (opts === undefined) ? {} : opts;

    this.name = name;

    this.initialize();
}

Character.prototype.constructor = Character;

Character.prototype.initialize = function() {
    this.entities = {};
    this.joints = {};
};

Character.prototype.setFromJSON = function(data, overlayMesh) {

    this._overlayMesh = overlayMesh;

    for (var e in data.parts) {
        var eInfo = data.parts[e];

        var name = this.name + '.' +  e;

        var entity;
        switch (eInfo.type) {
            case "SPHERE": 
                entity = new Sphere(name, eInfo.radius, { "mass": eInfo.mass });
                break;
            case "CAPSULE": 
                entity = new Capsule(name, (eInfo.radiusTop + eInfo.radiusBottom)/2.0, eInfo.height, {"mass": eInfo.mass});
                break;
            case "BOX":
                entity = new Box(name, eInfo.sides, { "mass": eInfo.mass });
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
        this.addEntity(entity);
    }
    for (var j in data.joints) {
        var jInfo = human.joints[j];

        var name = this.name + '.' + j;

        var joint;
        switch(jInfo.type) {
            case "HINGE":
                joint = new Hinge(name, 
                                  {"A": this.name+'.'+jInfo.A, "B": this.name+'.'+jInfo.B}, 
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
    this.entities[e.name] = e;
};

Character.prototype.addJoint = function(j) {
    this.joints[j.name] = j;
};


module.exports = Character;
