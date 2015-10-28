

var $     = require('jquery');
var World = require('./world/world');
//var Box   = require('./entity/box');
var Sphere= require('./entity/sphere');

var worlds = {};


$(document).ready(function() {

    var glWorld = new World('world1');
    var e = new Sphere('s1', 10);

    e.setPosition([0,100,0]);

    glWorld.addEntity(e);

    glWorld.go();

// Adapted from HelloWorld.cpp, Copyright (c) 2003-2007 Erwin Coumans  http://continuousphysics.com/Bullet/
    function main() {
      var collisionConfiguration = new Ammo.btDefaultCollisionConfiguration(); // every single |new| currently leaks...
      var dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
      var overlappingPairCache = new Ammo.btDbvtBroadphase();
      var solver = new Ammo.btSequentialImpulseConstraintSolver();

      var dynamicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
      dynamicsWorld.setGravity(new Ammo.btVector3(0, -9.81, 0));

      var groundShape = new Ammo.btBoxShape(new Ammo.btVector3(50, 50, 50));

      var bodies = [];

      var groundTransform = new Ammo.btTransform();
      groundTransform.setIdentity();
      groundTransform.setOrigin(new Ammo.btVector3(0, -50, 0));

      (function() {
        var mass = 0;
        var isDynamic = mass !== 0;
        var localInertia = new Ammo.btVector3(0, 0, 0);

        if (isDynamic)
          groundShape.calculateLocalInertia(mass, localInertia);

        var myMotionState = new Ammo.btDefaultMotionState(groundTransform);
        var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, groundShape, localInertia);
        var body = new Ammo.btRigidBody(rbInfo);

        dynamicsWorld.addRigidBody(body);
      })();

      (function() {
        var colShape = new Ammo.btSphereShape(1);

        var startTransform = new Ammo.btTransform();
        startTransform.setIdentity();

        var mass = 100;
        var isDynamic = (mass != 0);

        var localInertia = new Ammo.btVector3(0, 0, 0);
        if (isDynamic)
          colShape.calculateLocalInertia(mass,localInertia);

        startTransform.setOrigin(new Ammo.btVector3(0, 100, 0));
      
        var myMotionState = new Ammo.btDefaultMotionState(startTransform);
        var rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, myMotionState, colShape, localInertia);
        var body = new Ammo.btRigidBody(rbInfo);

        dynamicsWorld.addRigidBody(body);
        bodies.push(body);
      })();

      var trans = new Ammo.btTransform(); // taking this out of the loop below us reduces the leaking

      var finish = function() {
          Ammo.destroy(collisionConfiguration);
          Ammo.destroy(dispatcher);
          Ammo.destroy(overlappingPairCache);
          Ammo.destroy(solver);
          //Ammo.destroy(dynamicsWorld); // XXX gives an error for some reason, |getBroadphase()->getOverlappingPairCache()->cleanProxyFromPairs(bp,m_dispatcher1);| in btCollisionWorld.cpp throws a 'pure virtual' failure

          console.log('ok.')
      }

      var t = 0;
      var timestep = function() {
        dynamicsWorld.stepSimulation(1/60, 0);
        
        bodies.forEach(function(body) {
          if (body.getMotionState()) {
            body.getMotionState().getWorldTransform(trans);

            e.setPosition([trans.getOrigin().x().toFixed(2), trans.getOrigin().y().toFixed(2), trans.getOrigin().z().toFixed(2)]);

          }
        });
        if (++t < 1000) { setTimeout(timestep, 1000/60); }
        else { finish(); }
      };

      setTimeout(timestep, 1000/60);

      // Delete objects we created through |new|. We just do a few of them here, but you should do them all if you are not shutting down ammo.js
    }

    main();

});

