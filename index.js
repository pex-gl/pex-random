import seedrandom from "seedrandom";
import SimplexNoise from "simplex-noise";

/**
 * @typedef FBMOptions
 * @property {number} [octaves=8]
 * @property {number} [lacunarity=2]
 * @property {number} [gain=0.5]
 * @property {number} [frequency=1]
 * @property {number} [amplitude=gain]
 * @property {Function} [noise]
 */

class Random {
  /**
   * @private
   */
  static #instanceCount = 0;

  /**
   * @private
   * @property {number} NOW Runtime performance.now() value.
   */
  static NOW = performance.now();

  /**
   * Creates an instance of Random
   * @param {string|number} [seed=Random.NOW + Random.#instanceCount]
   */
  constructor(seed = Random.NOW + Random.#instanceCount) {
    this.seed(seed);
    Random.#instanceCount++;
  }

  /**
   * Create an instance of Random.
   * @param {string|number} [seed] If omitted, the global PRNG seed will be used and incremented for each local PRNG.
   * @returns {Random}
   */
  create = (seed) => new Random(seed);

  /**
   * Set the seed for the random number generator
   * @param {string} s Seed value
   */
  seed(s) {
    this.rng = seedrandom(s);
    this.simplex = new SimplexNoise(this.rng);
  }

  /**
   * Get a float between min and max. Defaults to:
   * - `0 <= x < 1` if no argument supplied
   * - `0 <= x < max` if only one argument supplied
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
   * - `0 <= x < Number.MAX_SAFE_INTEGER` if no argument supplied
   * - `0 <= x < max` if only one argument supplied
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
   * Get a vec2 included in a radius
   * @param {number} [r=1] radius
   * @returns {import("pex-math").vec2}
   */
  vec2(r = 1) {
    const x = 2 * this.rng() - 1;
    const y = 2 * this.rng() - 1;
    const rr = this.rng() * r;
    const len = Math.sqrt(x * x + y * y);
    return [(rr * x) / len, (rr * y) / len];
  }

  /**
   * Get a vec3 included in a radius
   * @param {number} [r=1] radius
   * @returns {import("pex-math").vec3}
   */
  vec3(r = 1) {
    const x = 2 * this.rng() - 1;
    const y = 2 * this.rng() - 1;
    const z = 2 * this.rng() - 1;
    const rr = this.rng() * r;
    const len = Math.sqrt(x * x + y * y + z * z);
    return [(rr * x) / len, (rr * y) / len, (rr * z) / len];
  }

  /**
   * Get a vec2 included in a rectangle
   * @param {number} rect rectangle
   * @returns {import("pex-math").vec2}
   */
  vec2InRect(rect) {
    return [
      rect[0][0] + this.rng() * (rect[1][0] - rect[0][0]),
      rect[0][1] + this.rng() * (rect[1][1] - rect[0][1]),
    ];
  }

  /**
   * Get a vec3 included in a rectangle bbox
   * @param {number} bbox rectangle bbox
   * @returns {import("pex-math").vec3}
   */
  vec3InAABB(bbox) {
    return [
      bbox[0][0] + this.rng() * (bbox[1][0] - bbox[0][0]),
      bbox[0][1] + this.rng() * (bbox[1][1] - bbox[0][1]),
      bbox[0][2] + this.rng() * (bbox[1][2] - bbox[0][2]),
    ];
  }

  /**
   * Returns a chance of an event occuring according to a given probability between 0 and 1.
   * @param {number} [probability=0.5] Float between 0 and 1.
   * @returns {boolean}
   */
  chance(probability = 0.5) {
    return this.rng() <= probability;
  }

  /**
   * Gets a random element from a list
   * @param {Array} list
   * @returns {*}
   */
  element(list) {
    return list[Math.floor(this.rng() * list.length)];
  }

  /**
   * Samples the noise field in 2 dimensions
   * @param {number} x
   * @param {number} y
   * @returns {number} in the interval [-1, 1]
   */
  noise2(x, y) {
    return this.simplex.noise2D(x, y);
  }

  /**
   * Samples the noise field in 3 dimensions
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {number} in the interval [-1, 1]
   */
  noise3(x, y, z) {
    return this.simplex.noise3D(x, y, z);
  }

  /**
   * Samples the noise field in 4 dimensions
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} w
   * @returns {number} in the interval [-1, 1]
   */
  noise4(x, y, z, w) {
    return this.simplex.noise4D(x, y, z, w);
  }

  /**
   * Fractional Brownian motion (also called fractal Brownian motion) noise. Default to 1/f noise with 8 octaves.
   * @param {FBMOptions} options
   * @param  {...number} d x, y, z?, w?
   * @returns {number} in the interval [-1, 1]
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
