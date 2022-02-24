import assert from "assert";
import random from "../index.js";
import pexGeom from "pex-geom";
import pexMath from "pex-math";

const { rect } = pexGeom;
const { vec2, vec3 } = pexMath;

beforeEach(() => {
  random.seed(Date.now());
});

describe("seed()", () => {
  it("should return the same value for the same seed", () => {
    const a = random.float();
    const b = random.float();
    random.seed(0);
    const c = random.float();
    random.seed(0);
    const d = random.float();
    assert.notEqual(a, b);
    assert.equal(c, d);
  });
});
describe("float()", () => {
  it("should return value between 0..1", () => {
    for (let i = 0; i < 100; i++) {
      const f = random.float();
      assert(f >= 0 && f <= 1);
    }
  });
});
describe("float(max)", () => {
  it("should return value between 0..max", () => {
    const max = 10;
    for (let i = 0; i < 100; i++) {
      const f = random.float(max);
      assert(f >= 0 && f <= max);
    }
  });
  //no idea how to test that better
  //there was once a bug that returned values only from 0..1 for any max, unless min was specified
  it("should return values on average around max/2", () => {
    const max = 10;
    let avg = 0;
    for (let i = 0; i < 100; i++) {
      const f = random.float(max);
      avg += f;
      assert(f >= 0 && f <= max);
    }
    avg /= 100;
    assert(
      avg > (max * 1) / 4 && avg < (max * 3) / 4,
      `Avg:${avg} Min: 0 Max:${max}`
    );
  });
});
describe("float(min, max)", () => {
  it("should return value between min..max", () => {
    const min = 10;
    const max = 20;
    for (let i = 0; i < 100; i++) {
      const f = random.float(min, max);
      assert(f >= min && f <= max);
    }
  });
});
describe("int()", () => {
  it("should return value between 0..MAX_SAFE_INTEGER", () => {
    const maxSafeInteger = 2 ** 53 - 1;
    for (let i = 0; i < 100; i++) {
      const j = random.int();
      assert(j >= 0 && j <= maxSafeInteger);
    }
  });
  it("should return values on average >> 1", () => {
    let avg = 0;
    for (let i = 0; i < 100; i++) {
      const j = random.int();
      avg += j;
    }
    avg /= 100;
    assert(avg > 1, `Avg:${avg}`);
  });
});
describe("int(max)", () => {
  it("should return value between 0..max", () => {
    const max = 10;
    for (let i = 0; i < 100; i++) {
      const j = random.int(max);
      assert(j >= 0 && j <= max);
    }
  });
  //no idea how to test that better
  //there was once a bug that returned values only from 0..1 for any max, unless min was specified
  it("should return values on average around max/2", () => {
    const max = 10;
    let avg = 0;
    for (let i = 0; i < 100; i++) {
      const j = random.int(max);
      avg += j;
      assert(j >= 0 && j <= max);
    }
    avg /= 100;
    assert(
      avg > (max * 1) / 4 && avg < (max * 3) / 4,
      `Avg:${avg} Min: 0 Max:${max}`
    );
  });
});
describe("int(min, max)", () => {
  it("should return value between min..max", () => {
    const min = 10;
    const max = 20;
    for (let i = 0; i < 100; i++) {
      const j = random.int(min, max);
      assert(j >= min && j <= max);
    }
  });
});
describe("vec2()", () => {
  it("should return vec2 with radius <= 1", () => {
    for (let i = 0; i < 100; i++) {
      const v = random.vec2();
      assert(vec2.length(v) <= 1);
    }
  });
});
describe("vec2(r)", () => {
  it("should return vec2 with radius <= r", () => {
    const r = 10;
    for (let i = 0; i < 100; i++) {
      const v = random.vec2(r);
      assert(vec2.length(v) <= r);
    }
  });
  it("should return vec2s with radius on average around r/2", () => {
    let avg = 0;
    const r = 10;
    for (let i = 0; i < 100; i++) {
      const v = random.vec2(r);
      avg += vec2.length(v);
      assert(vec2.length(v) <= r);
    }
    avg /= 100;
    assert(avg > (r * 1) / 4 && avg < (r * 3) / 4, `Avg:${avg} R:${r}`);
  });
});
describe("vec3()", () => {
  it("should return vec3 with radius <= 1", () => {
    for (let i = 0; i < 100; i++) {
      const v = random.vec3();
      assert(vec3.length(v) <= 1);
    }
  });
});
describe("vec3(r)", () => {
  it("should return vec3 with radius <= r", () => {
    const r = 10;
    for (let i = 0; i < 100; i++) {
      const v = random.vec3(r);
      assert(vec3.length(v) <= r);
    }
  });
  it("should return vec3s with radius on average around r/2", () => {
    let avg = 0;
    const r = 10;
    for (let i = 0; i < 100; i++) {
      const v = random.vec3(r);
      avg += vec3.length(v);
      assert(vec3.length(v) <= r);
    }
    avg /= 100;
    assert(avg > (r * 1) / 4 && avg < (r * 3) / 4, `Avg:${avg} R:${r}`);
  });
});
describe("vec2InRect(rect)", () => {
  it("should return vec2 inside the rectangle", () => {
    const rect1 = [
      [-9, -9],
      [5, 5],
    ];
    const rect2 = [
      [-1, -1],
      [2, 2],
    ];
    const rect3 = [
      [9, 9],
      [5, 5],
    ];

    for (let i = 0; i < 100; i++) {
      const v = random.vec2InRect(rect1);
      assert(rect.includePoint(rect1, v));
    }
    for (let i = 0; i < 100; i++) {
      const v = random.vec2InRect(rect2);
      assert(rect.includePoint(rect2, v));
    }
    for (let i = 0; i < 100; i++) {
      const v = random.vec2InRect(rect3);
      assert(rect.includePoint(rect3, v));
    }
  });
});
describe("chance(probability)", () => {
  it("should sometimes win for probability of 0.5", () => {
    let wins = 0;
    for (let i = 0; i < 100; i++) {
      if (random.chance(0.5)) wins++;
    }
    assert(wins > 0);
  });
  it("should never win for probability of 0", () => {
    let wins = 0;
    for (let i = 0; i < 100; i++) {
      if (random.chance()) wins++;
    }
    assert.equal(wins, 0);
  });
  it("should always win for probability of 1", () => {
    let wins = 0;
    for (let i = 0; i < 100; i++) {
      if (random.chance(1)) wins++;
    }
    assert.equal(wins, 100);
  });
});
describe("element(list)", () => {
  it("should return element from the list", () => {
    const list = ["a", "b", "c", "d", "e", "f"];
    for (let i = 0; i < 100; i++) {
      const e = random.element(list);
      assert(list.includes(e));
    }
  });
});
describe("noise2(x, y)", () => {
  it("should return value between -1..1", () => {
    for (let i = 0; i < 100; i++) {
      const x = 100 * Math.random();
      const y = 100 * Math.random();
      const r = random.noise2(x, y);
      assert(r >= -1 && r <= 1);
    }
  });
  it("should return the same value for the same x,y", () => {
    for (let i = 0; i < 100; i++) {
      const x = 100 * Math.random();
      const y = 100 * Math.random();
      const r1 = random.noise2(x, y);
      const r2 = random.noise2(x, y);
      assert.equal(r1, r2);
    }
  });
  it("should return the different value for the same x,y", () => {
    for (let i = 0; i < 100; i++) {
      const x = 100 * Math.random();
      const y = 100 * Math.random();
      random.seed(0);
      const r1 = random.noise2(x, y);
      random.seed(1);
      const r2 = random.noise2(x, y);
      assert.notEqual(r1, r2);
    }
  });
});
describe("noise3(x, y, z)", () => {
  it("should return value between -1..1", () => {
    for (let i = 0; i < 100; i++) {
      const x = 100 * Math.random();
      const y = 100 * Math.random();
      const z = 100 * Math.random();
      const r = random.noise3(x, y, z);
      assert(r >= -1 && r <= 1);
    }
  });
  it("should return the same value for the same x,y", () => {
    for (let i = 0; i < 100; i++) {
      const x = 100 * Math.random();
      const y = 100 * Math.random();
      const z = 100 * Math.random();
      const r1 = random.noise3(x, y, z);
      const r2 = random.noise3(x, y, z);
      assert.equal(r1, r2);
    }
  });
  it("should return the different value for the same x,y", () => {
    for (let i = 0; i < 100; i++) {
      const x = 100 * Math.random();
      const y = 100 * Math.random();
      const z = 100 * Math.random();
      random.seed(0);
      const r1 = random.noise3(x, y, z);
      random.seed(1);
      const r2 = random.noise3(x, y, z);
      assert.notEqual(r1, r2);
    }
  });
});
describe("noise4(x, y, z)", () => {
  it("should return value between -1..1", () => {
    for (let i = 0; i < 100; i++) {
      const x = 100 * Math.random();
      const y = 100 * Math.random();
      const z = 100 * Math.random();
      const w = 100 * Math.random();
      const r = random.noise4(x, y, z, w);
      assert(r >= -1 && r <= 1);
    }
  });
  it("should return the same value for the same x,y", () => {
    for (let i = 0; i < 100; i++) {
      const x = 100 * Math.random();
      const y = 100 * Math.random();
      const z = 100 * Math.random();
      const w = 100 * Math.random();
      const r1 = random.noise4(x, y, z, w);
      const r2 = random.noise4(x, y, z, w);
      assert.equal(r1, r2);
    }
  });
  it("should return the different value for the same x,y", () => {
    for (let i = 0; i < 100; i++) {
      const x = 100 * Math.random();
      const y = 100 * Math.random();
      const z = 100 * Math.random();
      const w = 100 * Math.random();
      random.seed(0);
      const r1 = random.noise4(x, y, z, w);
      random.seed(1);
      const r2 = random.noise4(x, y, z, w);
      assert.notEqual(r1, r2);
    }
  });
});
