function Joint(name, opts) {

    this.opts = (opts === undefined) ? {} : opts;

    this.name = name;

    this.position = [0,0,0];

    this.initialize();
}

Joint.prototype.constructor = Joint;

Joint.prototype.initialize = function() {
};

Joint.prototype.setPosition = function(xyz) {
    this.position[0] = xyz[0];
    this.position[1] = xyz[1];
    this.position[2] = xyz[2];
};

Joint.prototype.getPosition = function() {
    return this.position;
}

module.exports = Joint;
