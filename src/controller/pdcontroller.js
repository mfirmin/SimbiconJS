
var KP = 300;
var KD = 30;

function PDController(joint, goal, options) {

    this.goal = goal;
    this.joint = joint;

    options = (options === undefined) ? {} : options; 

    this.kp = (options.kp === undefined) ? KP : options.kp;
    this.kd = (options.kd === undefined) ? KD : options.kd;
    this.goalVelocity = (options.goalVelocity === undefined) ? 0 : optionsgoalVelocity;

}

PDController.prototype.constructor = PDController;

PDController.prototype.evaluate = function() {

    var currentAngle = this.joint.getAngle();
    var currentAngularVelocity = this.joint.getAngularVelocity();

    var ret = this.kp*(this.goal - currentAngle) + this.kd*(0 - currentAngularVelocity);


    return ret;

};



module.exports = PDController;
