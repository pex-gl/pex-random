Random value generators (float, vec3, etc) for the pex library

```javascript

var rnd = require('pex-random');

rnd.seed(0);
rnd.float(min, max);
rnd.int(min, max);
rnd.vec2(r);
rnd.vec3(r);
rnd.vec2InRect(rect);
rnd.vec3InBoundingBox(bbox);
rnd.chance(chance);
rnd.element(list);
rnd.noise2(x, y);
rnd.noise3(x, y, z);
rnd.noise4(x, y, z, w);

```