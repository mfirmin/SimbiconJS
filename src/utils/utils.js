

var utils = {};

// Q = [q.x, q.y, q.z, q.w]
utils.RFromQuaternion = function(q) {

    var qx = q[0];
    var qy = q[1];
    var qz = q[2];
    var qw = q[3];

    return [ 1 - 2*qy*qy - 2*qz*qz, 2*qx*qy - 2*qz*qw,     2*qx*qz + 2*qy*qw,
             2*qx*qy + 2*qz*qw,     1 - 2*qx*qx - 2*qz*qz, 2*qy*qz - 2*qx*qw,
             2*qx*qz - 2*qy*qw,     2*qy*qz + 2*qx*qw,     1 - 2*qx*qx - 2*qy*qy ]

};

// v = [x, y, z]
// R = flat Rotation matrix
utils.rotateVector = function(v, R) {
    if (R.length === 9) {
        return [R[0]*v[0] + R[1]*v[1] + R[2]*v[2],
                R[3]*v[0] + R[4]*v[1] + R[5]*v[2],
                R[6]*v[0] + R[7]*v[1] + R[8]*v[2]];
    } else if (R.length === 16) {
        return [R[0]*v[0] + R[1]*v[1] + R[2]*v[2],
                R[4]*v[0] + R[5]*v[1] + R[6]*v[2],
                R[8]*v[0] + R[9]*v[1] + R[10]*v[2]];
    } else {
        throw 'Cannot have rotation matrix with length ' + R.length;
    }
};

module.exports = utils;
