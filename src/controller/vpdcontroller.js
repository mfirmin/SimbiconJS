
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

    this.lastAngle;

}

VPDController.prototype.constructor = VPDController;

VPDController.prototype.evaluate = function() {

//    var currentAngle = Math.acos(this.part.getRotation()[3])*2;
    var rot = this.part.getRotation();
    var currentAngle = Math.atan2(2*(rot[3]*rot[2] + rot[0]*rot[1]), 1 - 2*(rot[1]*rot[1]+rot[2]*rot[2]));

    if (this.lastAngle === undefined) {
       this.lastAngle = currentAngle; 
    } 

    var currentAngularVelocity = (currentAngle - this.lastAngle)*10000;

    var goal = -this.goal;

    var ret = this.kp*(goal - currentAngle) + this.kd*(0 - currentAngularVelocity);

    this.lastAngle = currentAngle;

    return ret;
};



module.exports = VPDController;
