/** @module vec2 */

/**
 * Returns a new vec2 at 0, 0, 0.
 * @returns {import("./types.js").vec2}
 */
function create() {
  return [0, 0];
}

/**
 * Returns a copy of a vector.
 * @param {import("./types.js").vec2} a
 * @returns {import("./types.js").vec2}
 */
function copy(a) {
  return a.slice();
}

/**
 * Sets a vector to another vector.
 * @param {import("./types.js").vec2} a
 * @param {import("./types.js").vec2} b
 * @returns {import("./types.js").vec2}
 */
function set(a, b) {
  a[0] = b[0];
  a[1] = b[1];
  return a;
}

/**
 * Compares two vectors.
 * @param {import("./types.js").vec2} a
 * @param {import("./types.js").vec2} b
 * @returns {boolean}
 */
function equals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

/**
 * Add a vector to another.
 * @param {import("./types.js").vec2} a
 * @param {import("./types.js").vec2} b
 * @returns {import("./types.js").vec2}
 */
function add(a, b) {
  a[0] += b[0];
  a[1] += b[1];
  return a;
}

/**
 * Subtracts a vector from another.
 * @param {import("./types.js").vec2} a
 * @param {import("./types.js").vec2} b
 * @returns {import("./types.js").vec2}
 */
function sub(a, b) {
  a[0] -= b[0];
  a[1] -= b[1];
  return a;
}

/**
 * Scales a vector by a number.
 * @param {import("./types.js").vec2} a
 * @param {number} s
 * @returns {import("./types.js").vec2}
 */
function scale(a, s) {
  a[0] *= s;
  a[1] *= s;
  return a;
}

/**
 * Adds two vectors after scaling the second one.
 * @param {import("./types.js").vec2} a
 * @param {import("./types.js").vec2} b
 * @param {number} s
 * @returns {import("./types.js").vec2}
 */
function addScaled(a, b, s) {
  a[0] += b[0] * s;
  a[1] += b[1] * s;
  return a;
}

/**
 * Calculates the dot product of two vectors.
 * @param {import("./types.js").vec2} a
 * @param {import("./types.js").vec2} b
 * @returns {number}
 */
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

/**
 * Calculates the length of a vector.
 * @param {import("./types.js").vec2} a
 * @returns {number}
 */
function length(a) {
  const x = a[0];
  const y = a[1];
  return Math.sqrt(x * x + y * y);
}

/**
 * Calculates the squared length of a vector.
 * @param {import("./types.js").vec2} a
 * @returns {number}
 */
function lengthSq(a) {
  const x = a[0];
  const y = a[1];
  return x * x + y * y;
}

/**
 * Normalises a vector.
 * @param {import("./types.js").vec2} a
 * @returns {import("./types.js").vec2}
 */
function normalize(a) {
  const x = a[0];
  const y = a[1];
  let l = Math.sqrt(x * x + y * y);
  l = 1 / (l || 1);
  a[0] *= l;
  a[1] *= l;
  return a;
}

/**
 * Calculates the distance between two vectors.
 * @param {import("./types.js").vec2} a
 * @param {import("./types.js").vec2} b
 * @returns {number}
 */
function distance(a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculates the squared distance between two vectors.
 * @param {import("./types.js").vec2} a
 * @param {import("./types.js").vec2} b
 * @returns {number}
 */
function distanceSq(a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  return dx * dx + dy * dy;
}

/**
 * Limits a vector to a length.
 * @param {import("./types.js").vec2} a
 * @param {number} len
 * @returns {import("./types.js").vec2}
 */
function limit(a, len) {
  const x = a[0];
  const y = a[1];
  const dsq = x * x + y * y;
  const lsq = len * len;
  if (lsq > 0 && dsq > lsq) {
    const nd = len / Math.sqrt(dsq);
    a[0] *= nd;
    a[1] *= nd;
  }
  return a;
}

/**
 * Linearly interpolates between two vectors.
 * @param {import("./types.js").vec2} a
 * @param {import("./types.js").vec2} b
 * @param {number} t
 * @returns {import("./types.js").vec2}
 */
function lerp(a, b, t) {
  const x = a[0];
  const y = a[1];
  a[0] = x + (b[0] - x) * t;
  a[1] = y + (b[1] - y) * t;
  return a;
}

/**
 * Prints a vector to a string.
 * @param {import("./types.js").vec2} a
 * @param {number} [precision=4]
 * @returns {string}
 */
function toString(a, precision = 4) {
  const scale = 10 ** precision;
  // prettier-ignore
  return `[${Math.floor(a[0] * scale) / scale}, ${Math.floor(a[1] * scale) / scale}]`;
}

var vec2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create,
  copy: copy,
  set: set,
  equals: equals,
  add: add,
  sub: sub,
  scale: scale,
  addScaled: addScaled,
  dot: dot,
  length: length,
  lengthSq: lengthSq,
  normalize: normalize,
  distance: distance,
  distanceSq: distanceSq,
  limit: limit,
  lerp: lerp,
  toString: toString
});

