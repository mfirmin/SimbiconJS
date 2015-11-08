var Joint = require('./joint');

function Hinge(name, entityNames, pos, axis, limits) {

    Joint.call(this, name);

    this.A = entityNames.A;
    this.B = entityNames.B;

    this.position = pos;
    this.axis = axis;

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

Hinge.prototype.getType = function() {
    return 'HINGE';
};

module.exports = Hinge;
