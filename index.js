import seedrandom from "seedrandom";
import SimplexNoise from "simplex-noise";

let simplex = new SimplexNoise(Math.random);

/**
 * Set the seed for the random number generator
 * @param {string} s Seed value
 */
export function seed(s) {
  seedrandom(s, { global: true });
  simplex = new SimplexNoise(Math.random);
}

/**
 * Get a float between min and max. Defaults to:
 * - `0 <= x < 1` if no argument supplied
 * - `0 <= x < max` if only one argument supplied
 * @param {number} [min]
 * @param {number} [max]
 * @returns {number}
 */
export function float(min, max) {
  if (arguments.length == 0) {
    min = 0;
    max = 1;
  } else if (arguments.length == 1) {
    max = min;
    min = 0;
  }
  return min + (max - min) * Math.random();
}

/**
 * Get an int between min and max. Defaults to:
 * - `0 <= x < Number.MAX_SAFE_INTEGER` if no argument supplied
 * - `0 <= x < max` if only one argument supplied
 * @param {number} [min]
 * @param {number} [max]
 * @returns {number}
 */
export function int(min, max) {
  if (arguments.length == 0) {
    min = 0;
    max = Number.MAX_SAFE_INTEGER;
  } else if (arguments.length == 1) {
    max = min;
    min = 0;
  }
  return Math.floor(float(min, max));
}

/**
 * Get a vec2 included in a radius
 * @param {number} [r=1] radius
 * @returns {import("pex-math").vec2}
 */
export function vec2(r = 1) {
  const x = 2 * Math.random() - 1;
  const y = 2 * Math.random() - 1;
  const rr = Math.random() * r;
  const len = Math.sqrt(x * x + y * y);
  return [(rr * x) / len, (rr * y) / len];
}

/**
 * Get a vec3 included in a radius
 * @param {number} [r=1] radius
 * @returns {import("pex-math").vec3}
 */
export function vec3(r = 1) {
  const x = 2 * Math.random() - 1;
  const y = 2 * Math.random() - 1;
  const z = 2 * Math.random() - 1;
  const rr = Math.random() * r;
  const len = Math.sqrt(x * x + y * y + z * z);
  return [(rr * x) / len, (rr * y) / len, (rr * z) / len];
}

/**
 * Get a vec2 included in a rectangle
 * @param {number} rect rectangle
 * @returns {import("pex-math").vec2}
 */
export function vec2InRect(rect) {
  return [
    rect[0][0] + Math.random() * (rect[1][0] - rect[0][0]),
    rect[0][1] + Math.random() * (rect[1][1] - rect[0][1]),
  ];
}

/**
 * Get a vec3 included in a rectangle bbox
 * @param {number} bbox rectangle bbox
 * @returns {import("pex-math").vec3}
 */
export function vec3InAABB(bbox) {
  return [
    bbox[0][0] + Math.random() * (bbox[1][0] - bbox[0][0]),
    bbox[0][1] + Math.random() * (bbox[1][1] - bbox[0][1]),
    bbox[0][2] + Math.random() * (bbox[1][2] - bbox[0][2]),
  ];
}

/**
 * Returns a chance of an event occuring according to a given probability between 0 and 1.
 * @param {number} probability Float between 0 and 1.
 * @returns {boolean}
 */
export function chance(probability) {
  return Math.random() <= probability;
}

/**
 * Gets a random element from a list
 * @param {Array} list
 * @returns {*}
 */
export function element(list) {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Samples the noise field in 2 dimensions
 * @param {number} x
 * @param {number} y
 * @returns {number} in the interval [-1, 1]
 */
export function noise2(x, y) {
  return simplex.noise2D(x, y);
}

/**
 * Samples the noise field in 3 dimensions
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {number} in the interval [-1, 1]
 */
export function noise3(x, y, z) {
  return simplex.noise3D(x, y, z);
}

/**
 * Samples the noise field in 4 dimensions
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 * @returns {number} in the interval [-1, 1]
 */
export function noise4(x, y, z, w) {
  return simplex.noise4D(x, y, z, w);
}

export default {
  seed,
  float,
  int,
  vec2,
  vec3,
  vec2InRect,
  vec3InAABB,
  chance,
  element,
  noise2,
  noise3,
  noise4,
};
