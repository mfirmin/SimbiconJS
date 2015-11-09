function Entity(name, opts) {

    this.opts = (opts === undefined) ? {} : opts;

    this.name = name;

    this.position = [0,0,0];
    this.rotation = [0,0,0,0]; // q.v, q.w
    this.mass = (opts.mass === undefined) ? 0 : opts.mass;
    this.color = (opts.color === undefined) ? [130,130,130] : opts.color;

    this.initialize();
}

Entity.prototype.constructor = Entity;

Entity.prototype.initialize = function() {
};

Entity.prototype.setPosition = function(xyz) {
    this.position[0] = xyz[0];
    this.position[1] = xyz[1];
    this.position[2] = xyz[2];
};

Entity.prototype.setRotation = function(q) {
    this.rotation[0] = q[0];
    this.rotation[1] = q[1];
    this.rotation[2] = q[2];
    this.rotation[3] = q[3];

    if (this.name === 'uTorso') {
//        console.log(this.rotation);
    }
};

Entity.prototype.getPosition = function() {
    return this.position;
}
Entity.prototype.getRotation = function() {
    return this.rotation;
}

module.exports = Entity;
