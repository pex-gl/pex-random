import { describe, it } from "node:test";
import assert from "node:assert";

import seedrandom from "seedrandom";
import { aabb, rect } from "pex-geom";
import { vec2, vec3, quat } from "pex-math";

import random from "../index.js";
import runSequences from "./sequences.js";
import sequences from "./fixtures/sequences.json" with { type: "json" };

const ITERATIONS = 1e3;

// Several points: a single one often matches across seeds as simplex only
// picks from a few gradients.
const NOISE_POINTS = [
  [0.1, 0.2, 0.3, 0.4],
  [3.7, -1.2, 5.3, 2.9],
  [-8.1, 6.4, -2.2, 7.7],
  [12.5, -9.3, 4.6, -6.8],
];
const sampleNoise = (seed, sample) => {
  random.seed(seed);
  return NOISE_POINTS.map(sample);
};

describe("random.create()", () => {
  it("should return different values from the default PRNG", () => {
    const localRandom = random.create();
    const a = random.float();
    const b = localRandom.float();
    assert.notEqual(a, b);
    for (let i = 0; i < ITERATIONS; i++) {
      const c = random.float();
      const d = localRandom.float();
      assert.notEqual(c, d);
    }
  });

  it("should return different values for two local PRNGs (one unseeded, one seeded)", () => {
    const localRandom = random.create();
    const localSeededRandom = random.create("a");
    const a = localRandom.float();
    const b = localSeededRandom.float();
    assert.notEqual(a, b);
    for (let i = 0; i < ITERATIONS; i++) {
      const c = localRandom.float();
      const d = localSeededRandom.float();
      assert.notEqual(c, d);
    }
  });
  it("should return the same values for two local PRNGs (both seeded with the same seed)", () => {
    const localRandom = random.create("a");
    const localSeededRandom = random.create("a");
    const a = localRandom.float();
    const b = localSeededRandom.float();
    assert.equal(a, b);
    for (let i = 0; i < ITERATIONS; i++) {
      const c = localRandom.float();
      const d = localSeededRandom.float();
      assert.equal(c, d);
    }
  });
  it("should return the same values for the same seed (default PRNG and local PRNG)", () => {
    const localRandom = random.create(0);
    random.seed(0);
    const a = random.float();
    const b = localRandom.float();
    assert.equal(a, b);
    for (let i = 0; i < ITERATIONS; i++) {
      const c = random.float();
      const d = localRandom.float();
      assert.equal(c, d);
    }
  });
});
describe("seed()", () => {
  it("should return the same value for the same seed", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const a = random.float();
      const b = random.float();
      random.seed(0);
      const c = random.float();
      random.seed(0);
      const d = random.float();
      assert.notEqual(a, b);
      assert.equal(c, d);
    }
  });
  it("should return the seeded PRNG values regardless of noise calls", () => {
    const rng = seedrandom("pex");
    const localRandom = random.create("pex");
    for (let i = 0; i < ITERATIONS; i++) {
      localRandom.noise2(i, i);
      assert.equal(localRandom.float(), rng());
    }
  });
  it("should return the same noise regardless of other calls", () => {
    const a = random.create(42);
    const b = random.create(42);
    for (let i = 0; i < ITERATIONS; i++) b.float();
    assert.equal(a.noise2(1.5, -2.5), b.noise2(1.5, -2.5));
  });
  it("should return different noise for number and string seeds", () => {
    assert.notEqual(
      random.create(0).noise2(0.3, 0.7),
      random.create("0").noise2(0.3, 0.7),
    );
  });
  it("should keep noise tables when reseeding with the same seed", () => {
    const localRandom = random.create("a");
    const simplex = localRandom.simplex;
    localRandom.seed("a");
    assert.equal(localRandom.simplex, simplex);
    localRandom.seed("b");
    assert.notEqual(localRandom.simplex, simplex);
  });
  it("should keep vector noise tables when reseeding with the same seed", () => {
    for (const key of ["simplexVec2", "simplexVec3"]) {
      const localRandom = random.create("a");
      const tables = localRandom[key];
      localRandom.seed("a");
      assert.equal(localRandom[key], tables);
      localRandom.seed("b");
      assert.notEqual(localRandom[key], tables);
    }
  });
  it("should return unpredictable noise without a seed", () => {
    const localRandom = random.create();
    const sample = (p) => localRandom.noise2(p[0], p[1]);
    localRandom.seed();
    const a = NOISE_POINTS.map(sample);
    localRandom.seed();
    assert.notDeepEqual(NOISE_POINTS.map(sample), a);
  });
  it("should return the same values for mixed call sequences", () => {
    assert.deepEqual(runSequences(random), sequences);
  });
  it("should reset noise when reseeding", () => {
    const localRandom = random.create("a");
    const a = localRandom.noise2(0.3, 0.7);
    localRandom.seed("b");
    const b = localRandom.noise2(0.3, 0.7);
    localRandom.seed("a");
    assert.notEqual(a, b);
    assert.equal(localRandom.noise2(0.3, 0.7), a);
  });
  it("should not change Math.random", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      random.seed(0);
      const a = Math.random();
      random.seed(0);
      const b = Math.random();
      assert.notEqual(a, b);
    }
  });
});
describe("float()", () => {
  it("should return value between 0..1", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const f = random.float();
      assert(f >= 0 && f <= 1);
    }
  });
});
describe("float(max)", () => {
  it("should return value between 0..max", () => {
    const max = 10;
    for (let i = 0; i < ITERATIONS; i++) {
      const f = random.float(max);
      assert(f >= 0 && f <= max);
    }
  });
  //no idea how to test that better
  //there was once a bug that returned values only from 0..1 for any max, unless min was specified
  it("should return values on average around max/2", () => {
    const max = 10;
    let avg = 0;
    for (let i = 0; i < ITERATIONS; i++) {
      const f = random.float(max);
      avg += f;
      assert(f >= 0 && f <= max);
    }
    avg /= ITERATIONS;
    assert(
      avg > (max * 1) / 4 && avg < (max * 3) / 4,
      `Avg:${avg} Min: 0 Max:${max}`,
    );
  });
});
describe("float(min, max)", () => {
  it("should return value between min..max", () => {
    const min = 10;
    const max = 20;
    for (let i = 0; i < ITERATIONS; i++) {
      const f = random.float(min, max);
      assert(f >= min && f <= max);
    }
  });
});
describe("int()", () => {
  it("should return value between 0..MAX_SAFE_INTEGER", () => {
    const maxSafeInteger = 2 ** 53 - 1;
    for (let i = 0; i < ITERATIONS; i++) {
      const j = random.int();
      assert(j >= 0 && j <= maxSafeInteger);
    }
  });
  it("should return values on average >> 1", () => {
    let avg = 0;
    for (let i = 0; i < ITERATIONS; i++) {
      const j = random.int();
      avg += j;
    }
    avg /= ITERATIONS;
    assert(avg > 1, `Avg:${avg}`);
  });
});
describe("int(max)", () => {
  it("should return value between 0..max", () => {
    const max = 10;
    for (let i = 0; i < ITERATIONS; i++) {
      const j = random.int(max);
      assert(j >= 0 && j <= max);
    }
  });
  //no idea how to test that better
  //there was once a bug that returned values only from 0..1 for any max, unless min was specified
  it("should return values on average around max/2", () => {
    const max = 10;
    let avg = 0;
    for (let i = 0; i < ITERATIONS; i++) {
      const j = random.int(max);
      avg += j;
      assert(j >= 0 && j <= max);
    }
    avg /= ITERATIONS;
    assert(
      avg > (max * 1) / 4 && avg < (max * 3) / 4,
      `Avg:${avg} Min: 0 Max:${max}`,
    );
  });
});
describe("int(min, max)", () => {
  it("should return value between min..max", () => {
    const min = 10;
    const max = 20;
    for (let i = 0; i < ITERATIONS; i++) {
      const j = random.int(min, max);
      assert(j >= min && j <= max);
    }
  });
});
describe("vec2()", () => {
  it("should return vec2 with radius <= 1", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const v = random.vec2();
      assert(vec2.length(v) <= 1);
    }
  });
});
describe("vec2(r)", () => {
  it("should return vec2 with radius <= r", () => {
    const r = 10;
    for (let i = 0; i < ITERATIONS; i++) {
      const v = random.vec2(r);
      assert(vec2.length(v) <= r);
    }
  });
  it("should return vec2s with radius on average around r/2", () => {
    let avg = 0;
    const r = 10;
    for (let i = 0; i < ITERATIONS; i++) {
      const v = random.vec2(r);
      avg += vec2.length(v);
      assert(vec2.length(v) <= r);
    }
    avg /= ITERATIONS;
    assert(avg > (r * 1) / 4 && avg < (r * 3) / 4, `Avg:${avg} R:${r}`);
  });
});
describe("vec3()", () => {
  it("should return vec3 with radius <= 1", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const v = random.vec3();
      assert(vec3.length(v) <= 1);
    }
  });
});
describe("vec3(r)", () => {
  it("should return vec3 with radius <= r", () => {
    const r = 10;
    for (let i = 0; i < ITERATIONS; i++) {
      const v = random.vec3(r);
      assert(vec3.length(v) <= r);
    }
  });
  it("should return vec3s with radius on average around r/2", () => {
    let avg = 0;
    const r = 10;
    for (let i = 0; i < ITERATIONS; i++) {
      const v = random.vec3(r);
      avg += vec3.length(v);
      assert(vec3.length(v) <= r);
    }
    avg /= ITERATIONS;
    assert(avg > (r * 1) / 4 && avg < (r * 3) / 4, `Avg:${avg} R:${r}`);
  });
});
describe("vec2InRect(rect)", () => {
  it("should return vec2 inside the rectangle", () => {
    const POSITIVE_RECT = Object.freeze([
      [0, 0],
      [1, 1],
    ]);
    const NEGATIVE_RECT = Object.freeze([
      [-1, -1],
      [0, 0],
    ]);
    const NORM_RECT = Object.freeze([
      [-1, -1],
      [1, 1],
    ]);

    for (let i = 0; i < ITERATIONS; i++) {
      assert(
        rect.containsPoint(POSITIVE_RECT, random.vec2InRect(POSITIVE_RECT)),
      );
    }
    for (let i = 0; i < ITERATIONS; i++) {
      assert(
        rect.containsPoint(NEGATIVE_RECT, random.vec2InRect(NEGATIVE_RECT)),
      );
    }
    for (let i = 0; i < ITERATIONS; i++) {
      assert(rect.containsPoint(NORM_RECT, random.vec2InRect(NORM_RECT)));
    }
  });
});
describe("vec3InAABB(aabb)", () => {
  it("should return vec3 inside the bbox", () => {
    const ORIGIN = Object.freeze([0, 0, 0]);
    const POSITIVE_BOX = Object.freeze([ORIGIN, [1, 1, 1]]);
    const NEGATIVE_BOX = Object.freeze([[-1, -1, -1], ORIGIN]);
    const NORM_BOX = Object.freeze([
      [-1, -1, -1],
      [1, 1, 1],
    ]);
    for (let i = 0; i < ITERATIONS; i++) {
      assert(aabb.containsPoint(POSITIVE_BOX, random.vec3InAABB(POSITIVE_BOX)));
    }
    for (let i = 0; i < ITERATIONS; i++) {
      assert(aabb.containsPoint(NEGATIVE_BOX, random.vec3InAABB(NEGATIVE_BOX)));
    }
    for (let i = 0; i < ITERATIONS; i++) {
      assert(aabb.containsPoint(NORM_BOX, random.vec3InAABB(NORM_BOX)));
    }
  });
});
describe("chance(probability)", () => {
  it("should sometimes win for probability of 0.5", () => {
    let wins = 0;
    for (let i = 0; i < ITERATIONS; i++) {
      if (random.chance()) wins++;
    }
    assert(wins > 0);
  });
  it("should never win for probability of 0", () => {
    let wins = 0;
    for (let i = 0; i < ITERATIONS; i++) {
      if (random.chance(0)) wins++;
    }
    assert.equal(wins, 0);
  });
  it("should always win for probability of 1", () => {
    let wins = 0;
    for (let i = 0; i < ITERATIONS; i++) {
      if (random.chance(1)) wins++;
    }
    assert.equal(wins, ITERATIONS);
  });
});
describe("quat()", () => {
  it("should randomize", () => {
    const q = quat.create();

    for (let i = 0; i < ITERATIONS; i++) {
      quat.identity(q);
      quat.set(q, random.quat());
      assert(quat.length(q) > Number.EPSILON);
    }
  });
});
describe("out", () => {
  const RECT = [
    [0, 0],
    [1, 2],
  ];
  const AABB = [
    [0, 0, 0],
    [1, 2, 3],
  ];
  for (const [name, args] of [
    ["vec2", [2]],
    ["vec3", [2]],
    ["vec2InRect", [RECT]],
    ["vec3InAABB", [AABB]],
    ["quat", []],
  ]) {
    it(`${name} should write to and return out with the same values`, () => {
      const a = random.create("out");
      const b = random.create("out");
      for (let i = 0; i < ITERATIONS; i++) {
        const out = [];
        assert.equal(a[name](...args, out), out);
        assert.deepEqual(out, b[name](...args));
      }
    });
  }
});
describe("element(list)", () => {
  it("should return element from the list", () => {
    const list = ["a", "b", "c", "d", "e", "f"];
    for (let i = 0; i < ITERATIONS; i++) {
      const e = random.element(list);
      assert(list.includes(e));
    }
  });
});
describe("noise2(x, y)", () => {
  it("should return value between -1..1", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      const r = random.noise2(x, y);
      assert(r >= -1 && r <= 1);
    }
  });
  it("should return the same value for the same x,y", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      const r1 = random.noise2(x, y);
      const r2 = random.noise2(x, y);
      assert.equal(r1, r2);
    }
  });
  it("should return different values for the same positions and different seeds", () => {
    const sample = (p) => random.noise2(p[0], p[1]);
    for (let i = 0; i < ITERATIONS; i++) {
      assert.notDeepEqual(sampleNoise(i, sample), sampleNoise(i + 1, sample));
    }
  });
});
describe("noise3(x, y, z)", () => {
  it("should return value between -1..1", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      const z = random.float();
      const r = random.noise3(x, y, z);
      assert(r >= -1 && r <= 1);
    }
  });
  it("should return the same value for the same x,y", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      const z = random.float();
      const r1 = random.noise3(x, y, z);
      const r2 = random.noise3(x, y, z);
      assert.equal(r1, r2);
    }
  });
  it("should return different values for the same positions and different seeds", () => {
    const sample = (p) => random.noise3(p[0], p[1], p[2]);
    for (let i = 0; i < ITERATIONS; i++) {
      assert.notDeepEqual(sampleNoise(i, sample), sampleNoise(i + 1, sample));
    }
  });
});
describe("noise4(x, y, z)", () => {
  it("should return value between -1..1", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      const z = random.float();
      const w = random.float();
      const r = random.noise4(x, y, z, w);
      assert(r >= -1 && r <= 1);
    }
  });
  it("should return the same value for the same x,y", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      const z = random.float();
      const w = random.float();
      const r1 = random.noise4(x, y, z, w);
      const r2 = random.noise4(x, y, z, w);
      assert.equal(r1, r2);
    }
  });
  it("should return different values for the same positions and different seeds", () => {
    const sample = (p) => random.noise4(...p);
    for (let i = 0; i < ITERATIONS; i++) {
      assert.notDeepEqual(sampleNoise(i, sample), sampleNoise(i + 1, sample));
    }
  });
});
describe("vec2Noise(x, y, z, out)", () => {
  it("should return components between -1..1", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      const r = random.vec2Noise(x, y);
      assert.equal(r.length, 2);
      for (const c of r) assert(c >= -1 && c <= 1);
    }
  });
  it("should return the same value for the same x,y", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      assert.deepEqual(random.vec2Noise(x, y), random.vec2Noise(x, y));
    }
  });
  it("should extend noise3 with its first component", () => {
    for (const [x, y, z] of NOISE_POINTS) {
      assert.equal(random.vec2Noise(x, y, z)[0], random.noise3(x, y, z));
    }
  });
  it("should return uncorrelated components", () => {
    for (const [x, y, z] of NOISE_POINTS) {
      const [a, b] = random.vec2Noise(x, y, z);
      assert.notEqual(a, b);
    }
  });
  it("should default z to 0", () => {
    assert.deepEqual(random.vec2Noise(0.1, 0.2), random.vec2Noise(0.1, 0.2, 0));
  });
  it("should write to and return out", () => {
    const out = [0, 0];
    assert.equal(random.vec2Noise(0.1, 0.2, 0.3, out), out);
    assert.deepEqual(out, random.vec2Noise(0.1, 0.2, 0.3));
  });
  it("should return different values for the same positions and different seeds", () => {
    const sample = (p) => random.vec2Noise(p[0], p[1], p[2]);
    for (let i = 0; i < ITERATIONS; i++) {
      assert.notDeepEqual(sampleNoise(i, sample), sampleNoise(i + 1, sample));
    }
  });
});
describe("vec3Noise(x, y, z, w, out)", () => {
  it("should return components between -1..1", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      const z = random.float();
      const r = random.vec3Noise(x, y, z);
      assert.equal(r.length, 3);
      for (const c of r) assert(c >= -1 && c <= 1);
    }
  });
  it("should return the same value for the same x,y,z", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      const z = random.float();
      assert.deepEqual(random.vec3Noise(x, y, z), random.vec3Noise(x, y, z));
    }
  });
  it("should extend noise4 with its first component", () => {
    for (const p of NOISE_POINTS) {
      assert.equal(random.vec3Noise(...p)[0], random.noise4(...p));
    }
  });
  it("should return uncorrelated components", () => {
    for (const p of NOISE_POINTS) {
      const [a, b, c] = random.vec3Noise(...p);
      assert.notEqual(a, b);
      assert.notEqual(b, c);
      assert.notEqual(a, c);
    }
  });
  it("should default w to 0", () => {
    assert.deepEqual(
      random.vec3Noise(0.1, 0.2, 0.3),
      random.vec3Noise(0.1, 0.2, 0.3, 0),
    );
  });
  it("should write to and return out", () => {
    const out = [0, 0, 0];
    assert.equal(random.vec3Noise(0.1, 0.2, 0.3, 0.4, out), out);
    assert.deepEqual(out, random.vec3Noise(0.1, 0.2, 0.3, 0.4));
  });
  it("should return different values for the same positions and different seeds", () => {
    const sample = (p) => random.vec3Noise(...p);
    for (let i = 0; i < ITERATIONS; i++) {
      assert.notDeepEqual(sampleNoise(i, sample), sampleNoise(i + 1, sample));
    }
  });
});
for (const n of [2, 3]) {
  const curl = (...args) => random[`curl${n}`](...args);
  const points = NOISE_POINTS.map((p) => p.slice(0, n));
  // Curl stencil step: div(curl) = 0 then holds exactly, regardless of noise seams.
  const H = 1e-2;
  const divergence = (p, t) =>
    p.reduce((sum, _, i) => {
      const p0 = [...p];
      const p1 = [...p];
      p0[i] -= H;
      p1[i] += H;
      return sum + (curl(...p1, t)[i] - curl(...p0, t)[i]) / (2 * H);
    }, 0);

  describe(`curl${n}(...p, t, out)`, () => {
    it("should return the same value for the same position", () => {
      for (let i = 0; i < ITERATIONS; i++) {
        const p = Array.from({ length: n }, () => random.float());
        assert.deepEqual(curl(...p), curl(...p));
      }
    });
    it("should be divergence-free", () => {
      for (const p of points) {
        for (const t of [0, 1.7]) {
          const magnitude = Math.hypot(...curl(...p, t));
          assert(magnitude > 0);
          assert(Math.abs(divergence(p, t)) < magnitude * 1e-12);
        }
      }
    });
    it("should default t to 0", () => {
      for (const p of points) assert.deepEqual(curl(...p), curl(...p, 0));
    });
    it("should evolve smoothly over time", () => {
      for (const p of points) {
        const a = curl(...p, 0);
        const b = curl(...p, 1e-3);
        assert.notDeepEqual(a, b);
        assert(Math.hypot(...a.map((v, i) => v - b[i])) < 1e-1);
      }
    });
    it("should write to and return out", () => {
      const out = new Array(n).fill(0);
      assert.equal(curl(...points[0], 0.4, out), out);
      assert.deepEqual(out, curl(...points[0], 0.4));
    });
    it("should return different values for the same positions and different seeds", () => {
      const sample = (p) => curl(...p.slice(0, n));
      for (let i = 0; i < ITERATIONS; i++) {
        assert.notDeepEqual(sampleNoise(i, sample), sampleNoise(i + 1, sample));
      }
    });
  });
}
describe("fbm(x, y, z)", () => {
  it("should return value between -1..1", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      const z = random.float();
      const w = random.float();
      const r = random.fbm({}, x, y, z, w);
      assert(r >= -1 && r <= 1);
    }
  });
  it("should return the same value for the same x,y", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      const z = random.float();
      const w = random.float();
      const r1 = random.fbm({}, x, y, z, w);
      const r2 = random.fbm({}, x, y, z, w);
      assert.equal(r1, r2);
    }
  });
  it("should return different values for the same positions and different seeds", () => {
    const sample = (p) => random.fbm({}, ...p);
    for (let i = 0; i < ITERATIONS; i++) {
      assert.notDeepEqual(sampleNoise(i, sample), sampleNoise(i + 1, sample));
    }
  });
});
