
var KP = 300;
var KD = 30;

function PDController(goal, joint, options) {

    this.goal = goal;
    this.joint = joint;

    this.kp = (options.kp === undefined) ? KP : options.kp;
    this.kd = (options.kd === undefined) ? KD : options.kd;
    this.goalVelocity = (options.goalVelocity === undefined) ? 0 : optionsgoalVelocity;

}

PDController.prototype.constructor = PDController;

PDController.prototype.make = function() {

    var scope = this;
    return function() {
        var currentAngle = scope.joint.getAngle();
        var currentAngularVelocity = scope.joint.getAngularVelocity();
        return scope.kp*(scope.goal - currentAngle) + scope.kd*(0 - currentAngularVelocity);
    }

}



module.exports = PDController;
