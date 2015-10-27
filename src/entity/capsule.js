
var THREE = require('../lib/three.min.js');
var Entity = require('./entity');

function Capsule(name, radius, height, opts) {

    this.radius = radius;
    this.height = height;
    Entity.call(this, name, opts);
}

Capsule.prototype = Object.create(Entity.prototype);

Capsule.prototype.constructor = Capsule;

Capsule.prototype.initialize = function() {

    Entity.prototype.initialize.call(this);

    var c = (this.opts.color === undefined) ? [130,130,130] : this.opts.color;
    var cstring = 'rgb(' + c[0] + ','+ c[1]  + ',' + c[2]  + ')';
    var color = new THREE.Color(cstring);

    var capsule = new THREE.Object3D();

    var cyl_geo = new THREE.CylinderGeometry(this.radius, this.radius, this.height, 8, 1, true);
    var sph_geo= new THREE.SphereGeometry(this.radius);
    var mat = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: cstring, specular: 0x030303, shininess: 10, shading: THREE.SmoothShading} );

    var cyl_mesh = new THREE.Mesh( cyl_geo , mat );
    var top_mesh = new THREE.Mesh( sph_geo , mat );
    var btm_mesh = new THREE.Mesh( sph_geo , mat );

    top_mesh.position.y = this.height/2.;
    btm_mesh.position.y = -this.height/2.;

    capsule.add(cyl_mesh);
    capsule.add(top_mesh);
    capsule.add(btm_mesh);
    
    this.mesh = capsule;

}

module.exports = Capsule;
