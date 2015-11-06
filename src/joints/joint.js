function Joint(name, opts) {

    this.opts = (opts === undefined) ? {} : opts;

    this.name = name;

    this.initialize();
}

Joint.prototype.constructor = Joint;

Joint.prototype.initialize = function() {
};

module.exports = Joint;
