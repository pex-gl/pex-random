import assert from "assert";
import * as rnd from "../index.js";
import geom from "pex-geom";

const Rect = geom.Rect;

beforeEach(() => {
  rnd.seed(Date.now());
});

describe("Random", () => {
  describe("seed()", () => {
    it("should return the same value for the same seed", () => {
      const a = rnd.float();
      const b = rnd.float();
      rnd.seed(0);
      const c = rnd.float();
      rnd.seed(0);
      const d = rnd.float();
      assert.notEqual(a, b);
      assert.equal(c, d);
    });
  });
  describe("float()", () => {
    it("should return value between 0..1", () => {
      for (let i = 0; i < 100; i++) {
        const f = rnd.float();
        assert(f >= 0 && f <= 1);
      }
    });
  });
  describe("float(max)", () => {
    it("should return value between 0..max", () => {
      const max = 10;
      for (let i = 0; i < 100; i++) {
        const f = rnd.float(max);
        assert(f >= 0 && f <= max);
      }
    });
    //no idea how to test that better
    //there was once a bug that returned values only from 0..1 for any max, unless min was specified
    it("should return values on average around max/2", () => {
      const max = 10;
      let avg = 0;
      for (let i = 0; i < 100; i++) {
        const f = rnd.float(max);
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
        const f = rnd.float(min, max);
        assert(f >= min && f <= max);
      }
    });
  });
  describe("int()", () => {
    it("should return value between 0..MAX_SAFE_INTEGER", () => {
      const maxSafeInteger = 2 ** 53 - 1;
      for (let i = 0; i < 100; i++) {
        const j = rnd.int();
        assert(j >= 0 && j <= maxSafeInteger);
      }
    });
    it("should return values on average >> 1", () => {
      let avg = 0;
      for (let i = 0; i < 100; i++) {
        const j = rnd.int();
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
        const j = rnd.int(max);
        assert(j >= 0 && j <= max);
      }
    });
    //no idea how to test that better
    //there was once a bug that returned values only from 0..1 for any max, unless min was specified
    it("should return values on average around max/2", () => {
      const max = 10;
      let avg = 0;
      for (let i = 0; i < 100; i++) {
        const j = rnd.int(max);
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
        const j = rnd.int(min, max);
        assert(j >= min && j <= max);
      }
    });
  });
  describe("vec2()", () => {
    it("should return vec2 with radius <= 1", () => {
      for (let i = 0; i < 100; i++) {
        const v = rnd.vec2();
        assert(v.length() <= 1);
      }
    });
  });
  describe("vec2(r)", () => {
    it("should return vec2 with radius <= r", () => {
      const r = 10;
      for (let i = 0; i < 100; i++) {
        const v = rnd.vec2(r);
        assert(v.length() <= r);
      }
    });
    it("should return vec2s with radius on average around r/2", () => {
      let avg = 0;
      const r = 10;
      for (let i = 0; i < 100; i++) {
        const v = rnd.vec2(r);
        avg += v.length();
        assert(v.length() <= r);
      }
      avg /= 100;
      assert(avg > (r * 1) / 4 && avg < (r * 3) / 4, `Avg:${avg} R:${r}`);
    });
  });
  describe("vec3()", () => {
    it("should return vec3 with radius <= 1", () => {
      for (let i = 0; i < 100; i++) {
        const v = rnd.vec3();
        assert(v.length() <= 1);
      }
    });
  });
  describe("vec3(r)", () => {
    it("should return vec3 with radius <= r", () => {
      const r = 10;
      for (let i = 0; i < 100; i++) {
        const v = rnd.vec3(r);
        assert(v.length() <= r);
      }
    });
    it("should return vec3s with radius on average around r/2", () => {
      let avg = 0;
      const r = 10;
      for (let i = 0; i < 100; i++) {
        const v = rnd.vec3(r);
        avg += v.length();
        assert(v.length() <= r);
      }
      avg /= 100;
      assert(avg > (r * 1) / 4 && avg < (r * 3) / 4, `Avg:${avg} R:${r}`);
    });
  });
  describe("vec2InRect(rect)", () => {
    it("should return vec2 inside the rectangle", () => {
      const rect1 = new Rect(-9, -9, 5, 5);
      const rect2 = new Rect(-1, -1, 2, 2);
      const rect3 = new Rect(9, 9, 5, 5);

      for (var i = 0; i < 100; i++) {
        var v = rnd.vec2InRect(rect1);
        assert(rect1.contains(v));
      }
      for (var i = 0; i < 100; i++) {
        var v = rnd.vec2InRect(rect2);
        assert(rect2.contains(v));
      }
      for (var i = 0; i < 100; i++) {
        var v = rnd.vec2InRect(rect3);
        assert(rect3.contains(v));
      }
    });
  });
  describe("chance(probability)", () => {
    it("should sometimes win for probability of 0.5", () => {
      let wins = 0;
      for (let i = 0; i < 100; i++) {
        if (rnd.chance(0.5)) wins++;
      }
      assert(wins > 0);
    });
    it("should never win for probability of 0", () => {
      let wins = 0;
      for (let i = 0; i < 100; i++) {
        if (rnd.chance()) wins++;
      }
      assert.equal(wins, 0);
    });
    it("should always win for probability of 1", () => {
      let wins = 0;
      for (let i = 0; i < 100; i++) {
        if (rnd.chance(1)) wins++;
      }
      assert.equal(wins, 100);
    });
  });
  describe("element(list)", () => {
    it("should return element from the list", () => {
      const list = ["a", "b", "c", "d", "e", "f"];
      for (let i = 0; i < 100; i++) {
        const e = rnd.element(list);
        assert(list.includes(e));
      }
    });
  });
  describe("noise2(x, y)", () => {
    it("should return value between -1..1", () => {
      for (let i = 0; i < 100; i++) {
        const x = 100 * Math.random();
        const y = 100 * Math.random();
        const r = rnd.noise2(x, y);
        assert(r >= -1 && r <= 1);
      }
    });
    it("should return the same value for the same x,y", () => {
      for (let i = 0; i < 100; i++) {
        const x = 100 * Math.random();
        const y = 100 * Math.random();
        const r1 = rnd.noise2(x, y);
        const r2 = rnd.noise2(x, y);
        assert.equal(r1, r2);
      }
    });
    it("should return the different value for the same x,y", () => {
      for (let i = 0; i < 100; i++) {
        const x = 100 * Math.random();
        const y = 100 * Math.random();
        rnd.seed(0);
        const r1 = rnd.noise2(x, y);
        rnd.seed(1);
        const r2 = rnd.noise2(x, y);
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
        const r = rnd.noise3(x, y, z);
        assert(r >= -1 && r <= 1);
      }
    });
    it("should return the same value for the same x,y", () => {
      for (let i = 0; i < 100; i++) {
        const x = 100 * Math.random();
        const y = 100 * Math.random();
        const z = 100 * Math.random();
        const r1 = rnd.noise3(x, y, z);
        const r2 = rnd.noise3(x, y, z);
        assert.equal(r1, r2);
      }
    });
    it("should return the different value for the same x,y", () => {
      for (let i = 0; i < 100; i++) {
        const x = 100 * Math.random();
        const y = 100 * Math.random();
        const z = 100 * Math.random();
        rnd.seed(0);
        const r1 = rnd.noise3(x, y, z);
        rnd.seed(1);
        const r2 = rnd.noise3(x, y, z);
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
        const r = rnd.noise4(x, y, z, w);
        assert(r >= -1 && r <= 1);
      }
    });
    it("should return the same value for the same x,y", () => {
      for (let i = 0; i < 100; i++) {
        const x = 100 * Math.random();
        const y = 100 * Math.random();
        const z = 100 * Math.random();
        const w = 100 * Math.random();
        const r1 = rnd.noise4(x, y, z, w);
        const r2 = rnd.noise4(x, y, z, w);
        assert.equal(r1, r2);
      }
    });
    it("should return the different value for the same x,y", () => {
      for (let i = 0; i < 100; i++) {
        const x = 100 * Math.random();
        const y = 100 * Math.random();
        const z = 100 * Math.random();
        const w = 100 * Math.random();
        rnd.seed(0);
        const r1 = rnd.noise4(x, y, z, w);
        rnd.seed(1);
        const r2 = rnd.noise4(x, y, z, w);
        assert.notEqual(r1, r2);
      }
    });
  });
});
