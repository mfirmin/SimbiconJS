
var THREE = require('../lib/three.min.js');
var Entity = require('./entity');

function Plane(name, A, B, opts) {

    this.A = A;
    this.B = B;
    Entity.call(this, name, opts);
}


Plane.prototype = Object.create(Entity.prototype);

Plane.prototype.constructor = Plane;

Plane.prototype.initialize = function() {

    Entity.prototype.initialize.call(this);

    var c = (this.opts.color === undefined) ? [130,130,130] : this.opts.color;
    var cstring = 'rgb(' + c[0] + ','+ c[1]  + ',' + c[2]  + ')';
    var color = new THREE.Color(cstring);

    var geo = new THREE.Geometry();
    var mat = new THREE.LineBasicMaterial( {color: color} );

    geo.vertices.push(
        new THREE.Vector3(this.A[0], this.A[1], this.A[2]),
        new THREE.Vector3(this.B[0], this.B[1], this.B[2])
    );
    var mesh = new THREE.Line( geo , mat );

    this.mesh = mesh;

}

module.exports = Plane;
