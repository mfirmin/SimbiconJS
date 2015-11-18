
var KP = 300;
var KD = 30;

function VPDController(joint, part, goal, options) {

    this.joint = joint;
    this.part = part;
    this.goal = goal;

    options = (options === undefined) ? {} : options; 

    this.kp = (options.kp === undefined) ? KP : options.kp;
    this.kd = (options.kd === undefined) ? KD : options.kd;
    this.goalVelocity = (options.goalVelocity === undefined) ? 0 : optionsgoalVelocity;

}

VPDController.prototype.constructor = VPDController;

VPDController.prototype.evaluate = function() {

    var currentAngle = Math.acos(this.part.getRotation()[3])*2;
    var currentAngularVelocity = this.part.getAngularVelocity();

    var goal = -this.goal;

    var ret = this.kp*(goal - currentAngle) + this.kd*(0 - currentAngularVelocity);

    if (this.part.name === 'uTorso') {
        console.log('---');
        console.log(currentAngle);
        console.log(currentAngularVelocity);
        console.log(ret);
    }

    return ret;
};



module.exports = VPDController;
