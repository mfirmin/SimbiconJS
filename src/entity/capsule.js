var Entity = require('./entity');

function Capsule(name, radius, height, opts) {

    this.radius = radius;
    this.height = height;

    Entity.call(this, name, opts);
}

Capsule.prototype = Object.create(Entity.prototype);

Capsule.prototype.constructor = Capsule;

Capsule.prototype.initialize = function() {

    Entity.prototype.initialize.call(this);
}

Capsule.prototype.getRadius = function() {
    return this.radius;
};

Capsule.prototype.setRadius= function(r) {
    this.radius = r;
};

Capsule.prototype.getHeight = function() {
    return this.height;
};

Capsule.prototype.setHeight= function(h) {
    this.height = h;
};

Capsule.prototype.getType = function() {
    return 'CAPSULE';
};

module.exports = Capsule;
