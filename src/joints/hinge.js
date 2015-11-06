var Joint = require('./joint');

function Hinge(name, entityNames, pos, axis) {

    Joint.call(this, name);

    this.A = entityNames.A;
    this.B = entityNames.B;

    this.position = pos;
    this.axis = axis;

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
