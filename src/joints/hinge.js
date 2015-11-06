var Joint = require('./joint');

function Hinge(name, opts) {

    Joint.call(this, name, opts);
}

Hinge.prototype = Object.create(Joint.prototype);

Hinge.prototype.constructor = Hinge;

Hinge.prototype.initialize = function() {
    Joint.prototype.initialize.call(this);
}

Hinge.prototype.getType = function() {
    return 'HINGE';
};

module.exports = Hinge;
