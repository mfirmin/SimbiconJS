
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

Simulator.prototype.addStaticEntity = function(e) {

    var groundShape = new Ammo.btBoxShape(new Ammo.btVector3(50, 50, 50));

    var groundTransform = new Ammo.btTransform();
    groundTransform.setIdentity();
    groundTransform.setOrigin(new Ammo.btVector3(0, -50, 0));

    var localInertia = new Ammo.btVector3(0, 0, 0);

    var myMotionState = new Ammo.btDefaultMotionState(groundTransform);
    var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, groundShape, localInertia);
    var body = new Ammo.btRigidBody(rbInfo);

    this.dynamicsWorld.addRigidBody(body);

};

Simulator.prototype.addDynamicEntity = function(e) {
    var colShape = new Ammo.btSphereShape(1);

    var startTransform = new Ammo.btTransform();
    startTransform.setIdentity();

    var mass = e.mass;
    var isDynamic = (mass != 0);

    var localInertia = new Ammo.btVector3(0, 0, 0);
    if (isDynamic)
      colShape.calculateLocalInertia(mass,localInertia);

    startTransform.setOrigin(new Ammo.btVector3(0, 11, 0));
  
    var myMotionState = new Ammo.btDefaultMotionState(startTransform);
    var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, colShape, localInertia);
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
            entity.setPosition(pos);
        }
    };
};

module.exports = Simulator;

