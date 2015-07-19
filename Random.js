var seedrandom = require('seedrandom');
var SimplexNoise = require('simplex-noise');

var simplex = new SimplexNoise(Math.random);

var Random = {};

Random.seed = function(s) {
  Math.seedrandom(s);
  simplex = new SimplexNoise(Math.random);
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
};

//Using max safe integer as max value unless otherwise specified
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
Random.int = function(min, max) {
  if (arguments.length == 0) {
    min = 0;
    max = Math.pow(2, 53) - 1;
  }
  else if (arguments.length == 1) {
    max = min;
    min = 0;
  }
  return Math.floor(Random.float(min, max));
};

Random.vec2 = function(r) {
  if (typeof r == 'undefined') r = 1;
  var x = 2 * Math.random() - 1;
  var y = 2 * Math.random() - 1;
  var rr = Math.random() * r;
  var len = Math.sqrt(x*x + y*y);
  return [rr * x / len, rr * y / len];
};

Random.vec3 = function(r) {
  if (typeof r == 'undefined') r = 1;
  var x = 2 * Math.random() - 1;
  var y = 2 * Math.random() - 1;
  var z = 2 * Math.random() - 1;
  var rr = Math.random() * r;
  var len = Math.sqrt(x*x + y*y + z*z);
  return [rr * x/len, rr * y/len, rr * z/len];
};

Random.vec2InRect = function(rect) {
  return [rect[0][0] + Math.random() * (rect[1][0] - rect[0][0]), rect[0][1] + Math.random() * (rect[1][1] - rect[0][1])];
};

Random.vec3InAABB = function(bbox) {
  var x = bbox[0][0] + Math.random() * (bbox[1][0] - bbox[0][0]);
  var y = bbox[0][1] + Math.random() * (bbox[1][1] - bbox[0][1]);
  var z = bbox[0][2] + Math.random() * (bbox[1][2] - bbox[0][2]);
  return [x, y, z];
};

Random.chance = function(probability) {
  return Math.random() <= probability;
};

Random.element = function(list) {
  return list[Math.floor(Math.random() * list.length)];
};

Random.noise2 = function(x, y) {
  return simplex.noise2D(x, y);
};

Random.noise3 = function(x, y, z) {
  return simplex.noise3D(x, y, z);
};

Random.noise4 = function(x, y, z, w) {
  return simplex.noise4D(x, y, z, w);
};

module.exports = Random;
