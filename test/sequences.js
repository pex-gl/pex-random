import seedrandom from "seedrandom";

// Fixed call sequences mixing all methods and reseeds, compared against recorded values.
const SEEDS = [0, 1, 42, -3, 1.5, "a", "pex", "", "long seed value"];

const OPS = {
  float: (c) => [[], [10], [-5, 5]][c.int(3)],
  int: (c) => [[], [100], [3, 9]][c.int(3)],
  vec2: (c) => [c.float(3)],
  vec3: (c) => [c.float(3)],
  vec2InRect: () => [
    [
      [0, 0],
      [1, 2],
    ],
  ],
  vec3InAABB: () => [
    [
      [0, 0, 0],
      [1, 1, 1],
    ],
  ],
  quat: () => [],
  chance: (c) => [c.float(1)],
  element: () => [["a", "b", "c", "d"]],
  noise2: (c) => [c.coord(), c.coord()],
  noise3: (c) => [c.coord(), c.coord(), c.coord()],
  noise4: (c) => [c.coord(), c.coord(), c.coord(), c.coord()],
  fbm: (c) => [{ octaves: 3 }, c.coord(), c.coord(), c.coord()],
  seed: (c) => [c.seed()],
};
const OP_NAMES = Object.keys(OPS);

const createDriver = (seed) => {
  const rng = seedrandom(seed);
  const driver = {
    float: (max) => rng() * max,
    int: (max) => Math.floor(rng() * max),
    coord: () => (rng() - 0.5) * 20,
    seed: () => SEEDS[driver.int(SEEDS.length)],
  };
  return driver;
};

/**
 * Run the sequences on a Random instance.
 * @param {import("../index.js").default} random
 * @param {object} [options]
 * @param {number} [options.count=24]
 * @param {number} [options.maxLength=32]
 * @returns {Array<object>}
 */
export default function runSequences(
  random,
  { count = 24, maxLength = 32 } = {},
) {
  const driver = createDriver("pex-random-sequences");

  return Array.from({ length: count }, (_, i) => {
    const seed = driver.seed();

    // Cover both the reseeded default instance and fresh local ones.
    const instance =
      i % 4 === 0 ? (random.seed(seed), random) : random.create(seed);

    const calls = Array.from({ length: 1 + driver.int(maxLength) }, () => {
      const name = OP_NAMES[driver.int(OP_NAMES.length)];
      const args = OPS[name](driver);
      return { name, args, result: instance[name](...args) ?? null };
    });

    return { seed, calls };
  });
}
