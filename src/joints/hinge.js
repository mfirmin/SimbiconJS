var Joint = require('./joint');

function Hinge(name, entityNames, pos, axis, limits, angle, angularVelocity, torqueLimit) {

    Joint.call(this, name);

    this.A = entityNames.A;
    this.B = entityNames.B;

    this.position = pos;
    this.axis = axis;

    this.angle = (angle === undefined) ? 0 : angle;
    this.angularVelocity = (angularVelocity === undefined) ? 0 : angularVelocity;
    this.angularVelocityPrev = this.angularVelocity;
    this.torque = 0;

    limits = (limits === undefined) ? {} : limits;

    this.lo = limits.lo;
    this.hi = limits.hi;

    this.torqueLimit = (torqueLimit  === undefined) ? 370 : torqueLimit;

}

Hinge.prototype = Object.create(Joint.prototype);

Hinge.prototype.constructor = Hinge;

Hinge.prototype.initialize = function() {
}

Hinge.prototype.getAxis = function() {
    return this.axis;
};

Hinge.prototype.getPosition = function() {
    return this.position;
};

Hinge.prototype.setPosition = function(xyz) {
    this.position[0] = xyz[0];
    this.position[1] = xyz[1];
    this.position[2] = xyz[2];
};

Hinge.prototype.getAngle = function() {
    return this.angle;
};

Hinge.prototype.setAngle = function(ang, dt) {
    var angleLast = this.angle;
    this.angle = ang;
    if (dt !== undefined) {
        this.angularVelocityPrev = this.angularVelocity;
        this.angularVelocity = (this.angle - angleLast)*10000;
    }
};

Hinge.prototype.getAngularVelocity = function() {
//    return (this.angularVelocityPrev + this.angularVelocity)/2.; // average angVel over 2 timesteps.
//    return 0;
    return this.angularVelocity;
};

Hinge.prototype.setAngularVelocity = function(angVel) {
    this.angularVelocity = angVel;
};

Hinge.prototype.resetTorque = function() {
    this.setTorque(0);
};

Hinge.prototype.setTorque = function(t) {
    this.torque = t;
};

Hinge.prototype.addTorque = function(t) {
    this.torque += t;
};

Hinge.prototype.getTorque = function() {
    return this.torque;
};

Hinge.prototype.getLimitedTorque = function() {
    var ret = this.torque;
    if (Math.abs(ret) > this.torqueLimit) { 
        ret = this.torqueLimit * ret/Math.abs(ret); 
        return ret;
    }

    return this.torque;
};

Hinge.prototype.getType = function() {
    return 'HINGE';
};

module.exports = Hinge;
