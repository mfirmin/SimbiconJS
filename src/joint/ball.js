var Joint = require('./joint');

function Ball(name, entityNames, pos) {

    Joint.call(this, name);

    this.A = entityNames.A;
    this.B = entityNames.B;

    this.position = pos;

}

Ball.prototype = Object.create(Joint.prototype);

Ball.prototype.constructor = Ball;

Ball.prototype.initialize = function() {
};
Ball.prototype.getPosition = function() {
    return this.position;
};

Ball.prototype.getType = function() {
    return 'BALL';
};

module.exports = Ball;
