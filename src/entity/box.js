var Entity = require('./entity');

function Box(name, sides, opts) {

    this.sides = sides;
    Entity.call(this, name, opts);
}


Box.prototype = Object.create(Entity.prototype);

Box.prototype.constructor = Box;

Box.prototype.initialize = function() {
    Entity.prototype.initialize.call(this);
}

Box.prototype.getSides = function() {
    return this.sides;
};

Box.prototype.setSides= function(s) {
    this.sides = s;
};

Box.prototype.getType = function() {
    return 'BOX';
};

module.exports = Box;
