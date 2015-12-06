
var World     = require('./world/world');
var Simulator = require('./simulator/simulator');
var Renderer  = require('./renderer/renderer');

var Character = require('./character');

var entities  = require('./entity/index');
var joints    = require('./joint/index');

var controllers = require('./controller/index');
var utils     = require('./utils/utils');

var lib       = require('./lib/index');


var Pear = { "version": "0.0.0" };

Pear.World = World;
Pear.Renderer = Renderer;
Pear.Simulator = Simulator;

Pear.Character = Character;

Pear.entities = entities;
Pear.joints = joints;

Pear.controllers = controllers;

Pear.utils = utils;

Pear.lib = lib;

module.exports = Pear;
