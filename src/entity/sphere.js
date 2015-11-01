var Entity = require('./entity');

function Sphere(name, radius, opts) {

    this.radius = radius;
    Entity.call(this, name, opts);

}

Sphere.prototype = Object.create(Entity.prototype);

Sphere.prototype.constructor = Sphere;

Sphere.prototype.initialize = function() {
    Entity.prototype.initialize.call(this);
};

Sphere.prototype.getRadius = function() {
    return this.radius;
};

Sphere.prototype.setRadius = function(r) {
    this.radius = r;
};

Sphere.prototype.getType = function() {
    return 'SPHERE';
};

module.exports = Sphere;
