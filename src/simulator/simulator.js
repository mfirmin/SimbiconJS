
function Simulator(opts) {

    this.opts = (opts === undefined) ? {} : opts; 

    this.entities = {};

    this.initialize();
}

Simulator.prototype.constructor = Simulator;

Simulator.prototype.initialize = function() {
    this.collisionConfiguration = new Ammo.btDefaultCollisionConfiguration(); // every single |new| currently leaks...
    this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
    this.overlappingPairCache = new Ammo.btDbvtBroadphase();
    this.solver = new Ammo.btSequentialImpulseConstraintSolver();

    this.dynamicsWorld = new Ammo.btDiscreteDynamicsWorld(this.dispatcher, this.overlappingPairCache, this.solver, this.collisionConfiguration);

    var gravity = (this.opts.gravity === undefined) ? [0, -9.81, 0] : this.opts.gravity;

    this.dynamicsWorld.setGravity(new Ammo.btVector3(gravity[0], gravity[1], gravity[2]));
};

Simulator.prototype.destroy = function() {
    Ammo.destroy(this.collisionConfiguration);
    Ammo.destroy(this.dispatcher);
    Ammo.destroy(this.overlappingPairCache);
    Ammo.destroy(this.solver);
      //Ammo.destroy(dynamicsWorld); // XXX gives an error for some reason, |getBroadphase()->getOverlappingPairCache()->cleanProxyFromPairs(bp,m_dispatcher1);| in btCollisionWorld.cpp throws a 'pure virtual' failure
};

Simulator.prototype.addEntity = function(e) {

    var shape;
    switch (e.getType()) {
        case 'SPHERE':
            shape = new Ammo.btSphereShape(e.getRadius());
            break;
        case 'BOX':
            shape = new Ammo.btBoxShape(new Ammo.btVector3(e.sides[0]/2, e.sides[1]/2, e.sides[2]/2));
            break;
        default:
            throw 'Unknown type';
            
    }

    var startTransform = new Ammo.btTransform();
    startTransform.setIdentity();

    var mass = e.mass;
    var isDynamic = (mass !== 0);

    var localInertia = new Ammo.btVector3(0, 0, 0);

    if (isDynamic)
      shape.calculateLocalInertia(mass,localInertia);

    var pos = e.getPosition();
    startTransform.setOrigin(new Ammo.btVector3(pos[0], pos[1], pos[2]));
  
    var myMotionState = new Ammo.btDefaultMotionState(startTransform);
    var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, shape, localInertia);
    var body = new Ammo.btRigidBody(rbInfo);

    this.dynamicsWorld.addRigidBody(body);

    this.entities[e.name] = {'entity': e, 'body': body};

};

Simulator.prototype.step = function(dt) {
    var trans = new Ammo.btTransform(); // taking this out of the loop below us reduces the leaking

    this.dynamicsWorld.stepSimulation(dt/1000, 10);

    for (var name in this.entities) {
        var e = this.entities[name];
        var body = e.body;
        var entity = e.entity;
        if (body.getMotionState()) {
            body.getMotionState().getWorldTransform(trans);
            var pos = [trans.getOrigin().x().toFixed(2), trans.getOrigin().y().toFixed(2), trans.getOrigin().z().toFixed(2)];

            var rot = trans.getRotation();
            entity.setPosition(pos);
            entity.setRotation([rot.x(), rot.y(), rot.z(), rot.w()]);
        }
    };
};

module.exports = Simulator;