/** @module vec3 */

/**
 * Returns a new vec3 at 0, 0, 0.
 * @returns {import("./types.js").vec3}
 */
function create$1() {
  return [0, 0, 0];
}

/**
 * Returns a copy of a vector.
 * @param {import("./types.js").vec3} a
 * @returns {import("./types.js").vec3}
 */
function copy$1(a) {
  return a.slice();
}

/**
 * Sets a vector to another vector.
 * @param {import("./types.js").vec3} a
 * @param {import("./types.js").vec3} b
 * @returns {import("./types.js").vec3}
 */
function set$1(a, b) {
  a[0] = b[0];
  a[1] = b[1];
  a[2] = b[2];
  return a;
}

/**
 * Compares two vectors.
 * @param {import("./types.js").vec3} a
 * @param {import("./types.js").vec3} b
 * @returns {boolean}
 */
function equals$1(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

/**
 * Adds a vector to another.
 * @param {import("./types.js").vec3} a
 * @param {import("./types.js").vec3} b
 * @returns {import("./types.js").vec3}
 */
function add$1(a, b) {
  a[0] += b[0];
  a[1] += b[1];
  a[2] += b[2];
  return a;
}

/**
 * Subtracts a vector from another.
 * @param {import("./types.js").vec3} a
 * @param {import("./types.js").vec3} b
 * @returns {import("./types.js").vec3}
 */
function sub$1(a, b) {
  a[0] -= b[0];
  a[1] -= b[1];
  a[2] -= b[2];
  return a;
}

/**
 * Scales a vector by a number.
 * @param {import("./types.js").vec3} a
 * @param {number} s
 * @returns {import("./types.js").vec3}
 */
function scale$1(a, s) {
  a[0] *= s;
  a[1] *= s;
  a[2] *= s;
  return a;
}

/**
 * Adds two vectors after scaling the second one.
 * @param {import("./types.js").vec3} a
 * @param {import("./types.js").vec3} b
 * @param {number} s
 * @returns {import("./types.js").vec3}
 */
function addScaled$1(a, b, s) {
  a[0] += b[0] * s;
  a[1] += b[1] * s;
  a[2] += b[2] * s;
  return a;
}

/**
 * Multiplies a vector by a matrix.
 * @param {import("./types.js").vec3} a
 * @param {import("./types.js").mat4} m
 * @returns {import("./types.js").vec3}
 */
function multMat4(a, m) {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  a[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
  a[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
  a[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
  return a;
}

/**
 * Multiplies a vector by a quaternion.
 * @param {import("./types.js").vec3} a
 * @param {import("./types.js").quat} q
 * @returns {import("./types.js").vec3}
 */
function multQuat(a, q) {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  const qx = q[0];
  const qy = q[1];
  const qz = q[2];
  const qw = q[3];
  const ix = qw * x + qy * z - qz * y;
  const iy = qw * y + qz * x - qx * z;
  const iz = qw * z + qx * y - qy * x;
  const iw = -qx * x - qy * y - qz * z;
  a[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  a[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  a[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  return a;
}

/**
 * Calculates the dot product of two vectors.
 * @param {import("./types.js").vec3} a
 * @param {import("./types.js").vec3} b
 * @returns {number}
 */
function dot$1(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Calculates the cross product of two vectors.
 * @param {import("./types.js").vec3} a
 * @param {import("./types.js").vec3} b
 * @returns {import("./types.js").vec3}
 */
function cross(a, b) {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  const vx = b[0];
  const vy = b[1];
  const vz = b[2];
  a[0] = y * vz - vy * z;
  a[1] = z * vx - vz * x;
  a[2] = x * vy - vx * y;
  return a;
}

/**
 * Calculates the length of a vector.
 * @param {import("./types.js").vec3} a
 * @returns {number}
 */
function length$1(a) {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Calculates the squared length of a vector.
 * @param {import("./types.js").vec3} a
 * @returns {number}
 */
function lengthSq$1(a) {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  return x * x + y * y + z * z;
}

/**
 * Normalises a vector.
 * @param {import("./types.js").vec3} a
 * @returns {import("./types.js").vec3}
 */
function normalize$1(a) {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  let l = Math.sqrt(x * x + y * y + z * z);
  l = 1 / (l || 1);
  a[0] *= l;
  a[1] *= l;
  a[2] *= l;
  return a;
}

/**
 * Calculates the distance between two vectors.
 * @param {import("./types.js").vec3} a
 * @param {import("./types.js").vec3} b
 * @returns {number}
 */
function distance$1(a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Calculates the squared distance between two vectors.
 * @param {import("./types.js").vec3} a
 * @param {import("./types.js").vec3} b
 * @returns {number}
 */
function distanceSq$1(a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2];
  return dx * dx + dy * dy + dz * dz;
}

/**
 * Limits a vector to a length.
 * @param {import("./types.js").vec3} a
 * @param {number} len
 * @returns {import("./types.js").vec3}
 */
function limit$1(a, len) {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  const dsq = x * x + y * y + z * z;
  const lsq = len * len;
  if (lsq > 0 && dsq > lsq) {
    const nd = len / Math.sqrt(dsq);
    a[0] *= nd;
    a[1] *= nd;
    a[2] *= nd;
  }
  return a;
}

/**
 * Linearly interpolates between two vectors.
 * @param {import("./types.js").vec3} a
 * @param {import("./types.js").vec3} b
 * @param {number} t
 * @returns {import("./types.js").vec3}
 */
function lerp$1(a, b, t) {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  a[0] = x + (b[0] - x) * t;
  a[1] = y + (b[1] - y) * t;
  a[2] = z + (b[2] - z) * t;
  return a;
}

/**
 * Prints a vector to a string.
 * @param {import("./types.js").vec3} a
 * @param {number} [precision=4]
 * @returns {string}
 */
function toString$1(a, precision = 4) {
  const scale = 10 ** precision;
  // prettier-ignore
  return `[${Math.floor(a[0] * scale) / scale}, ${Math.floor(a[1] * scale) / scale}, ${Math.floor(a[2] * scale) / scale}]`;
}

var vec3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create$1,
  copy: copy$1,
  set: set$1,
  equals: equals$1,
  add: add$1,
  sub: sub$1,
  scale: scale$1,
  addScaled: addScaled$1,
  multMat4: multMat4,
  multQuat: multQuat,
  dot: dot$1,
  cross: cross,
  length: length$1,
  lengthSq: lengthSq$1,
  normalize: normalize$1,
  distance: distance$1,
  distanceSq: distanceSq$1,
  limit: limit$1,
  lerp: lerp$1,
  toString: toString$1
});

/** @module avec3 */

/**
 * Sets a vector components.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
function set3(a, i, x, y, z) {
  a[i * 3 + 0] = x;
  a[i * 3 + 1] = y;
  a[i * 3 + 2] = z;
}

/**
 * Sets a vector to another vector.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @param {import("./types.js").avec3} b
 * @param {number} j
 */
function set$2(a, i, b, j) {
  a[i * 3] = b[j * 3];
  a[i * 3 + 1] = b[j * 3 + 1];
  a[i * 3 + 2] = b[j * 3 + 2];
}

/**
 * Compares two vectors.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @param {import("./types.js").avec3} b
 * @param {number} j
 * @returns {boolean}
 */
function equals$2(a, i, b, j) {
  return a[i * 3] === b[j * 3] && a[i * 3 + 1] === b[j * 3 + 1] && a[i * 3 + 2] === b[j * 3 + 2];
}

/**
 * Adds a vector to another.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @param {import("./types.js").avec3} b
 * @param {number} j
 */
function add$2(a, i, b, j) {
  a[i * 3] += b[j * 3];
  a[i * 3 + 1] += b[j * 3 + 1];
  a[i * 3 + 2] += b[j * 3 + 2];
}

/**
 * Subtracts a vector from another.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @param {import("./types.js").avec3} b
 * @param {number} j
 */
function sub$2(a, i, b, j) {
  a[i * 3] -= b[j * 3];
  a[i * 3 + 1] -= b[j * 3 + 1];
  a[i * 3 + 2] -= b[j * 3 + 2];
}

/**
 * Scales a vector by a number.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @param {number} s
 */
function scale$2(a, i, s) {
  a[i * 3] *= s;
  a[i * 3 + 1] *= s;
  a[i * 3 + 2] *= s;
}

/**
 * Adds two vectors after scaling the second one.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @param {import("./types.js").avec3} b
 * @param {number} j
 * @param {number} s
 */
function addScaled$2(a, i, b, j, s) {
  a[i * 3] += b[j * 3] * s;
  a[i * 3 + 1] += b[j * 3 + 1] * s;
  a[i * 3 + 2] += b[j * 3 + 2] * s;
}

/**
 * Calculates the dot product of two vectors.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @param {import("./types.js").avec3} b
 * @param {number} j
 */
function dot$2(a, i, b, j) {
  return a[i * 3] * b[j * 3] + a[i * 3 + 1] * b[j * 3 + 1] + a[i * 3 + 2] * b[j * 3 + 2];
}

/**
 * Calculates the cross product of two vectors.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @param {import("./types.js").avec3} b
 * @param {number} j
 */
function cross$1(a, i, b, j) {
  const x = a[i * 3];
  const y = a[i * 3 + 1];
  const z = a[i * 3 + 2];
  const vx = b[j * 3];
  const vy = b[j * 3 + 1];
  const vz = b[j * 3 + 2];
  a[i * 3] = y * vz - vy * z;
  a[i * 3 + 1] = z * vx - vz * x;
  a[i * 3 + 2] = x * vy - vx * y;
}

/**
 * Calculates the length of a vector.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @returns {number}
 */
function length$2(a, i) {
  const x = a[i * 3];
  const y = a[i * 3 + 1];
  const z = a[i * 3 + 2];
  return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Calculates the squared length of a vector.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @returns {number}
 */
function lengthSq$2(a, i) {
  const x = a[i * 3];
  const y = a[i * 3 + 1];
  const z = a[i * 3 + 2];
  return x * x + y * y + z * z;
}

/**
 * Normalises a vector.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 */
function normalize$2(a, i) {
  const lenSq = a[i * 3] * a[i * 3] + a[i * 3 + 1] * a[i * 3 + 1] + a[i * 3 + 2] * a[i * 3 + 2];
  if (lenSq > 0) {
    const len = Math.sqrt(lenSq);
    a[i * 3] /= len;
    a[i * 3 + 1] /= len;
    a[i * 3 + 2] /= len;
  }
}

/**
 * Calculates the distance between two vectors.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @param {import("./types.js").avec3} b
 * @param {number} j
 * @returns {number}
 */
function distance$2(a, i, b, j) {
  const dx = b[j * 3] - a[i * 3];
  const dy = b[j * 3 + 1] - a[i * 3 + 1];
  const dz = b[j * 3 + 2] - a[i * 3 + 2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Calculates the squared distance between two vectors.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @param {import("./types.js").avec3} b
 * @param {number} j
 * @returns {number}
 */
function distanceSq$2(a, i, b, j) {
  const dx = b[j * 3] - a[i * 3];
  const dy = b[j * 3 + 1] - a[i * 3 + 1];
  const dz = b[j * 3 + 2] - a[i * 3 + 2];
  return dx * dx + dy * dy + dz * dz;
}

/**
 * Limits a vector to a length.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @param {number} len
 */
function limit$2(a, i, len) {
  const x = a[i * 3];
  const y = a[i * 3 + 1];
  const z = a[i * 3 + 2];
  const dsq = x * x + y * y + z * z;
  const lsq = len * len;
  if (lsq > 0 && dsq > lsq) {
    const nd = len / Math.sqrt(dsq);
    a[i * 3] *= nd;
    a[i * 3 + 1] *= nd;
    a[i * 3 + 2] *= nd;
  }
}

/**
 * Linearly interpolates between two vectors.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @param {import("./types.js").avec3} b
 * @param {number} j
 * @param {number} t
 */
function lerp$2(a, i, b, j, t) {
  const x = a[i * 3];
  const y = a[i * 3 + 1];
  const z = a[i * 3 + 2];
  a[i * 3] = x + (b[j * 3] - x) * t;
  a[i * 3 + 1] = y + (b[j * 3 + 1] - y) * t;
  a[i * 3 + 2] = z + (b[j * 3 + 2] - z) * t;
}

/**
 * Prints a vector to a string.
 * @param {import("./types.js").avec3} a
 * @param {number} i
 * @param {number} [precision=4]
 * @returns {string}
 */
function toString$2(a, i, precision = 4) {
  const scale = 10 ** precision;
  // prettier-ignore
  return `[${Math.floor(a[i * 3] * scale) / scale}, ${Math.floor(a[i * 3 + 1] * scale) / scale}, ${Math.floor(a[i * 3 + 2] * scale) / scale}]`;
}

var avec3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  set3: set3,
  set: set$2,
  equals: equals$2,
  add: add$2,
  sub: sub$2,
  scale: scale$2,
  addScaled: addScaled$2,
  dot: dot$2,
  cross: cross$1,
  length: length$2,
  lengthSq: lengthSq$2,
  normalize: normalize$2,
  distance: distance$2,
  distanceSq: distanceSq$2,
  limit: limit$2,
  lerp: lerp$2,
  toString: toString$2
});

export { set$1 as a, sub$1 as b, create$1 as c, dot$1 as d, add$1 as e, scale$1 as f, cross as g, toString as h, vec3 as i, avec3 as j, length$1 as l, normalize$1 as n, set3 as s, toString$1 as t, vec2 as v };
