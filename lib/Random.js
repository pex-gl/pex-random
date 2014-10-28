var seedrandom = require('seedrandom');
var geom = require('pex-geom');
var Vec2 = geom.Vec2;
var Vec3 = geom.Vec3;

var Random = {};

Random.seed = function(s) {
  Math.seedrandom(s);
};

Random.float = function(min, max) {
  if (arguments.length == 0) {
    min = 0;
    max = 1;
  }
  else if (arguments.length == 1) {
    max = min;
    min = 0;
  }
  return min + (max - min) * Math.random();
}

Random.int = function(min, max) {
  return Math.floor(Random.randomFloat(min, max));
};

Random.vec2 = function(r) {
  if (typeof r == 'undefined') r = 1;
  var x = 2 * Math.random() - 1;
  var y = 2 * Math.random() - 1;
  return Vec2.create(r * x, r * y);
};

Random.vec3 = function(r) {
  if (typeof r == 'undefined') r = 1;
  var x = 2 * Math.random() - 1;
  var y = 2 * Math.random() - 1;
  var z = 2 * Math.random() - 1;
  return Vec3.create(r * x, r * y, r * z);
};

Random.vec3InBoundingBox = function(bbox) {
  var x = bbox.min.x + Math.random() * (bbox.max.x - bbox.min.x);
  var y = bbox.min.y + Math.random() * (bbox.max.y - bbox.min.y);
  var z = bbox.min.z + Math.random() * (bbox.max.z - bbox.min.z);
  return Vec3.create(x, y, z);
};

Random.vec2InRect = function(rect) {
  return Vec2.create(rect.x + Math.random() * rect.width, rect.y + Math.random() * rect.height);
};

Random.chance = function(probability) {
  return Math.random() <= probability;
};

Random.element = function(list) {
  return list[Math.floor(Math.random() * list.length)];
};

module.exports = Random;