var Joint = require('./joint');

function Hinge(name, entityNames, pos, axis, limits, angle, angularVelocity) {

    Joint.call(this, name);

    this.A = entityNames.A;
    this.B = entityNames.B;

    this.position = pos;
    this.axis = axis;

    this.angle = (angle === undefined) ? 0 : angle;
    this.angularVelocity = (angularVelocity === undefined) ? 0 : angularVelocity;

    limits = (limits === undefined) ? {} : limits;

    this.lo = limits.lo;
    this.hi = limits.hi;

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

Hinge.prototype.getAngle = function() {
    return this.angle;
};

Hinge.prototype.setAngle = function(ang, dt) {
    var angleLast = this.angle;
    this.angle = ang;
    if (dt !== undefined) {
        this.angularVelocity = (this.angle - angleLast)/dt;
    }
};

Hinge.prototype.getAngularVelocity = function() {
    return this.angularVelocity;
};

Hinge.prototype.setAngularVelocity = function(angVel) {
    this.angularVelocity = angVel;
};

Hinge.prototype.getType = function() {
    return 'HINGE';
};

module.exports = Hinge;
