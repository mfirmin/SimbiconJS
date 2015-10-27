
var THREE = require('../lib/three.min.js');
var Entity = require('./entity');

function Cylinder(name, radius, height, opts) {

    this.radius = radius;
    this.height = height;
    Entity.call(this, name, opts);
}

Cylinder.prototype = Object.create(Entity.prototype);

Cylinder.prototype.constructor = Cylinder;

Cylinder.prototype.initialize = function() {

    Entity.prototype.initialize.call(this);

    var c = (this.opts.color === undefined) ? [130,130,130] : this.opts.color;
    var cstring = 'rgb(' + c[0] + ','+ c[1]  + ',' + c[2]  + ')';
    var color = new THREE.Color(cstring);

    var geo = new THREE.CylinderGeometry(this.radius, this.radius, this.height);

    var mat = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: cstring, specular: 0x030303, shininess: 10, shading: THREE.SmoothShading} );
    var mesh = new THREE.Mesh( geo , mat );

    this.mesh = mesh;

}

module.exports = Cylinder;
