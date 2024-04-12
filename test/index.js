import { describe, it } from "node:test";
import assert from "node:assert";

import { aabb, rect } from "pex-geom";
import { vec2, vec3, quat } from "pex-math";

import random from "../index.js";

const ITERATIONS = 1e3;

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
  // TODO: failing test because of seed collision
  it("should return different values for the same position and different seeds", async () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      random.seed(i);
      const r1 = random.noise2(x, y);
      random.seed(i + 1);
      const r2 = random.noise2(x, y);
      assert.notEqual(r1, r2);
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
  it("should return different values for the same position and different seeds", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      const z = random.float();
      random.seed(i);
      const r1 = random.noise3(x, y, z);
      random.seed(i + 1);
      const r2 = random.noise3(x, y, z);
      assert.notEqual(r1, r2);
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
  it("should return different values for the same position and different seeds", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      const z = random.float();
      const w = random.float();
      random.seed(i);
      const r1 = random.noise4(x, y, z, w);
      random.seed(i + 1);
      const r2 = random.noise4(x, y, z, w);
      assert.notEqual(r1, r2);
    }
  });
});
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
  it("should return different values for the same position and different seeds", () => {
    for (let i = 0; i < ITERATIONS; i++) {
      const x = random.float();
      const y = random.float();
      const z = random.float();
      const w = random.float();
      random.seed(i);
      const r1 = random.fbm({}, x, y, z, w);
      random.seed(i + 1);
      const r2 = random.fbm({}, x, y, z, w);
      assert.notEqual(r1, r2);
    }
  });
});
