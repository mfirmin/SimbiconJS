
var Entity = require('./entity');

function Cylinder(name, radius, height, opts) {

    this.radius = radius;
    this.height = height;

    Entity.call(this, name, opts);
}

Cylinder.prototype = Object.create(Entity.prototype);

Cylinder.prototype.constructor = Cylinder;

Cylinder.prototype.initialize = function() {

    Entity.prototype.initialize.call(this);
}

Cylinder.prototype.getRadius = function() {
    return this.radius;
};

Cylinder.prototype.setRadius= function(r) {
    this.radius = r;
};

Cylinder.prototype.getHeight = function() {
    return this.height;
};

Cylinder.prototype.setHeight= function(h) {
    this.height = h;
};

Cylinder.prototype.getType = function() {
    return 'CYLINDER';
};

module.exports = Cylinder;
