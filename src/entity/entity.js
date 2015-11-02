function Entity(name, opts) {

    this.opts = (opts === undefined) ? {} : opts;

    this.name = name;

    this.position = [0,0,0];
    this.rotation = [0,0,0,0];
    this.mass = (opts.mass === undefined) ? 0 : opts.mass;

    this.initialize();
}

Entity.prototype.constructor = Entity;

Entity.prototype.initialize = function() {
}

Entity.prototype.setMfromQandP = function(q_in,p) {

    /*
    var quat = new THREE.Quaternion();
    quat.x = q_in[1]//q_in[1];
    quat.y = q_in[2] //q_in[0];
    quat.z = q_in[3]// q_in[0];
    quat.w = q_in[0];

    quat.multiply(this.default_rotation);

    var q = {w: quat.w, v: {x: quat.x, y: quat.y, z: quat.z}};
    var pos = {x: p[0], y: p[1], z: p[2]};

    var R = new Float32Array(9);
    var M = new Float32Array(16);
    R[0] = 1 - 2*q.v.y*q.v.y - 2*q.v.z*q.v.z; R[3] = 2*q.v.x*q.v.y - 2*q.v.z*q.w;     R[6] = 2*q.v.x*q.v.z + 2*q.v.y*q.w;
    R[1] = 2*q.v.x*q.v.y + 2*q.v.z*q.w;     R[4] = 1 - 2*q.v.x*q.v.x - 2*q.v.z*q.v.z; R[7] = 2*q.v.y*q.v.z - 2*q.v.x*q.w;
    R[2] = 2*q.v.x*q.v.z - 2*q.v.y*q.w;     R[5] = 2*q.v.y*q.v.z + 2*q.v.x*q.w;     R[8] = 1 - 2*q.v.x*q.v.x - 2*q.v.y*q.v.y;

    this.mesh.matrix.elements[0] = R[0]; this.mesh.matrix.elements[4] = R[3]; this.mesh.matrix.elements[8] =  R[6];  this.mesh.matrix.elements[12] = pos.x;
    this.mesh.matrix.elements[1] = R[1]; this.mesh.matrix.elements[5] = R[4]; this.mesh.matrix.elements[9] =  R[7];  this.mesh.matrix.elements[13] = pos.y;
    this.mesh.matrix.elements[2] = R[2]; this.mesh.matrix.elements[6] = R[5]; this.mesh.matrix.elements[10] = R[8];  this.mesh.matrix.elements[14] = pos.z;
    this.mesh.matrix.elements[3] = 0;    this.mesh.matrix.elements[7] = 0;    this.mesh.matrix.elements[11] = 0;     this.mesh.matrix.elements[15] = 1;
    */


}

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
};

Entity.prototype.getPosition = function() {
    return this.position;
}
Entity.prototype.getRotation = function() {
    return this.rotation;
}

module.exports = Entity;
