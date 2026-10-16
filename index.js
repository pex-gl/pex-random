import seedrandom from "seedrandom";
import { createNoise2D, createNoise3D, createNoise4D } from "simplex-noise";

// Larger than simplex-noise 3D/4D seams, which would spike the curl.
// See https://github.com/jwagner/simplex-noise.js/issues/9
const CURL_EPSILON = 1e-2;

/** @alias pex-random */
class Random {
  /** @private */
  static #instanceCount = 0;

  static #createNoise(rng) {
    return {
      noise2D: createNoise2D(rng),
      noise3D: createNoise3D(rng),
      noise4D: createNoise4D(rng),
    };
  }

  static #derivative(noise, axis, x, y, z, w) {
    const dx = axis == 0 ? CURL_EPSILON : 0;
    const dy = axis == 1 ? CURL_EPSILON : 0;
    const dz = axis == 2 ? CURL_EPSILON : 0;
    return (
      (noise(x + dx, y + dy, z + dz, w) - noise(x - dx, y - dy, z - dz, w)) /
      (2 * CURL_EPSILON)
    );
  }

  #seed;
  #simplex;
  #simplexVec2;
  #simplexVec3;

  /**
   * @private
   * @property {number} NOW Runtime performance.now() value.
   */
  static NOW = performance.now();

  /**
   * Creates an instance of Random.
   *
   * @param {string | number} [seed=Random.NOW + Random.#instanceCount]
   */
  constructor(seed = Random.NOW + Random.#instanceCount) {
    this.seed(seed);
    Random.#instanceCount++;
  }

  /**
   * Create an instance of Random.
   *
   * @param {string | number} [seed] If omitted, the global PRNG seed will be
   *   used and incremented for each local PRNG.
   * @returns {Random}
   */
  create = (seed) => new Random(seed);

  /**
   * Set the seed for the random number generator.
   *
   * @param {string} s Seed value
   */
  seed(s) {
    this.rng = seedrandom(s);

    // Same seed: keep the noise tables. No seed: always unpredictable.
    if (s != null && Object.is(s, this.#seed)) return;
    this.#seed = s;

    // Expensive: built on first noise call.
    this.#simplex = null;
    this.#simplexVec2 = null;
    this.#simplexVec3 = null;
  }

  #noiseRng(channel = "") {
    // Array keeps 0 and "0" distinct, as in seedrandom. "\0" avoids collisions with typed seeds.
    return seedrandom(
      this.#seed == null ? undefined : [this.#seed, `\0noise${channel}`],
    );
  }

  /** @private */
  get simplex() {
    // Separate PRNG so noise never shifts other values.
    this.#simplex ||= Random.#createNoise(this.#noiseRng());
    return this.#simplex;
  }

  /** @private */
  get simplexVec2() {
    // One seed per channel for uncorrelated components. Extra dimension for time.
    this.#simplexVec2 ||= [
      this.simplex.noise3D,
      createNoise3D(this.#noiseRng(1)),
    ];
    return this.#simplexVec2;
  }

  /** @private */
  get simplexVec3() {
    this.#simplexVec3 ||= [
      this.simplex.noise4D,
      createNoise4D(this.#noiseRng(1)),
      createNoise4D(this.#noiseRng(2)),
    ];
    return this.#simplexVec3;
  }

  /**
   * Get a float between min and max. Defaults to:
   *
   * - `0 <= x < 1` if no argument supplied
   * - `0 <= x < max` if only one argument supplied
   *
   * @param {number} [min]
   * @param {number} [max]
   * @returns {number}
   */
  float(min, max) {
    if (arguments.length == 0) {
      min = 0;
      max = 1;
    } else if (arguments.length == 1) {
      max = min;
      min = 0;
    }
    return min + (max - min) * this.rng();
  }

  /**
   * Get an int between min and max. Defaults to:
   *
   * - `0 <= x < Number.MAX_SAFE_INTEGER` if no argument supplied
   * - `0 <= x < max` if only one argument supplied
   *
   * @param {number} [min]
   * @param {number} [max]
   * @returns {number}
   */
  int(min, max) {
    if (arguments.length == 0) {
      min = 0;
      max = Number.MAX_SAFE_INTEGER;
    } else if (arguments.length == 1) {
      max = min;
      min = 0;
    }
    return Math.floor(this.float(min, max));
  }

  /**
   * Get a vec2 included in a radius.
   *
   * @param {number} [r=1] Radius
   * @param {import("pex-math").Vec2} [out=[]]
   * @returns {import("pex-math").Vec2}
   */
  vec2(r = 1, out = []) {
    const x = 2 * this.rng() - 1;
    const y = 2 * this.rng() - 1;
    const rr = this.rng() * r;
    const len = Math.sqrt(x * x + y * y);
    out[0] = (rr * x) / len;
    out[1] = (rr * y) / len;
    return out;
  }

  /**
   * Get a vec3 included in a radius.
   *
   * @param {number} [r=1] Radius
   * @param {import("pex-math").Vec3} [out=[]]
   * @returns {import("pex-math").Vec3}
   */
  vec3(r = 1, out = []) {
    const x = 2 * this.rng() - 1;
    const y = 2 * this.rng() - 1;
    const z = 2 * this.rng() - 1;
    const rr = this.rng() * r;
    const len = Math.sqrt(x * x + y * y + z * z);
    out[0] = (rr * x) / len;
    out[1] = (rr * y) / len;
    out[2] = (rr * z) / len;
    return out;
  }

  /**
   * Get a vec2 included in a rectangle.
   *
   * @param {number} rect Rectangle
   * @param {import("pex-math").Vec2} [out=[]]
   * @returns {import("pex-math").Vec2}
   */
  vec2InRect(rect, out = []) {
    out[0] = rect[0][0] + this.rng() * (rect[1][0] - rect[0][0]);
    out[1] = rect[0][1] + this.rng() * (rect[1][1] - rect[0][1]);
    return out;
  }

  /**
   * Get a vec3 included in a rectangle bbox.
   *
   * @param {number} bbox Rectangle bbox
   * @param {import("pex-math").Vec3} [out=[]]
   * @returns {import("pex-math").Vec3}
   */
  vec3InAABB(bbox, out = []) {
    out[0] = bbox[0][0] + this.rng() * (bbox[1][0] - bbox[0][0]);
    out[1] = bbox[0][1] + this.rng() * (bbox[1][1] - bbox[0][1]);
    out[2] = bbox[0][2] + this.rng() * (bbox[1][2] - bbox[0][2]);
    return out;
  }

  /**
   * Get a random quaternion.
   *
   * @param {import("pex-math").Quat} [out=[]]
   * @returns {import("pex-math").Quat}
   * @see [Graphics Gems III, Edited by David Kirk, III.6 UNIFORM RANDOM ROTATIONS]
   * @see [Steve LaValle]{@link https://web.archive.org/web/20211105205926/http://planning.cs.uiuc.edu/node198.html}
   */
  quat(out = []) {
    // Let X0, X1, and X2 be three independent random variables that are uniformly distributed between 0 and 1.
    const x0 = this.rng();

    // Compute two uniformly distributed angles, θ1 = 2πX1 and θ2 = 2πX2, and their sines and cosines, s1, c1, s2, c2
    const theta1 = 2 * Math.PI * this.rng();
    const theta2 = 2 * Math.PI * this.rng();

    // Also compute r1 = sqrt(1 – X0) and r2 = sqrt(X0)
    const r1 = Math.sqrt(1 - x0);
    const r2 = Math.sqrt(x0);

    // Then return the unit quaternion with components [s1 r1, c1 r1, s2 r2, c2 r2]
    out[0] = Math.sin(theta1) * r1;
    out[1] = Math.cos(theta1) * r1;
    out[2] = Math.sin(theta2) * r2;
    out[3] = Math.cos(theta2) * r2;
    return out;
  }

  /**
   * Returns a chance of an event occuring according to a given probability
   * between 0 and 1.
   *
   * @param {number} [probability=0.5] Float between 0 and 1.
   * @returns {boolean}
   */
  chance(probability = 0.5) {
    return this.rng() <= probability;
  }

  /**
   * Gets a random element from a list.
   *
   * @param {Array} list
   * @returns {any}
   */
  element(list) {
    return list[Math.floor(this.rng() * list.length)];
  }

  /**
   * Samples the noise field in 2 dimensions.
   *
   * @param {number} x
   * @param {number} y
   * @returns {number} In the interval [-1, 1]
   */
  noise2(x, y) {
    return this.simplex.noise2D(x, y);
  }

  /**
   * Samples the noise field in 3 dimensions.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {number} In the interval [-1, 1]
   */
  noise3(x, y, z) {
    return this.simplex.noise3D(x, y, z);
  }

  /**
   * Samples the noise field in 4 dimensions.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} w
   * @returns {number} In the interval [-1, 1]
   */
  noise4(x, y, z, w) {
    return this.simplex.noise4D(x, y, z, w);
  }

  /**
   * Samples a vector noise field in 2 dimensions.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} [z=0] E.g. time
   * @param {import("pex-math").Vec2} [out=[]]
   * @returns {import("pex-math").Vec2} Each component in the interval [-1, 1]
   */
  vec2Noise(x, y, z = 0, out = []) {
    const [nx, ny] = this.simplexVec2;
    out[0] = nx(x, y, z);
    out[1] = ny(x, y, z);
    return out;
  }

  /**
   * Samples a vector noise field in 3 dimensions.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} [w=0] E.g. time
   * @param {import("pex-math").Vec3} [out=[]]
   * @returns {import("pex-math").Vec3} Each component in the interval [-1, 1]
   */
  vec3Noise(x, y, z, w = 0, out = []) {
    const [nx, ny, nz] = this.simplexVec3;
    out[0] = nx(x, y, z, w);
    out[1] = ny(x, y, z, w);
    out[2] = nz(x, y, z, w);
    return out;
  }

  /**
   * Samples a divergence-free curl noise field in 2 dimensions.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} [t=0] Time
   * @param {import("pex-math").Vec2} [out=[]]
   * @returns {import("pex-math").Vec2}
   * @see [Bridson et al., Curl-Noise for Procedural Fluid Flow]{@link https://doi.org/10.1145/1239451.1239497}
   */
  curl2(x, y, t = 0, out = []) {
    // Bridson et al. eq. 2.
    const noise = this.simplex.noise3D;
    out[0] = Random.#derivative(noise, 1, x, y, t);
    out[1] = -Random.#derivative(noise, 0, x, y, t);
    return out;
  }

  /**
   * Samples a divergence-free curl noise field in 3 dimensions.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} [t=0] Time
   * @param {import("pex-math").Vec3} [out=[]]
   * @returns {import("pex-math").Vec3}
   * @see [Bridson et al., Curl-Noise for Procedural Fluid Flow]{@link https://doi.org/10.1145/1239451.1239497}
   */
  curl3(x, y, z, t = 0, out = []) {
    // Bridson et al. eq. 1. Not normalized: it would break divergence-free.
    const [nx, ny, nz] = this.simplexVec3;
    out[0] =
      Random.#derivative(nz, 1, x, y, z, t) -
      Random.#derivative(ny, 2, x, y, z, t);
    out[1] =
      Random.#derivative(nx, 2, x, y, z, t) -
      Random.#derivative(nz, 0, x, y, z, t);
    out[2] =
      Random.#derivative(ny, 0, x, y, z, t) -
      Random.#derivative(nx, 1, x, y, z, t);
    return out;
  }

  /**
   * Fractional Brownian motion (also called fractal Brownian motion) noise.
   * Default to 1/f noise with 8 octaves.
   *
   * @param {import("./types.js").FBMOptions} options
   * @param {...number} d X, y, z?, w?
   * @returns {number} In the interval [-1, 1]
   */
  fbm(
    {
      octaves = 8,
      lacunarity = 2,
      gain = 0.5,
      frequency = 1,
      amplitude = gain,
      noise,
    },
    ...d
  ) {
    let value = 0;

    noise ||= this[`noise${d.length}`].bind(this);

    for (let i = 0; i < octaves; i++) {
      value += noise(...d.map((n) => n * frequency)) * amplitude;
      frequency *= lacunarity;
      amplitude *= gain;
    }

    return value;
  }
}

/**
 * @module pex-random
 *
 * @summary
 * Export a Random instance using the global PRNG:
 * - The instance is seeded by `performance.now()`
 * - Call `random.seed("seed")` to overwrite the global PRNG: all other calls to `random.float()` will derive from the new seeded state.
 * - Call `random.create()` to create a local instance of Random with a separate unpredictable PRNG.
 * - Call `random.create("seed")` to create a local instance of Random with a separate predictable PRNG: all other calls to `random.float()` will derive from the new seeded state.
 */
export default new Random();
