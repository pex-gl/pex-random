var assert = require("assert");
var rnd = require('../');
var geom = require('pex-geom');
var Vec3 = geom.Vec3;
var Rect = geom.Rect;
var BoundingBox = geom.BoundingBox;

beforeEach(function() {
  rnd.seed(Date.now());
});

describe('Random', function() {
  describe('seed()', function() {
    it('should return the same value for the same seed', function() {
      var a = rnd.float();
      var b = rnd.float();
      rnd.seed(0);
      var c = rnd.float();
      rnd.seed(0);
      var d = rnd.float();
      assert.notEqual(a, b);
      assert.equal(c, d);
    })
  })
  describe('float()', function() {
    it('should return value between 0..1', function() {
      for(var i=0; i<100; i++) {
        var f = rnd.float();
        assert(f >= 0 && f <= 1);
      }
    })
  })
  describe('float(max)', function() {
    it('should return value between 0..max', function() {
      var max = 10;
      for(var i=0; i<100; i++) {
        var f = rnd.float(max);
        assert(f >= 0 && f <= max);
      }
    })
    //no idea how to test that better
    //there was once a bug that returned values only from 0..1 for any max, unless min was specified
    it('should return values on average around max/2', function() {
      var max = 10;
      var avg = 0;
      for(var i=0; i<100; i++) {
        var f = rnd.float(max);
        avg += f;
        assert(f >= 0 && f <= max);
      }
      avg /= 100;
      assert(avg > max*1/4 && avg < max*3/4, 'Avg:' + avg + ' Min: 0' + ' Max:' + max);
    })
  })
  describe('float(min, max)', function() {
    it('should return value between min..max', function() {
      var min = 10;
      var max = 20;
      for(var i=0; i<100; i++) {
        var f = rnd.float(min, max);
        assert(f >= min && f <= max);
      }
    })
  })
  describe('int()', function() {
    it('should return value between 0..MAX_SAFE_INTEGER', function() {
      var maxSafeInteger = Math.pow(2, 53) - 1;
      for(var i=0; i<100; i++) {
        var j = rnd.int();
        assert(j >= 0 && j <= maxSafeInteger);
      }
    })
    it('should return values on average >> 1', function() {
      var avg = 0;
      for(var i=0; i<100; i++) {
        var j = rnd.int();
        avg += j;
      }
      avg /= 100;
      assert(avg > 1, 'Avg:' + avg);
    })
  })
  describe('int(max)', function() {
    it('should return value between 0..max', function() {
      var max = 10;
      for(var i=0; i<100; i++) {
        var j = rnd.int(max);
        assert(j >= 0 && j <= max);
      }
    })
    //no idea how to test that better
    //there was once a bug that returned values only from 0..1 for any max, unless min was specified
    it('should return values on average around max/2', function() {
      var max = 10;
      var avg = 0;
      for(var i=0; i<100; i++) {
        var j = rnd.int(max);
        avg += j;
        assert(j >= 0 && j <= max);
      }
      avg /= 100;
      assert(avg > max*1/4 && avg < max*3/4, 'Avg:' + avg + ' Min: 0' + ' Max:' + max);
    })
  })
  describe('int(min, max)', function() {
    it('should return value between min..max', function() {
      var min = 10;
      var max = 20;
      for(var i=0; i<100; i++) {
        var j = rnd.int(min, max);
        assert(j >= min && j <= max);
      }
    })
  })
  describe('vec2()', function() {
    it('should return vec2 with radius <= 1', function() {
      for(var i=0; i<100; i++) {
        var v = rnd.vec2();
        assert(v.length() <= 1);
      }
    });
  })
  describe('vec2(r)', function() {
    it('should return vec2 with radius <= r', function() {
      var r = 10;
      for(var i=0; i<100; i++) {
        var v = rnd.vec2(r);
        assert(v.length() <= r);
      }
    })
    it('should return vec2s with radius on average around r/2', function() {
      var avg = 0;
      var r = 10;
      for(var i=0; i<100; i++) {
        var v = rnd.vec2(r);
        avg += v.length();
        assert(v.length() <= r);
      }
      avg /= 100;
      assert(avg > r*1/4 && avg < r*3/4, 'Avg:' + avg + ' R:' + r);
    })
  })
  describe('vec3()', function() {
    it('should return vec3 with radius <= 1', function() {
      for(var i=0; i<100; i++) {
        var v = rnd.vec3();
        assert(v.length() <= 1);
      }
    });
  })
  describe('vec3(r)', function() {
    it('should return vec3 with radius <= r', function() {
      var r = 10;
      for(var i=0; i<100; i++) {
        var v = rnd.vec3(r);
        assert(v.length() <= r);
      }
    })
    it('should return vec3s with radius on average around r/2', function() {
      var avg = 0;
      var r = 10;
      for(var i=0; i<100; i++) {
        var v = rnd.vec3(r);
        avg += v.length();
        assert(v.length() <= r);
      }
      avg /= 100;
      assert(avg > r*1/4 && avg < r*3/4, 'Avg:' + avg + ' R:' + r);
    })
  })
  describe('vec2InRect(rect)', function() {
    it('should return vec2 inside the rectangle', function() {
      var rect1 = new Rect(-9, -9, 5, 5);
      var rect2 = new Rect(-1, -1, 2, 2);
      var rect3 = new Rect( 9,  9, 5, 5);

      for(var i=0; i<100; i++) {
        var v = rnd.vec2InRect(rect1);
        assert(rect1.contains(v));
      }
      for(var i=0; i<100; i++) {
        var v = rnd.vec2InRect(rect2);
        assert(rect2.contains(v));
      }
      for(var i=0; i<100; i++) {
        var v = rnd.vec2InRect(rect3);
        assert(rect3.contains(v));
      }
    })
  })
  describe('chance(probability)', function() {
    it('should sometimes win for probability of 0.5', function() {
      var wins = 0;
      for(var i=0; i<100; i++) {
        if (rnd.chance(0.5)) wins++;
      }
      assert(wins > 0)
    })
    it('should never win for probability of 0', function() {
      var wins = 0;
      for(var i=0; i<100; i++) {
        if (rnd.chance()) wins++;
      }
      assert.equal(wins, 0)
    })
    it('should always win for probability of 1', function() {
      var wins = 0;
      for(var i=0; i<100; i++) {
        if (rnd.chance(1)) wins++;
      }
      assert.equal(wins, 100)
    })
  })
  describe('element(list)', function() {
    it('should return element from the list', function() {
      var list = ['a', 'b', 'c', 'd', 'e', 'f'];
      for(var i=0; i<100; i++) {
        var e = rnd.element(list);
        assert(list.indexOf(e) > -1);
      }
    });
  });
  describe('noise2(x, y)', function() {
     it('should return value between -1..1', function() {
      for(var i=0; i<100; i++) {
        var x = 100 * Math.random();
        var y = 100 * Math.random();
        var r = rnd.noise2(x, y);
        assert(r >= -1 && r <= 1);
      }
    });
    it('should return the same value for the same x,y', function() {
      for(var i=0; i<100; i++) {
        var x = 100 * Math.random();
        var y = 100 * Math.random();
        var r1 = rnd.noise2(x, y);
        var r2 = rnd.noise2(x, y);
        assert.equal(r1, r2);
      }
    });
    it('should return the different value for the same x,y', function() {
      for(var i=0; i<100; i++) {
        var x = 100 * Math.random();
        var y = 100 * Math.random();
        rnd.seed(0);
        var r1 = rnd.noise2(x, y);
        rnd.seed(1);
        var r2 = rnd.noise2(x, y);
        assert.notEqual(r1, r2);
      }
    });
  });
  describe('noise3(x, y, z)', function() {
     it('should return value between -1..1', function() {
      for(var i=0; i<100; i++) {
        var x = 100 * Math.random();
        var y = 100 * Math.random();
        var z = 100 * Math.random();
        var r = rnd.noise3(x, y, z);
        assert(r >= -1 && r <= 1);
      }
    });
    it('should return the same value for the same x,y', function() {
      for(var i=0; i<100; i++) {
        var x = 100 * Math.random();
        var y = 100 * Math.random();
        var z = 100 * Math.random();
        var r1 = rnd.noise3(x, y, z);
        var r2 = rnd.noise3(x, y, z);
        assert.equal(r1, r2);
      }
    });
    it('should return the different value for the same x,y', function() {
      for(var i=0; i<100; i++) {
        var x = 100 * Math.random();
        var y = 100 * Math.random();
        var z = 100 * Math.random();
        rnd.seed(0);
        var r1 = rnd.noise3(x, y, z);
        rnd.seed(1);
        var r2 = rnd.noise3(x, y, z);
        assert.notEqual(r1, r2);
      }
    });
  });
  describe('noise4(x, y, z)', function() {
     it('should return value between -1..1', function() {
      for(var i=0; i<100; i++) {
        var x = 100 * Math.random();
        var y = 100 * Math.random();
        var z = 100 * Math.random();
        var w = 100 * Math.random();
        var r = rnd.noise4(x, y, z, w);
        assert(r >= -1 && r <= 1);
      }
    });
    it('should return the same value for the same x,y', function() {
      for(var i=0; i<100; i++) {
        var x = 100 * Math.random();
        var y = 100 * Math.random();
        var z = 100 * Math.random();
        var w = 100 * Math.random();
        var r1 = rnd.noise4(x, y, z, w);
        var r2 = rnd.noise4(x, y, z, w);
        assert.equal(r1, r2);
      }
    });
    it('should return the different value for the same x,y', function() {
      for(var i=0; i<100; i++) {
        var x = 100 * Math.random();
        var y = 100 * Math.random();
        var z = 100 * Math.random();
        var w = 100 * Math.random();
        rnd.seed(0);
        var r1 = rnd.noise4(x, y, z, w);
        rnd.seed(1);
        var r2 = rnd.noise4(x, y, z, w);
        assert.notEqual(r1, r2);
      }
    });
  });
})