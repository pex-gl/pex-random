import { c as create$4, s as set$2, d as dot, a as sub, b as add, e as scale$1, f as cross, l as length, n as normalize } from './common/vec3-22f3a557.js';
import { d as documentCreateElement, w as wellKnownSymbol, o as objectDefineProperty, a as objectCreate, b as objectGetPrototypeOf, f as fails, i as isCallable, r as redefine, c as createPropertyDescriptor, s as setToStringTag, e as iterators, g as objectSetPrototypeOf, h as createNonEnumerableProperty, j as functionCall, _ as _export, k as functionName, l as internalState, m as descriptors, t as toIndexedObject, n as global_1 } from './common/object-set-prototype-of-321dbe28.js';
import './common/_commonjsHelpers-a3307dcf.js';

/**
 * @module aabb
 */

/**
 * @typedef {number[][]} aabb An axis-aligned bounding box defined by two min and max 3D points.
 */

/**
 * Creates a new bounding box.
 * @returns {aabb}
 */
function create() {
  // [min, max]
  return [[Infinity, Infinity, Infinity], [-Infinity, -Infinity, -Infinity]];
}
/**
 * Reset a bounding box.
 * @param {aabb} a
 * @returns {rect}
 */

function empty(a) {
  a[0][0] = Infinity;
  a[0][1] = Infinity;
  a[0][2] = Infinity;
  a[1][0] = -Infinity;
  a[1][1] = -Infinity;
  a[1][2] = -Infinity;
  return a;
}
/**
 * Copies a bounding box.
 * @param {aabb} a
 * @returns {aabb}
 */

function copy(a) {
  return [a[0].slice(), a[1].slice()];
}
/**
 * Sets a bounding box to another.
 * @param {aabb} a
 * @param {aabb} b
 * @returns {aabb}
 */

function set(a, b) {
  a[0][0] = b[0][0];
  a[0][1] = b[0][1];
  a[0][2] = b[0][2];
  a[1][0] = b[1][0];
  a[1][1] = b[1][1];
  a[1][2] = b[1][2];
  return a;
}
/**
 * Checks if a bounding box is empty.
 * @param {aabb} aabb
 * @returns {boolean}
 */

function isEmpty(a) {
  return a[0][0] > a[1][0] || a[0][1] > a[1][1] || a[0][2] > a[1][2];
}
/**
 * Creates a bounding box from a list of points.
 * @param {import("pex-math").vec3[]} points
 * @returns {aabb}
 */

function fromPoints(points) {
  return setPoints(create(), points);
}
/**
 * Updates a bounding box from a list of points.
 * @param {aabb} a
 * @param {import("pex-math").vec3[]} points
 * @returns {aabb}
 */

function setPoints(a, points) {
  for (let i = 0; i < points.length; i++) {
    includePoint(a, points[i]);
  }

  return a;
}
/**
 * @private
 */

function setVec3(v = [], x, y, z) {
  v[0] = x;
  v[1] = y;
  v[2] = z;
  return v;
}
/**
 * Returns a list of 8 points from a bounding box.
 * @param {aabb} aabb
 * @param {import("pex-math").vec3[]} points
 * @returns {import("pex-math").vec3[]}
 */


function getPoints(a, points = []) {
  points[0] = setVec3(points[0], a[0][0], a[0][1], a[0][2]);
  points[1] = setVec3(points[1], a[1][0], a[0][1], a[0][2]);
  points[2] = setVec3(points[2], a[1][0], a[0][1], a[1][2]);
  points[3] = setVec3(points[3], a[0][0], a[0][1], a[1][2]);
  points[4] = setVec3(points[4], a[0][0], a[1][1], a[0][2]);
  points[5] = setVec3(points[5], a[1][0], a[1][1], a[0][2]);
  points[6] = setVec3(points[6], a[1][0], a[1][1], a[1][2]);
  points[7] = setVec3(points[7], a[0][0], a[1][1], a[1][2]);
  return points;
}
/**
 * Returns the center of a bounding box.
 * @param {aabb} a
 * @param {import("pex-math").vec3} out
 * @returns {import("pex-math").vec3}
 */

function center(a, out = [0, 0, 0]) {
  out[0] = (a[0][0] + a[1][0]) / 2;
  out[1] = (a[0][1] + a[1][1]) / 2;
  out[2] = (a[0][2] + a[1][2]) / 2;
  return out;
}
/**
 * Returns the size of a bounding box.
 * @param {aabb} a
 * @param {import("pex-math").vec3} out
 * @returns {import("pex-math").vec3}
 */

function size(a, out = [0, 0, 0]) {
  out[0] = Math.abs(a[1][0] - a[0][0]);
  out[1] = Math.abs(a[1][1] - a[0][1]);
  out[2] = Math.abs(a[1][2] - a[0][2]);
  return out;
}
/**
 * Includes a bounding box in another.
 * @param {aabb} a
 * @param {aabb} b
 * @returns {aabb}
 */

function includeAABB(a, b) {
  if (isEmpty(a)) {
    set(a, b);
  } else if (isEmpty(b)) ; else {
    a[0][0] = Math.min(a[0][0], b[0][0]);
    a[0][1] = Math.min(a[0][1], b[0][1]);
    a[0][2] = Math.min(a[0][2], b[0][2]);
    a[1][0] = Math.max(a[1][0], b[1][0]);
    a[1][1] = Math.max(a[1][1], b[1][1]);
    a[1][2] = Math.max(a[1][2], b[1][2]);
  }

  return a;
}
/**
 * Includes a point in a bounding box.
 * @param {aabb} a
 * @param {import("pex-math").vec3} p
 * @returns {import("pex-math").vec3}
 */

function includePoint(a, p) {
  a[0][0] = Math.min(a[0][0], p[0]);
  a[0][1] = Math.min(a[0][1], p[1]);
  a[0][2] = Math.min(a[0][2], p[2]);
  a[1][0] = Math.max(a[1][0], p[0]);
  a[1][1] = Math.max(a[1][1], p[1]);
  a[1][2] = Math.max(a[1][2], p[2]);
  return a;
}

var aabb = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create,
  empty: empty,
  copy: copy,
  set: set,
  isEmpty: isEmpty,
  fromPoints: fromPoints,
  setPoints: setPoints,
  getPoints: getPoints,
  center: center,
  size: size,
  includeAABB: includeAABB,
  includePoint: includePoint
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`


var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

var domTokenListPrototype = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: objectCreate(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  redefine(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





var returnThis = function () { return this; };

var createIteratorConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

var PROPER_FUNCTION_NAME = functionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$1 = function () { return this; };

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR$1])) {
          redefine(CurrentIteratorPrototype, ITERATOR$1, returnThis$1);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if ( CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return functionCall(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
    redefine(IterablePrototype, ITERATOR$1, defaultIterator, { name: DEFAULT });
  }
  iterators[NAME] = defaultIterator;

  return methods;
};

var defineProperty = objectDefineProperty.f;




var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = internalState.set;
var getInternalState = internalState.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = iterators.Arguments = iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if ( descriptors && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }

var ITERATOR$2 = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = es_array_iterator.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$2] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in domIterables) {
  handlePrototype(global_1[COLLECTION_NAME] && global_1[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(domTokenListPrototype, 'DOMTokenList');

/**
 * @typedef {number[][]} ray A ray defined by a starting 3D point origin and a 3D direction vector.
 */

/**
 * Enum for different intersections values
 * @readonly
 * @enum {number}
 */

const INTERSECTIONS = Object.freeze({
  INTERSECT: 1,
  NO_INTERSECT: 0,
  SAME_PLANE: -1,
  PARALLEL: -2,
  TRIANGLE_DEGENERATE: -2
});
const TEMP_0 = create$4();
const TEMP_1 = create$4();
const TEMP_2 = create$4();
const TEMP_3 = create$4();
const TEMP_4 = create$4();
const TEMP_5 = create$4();
const TEMP_6 = create$4();
const TEMP_7 = create$4();
const EPSILON = 1e-6;
/**
 * Creates a new ray
 * @returns {ray}
 */

function create$1() {
  return [[0, 0, 0], [0, 0, 1]];
}
/**
 * Determines if a ray intersect a plane
 * https://www.cs.princeton.edu/courses/archive/fall00/cs426/lectures/raycast/sld017.htm
 * @param {ray} ray
 * @param {import("pex-math").vec3} point
 * @param {import("pex-math").vec3} normal
 * @param {import("pex-math").vec3} out
 * @returns {number}
 */

function hitTestPlane(ray, point, normal, out = create$4()) {
  const origin = set$2(TEMP_0, ray[0]);
  const direction = set$2(TEMP_1, ray[1]);
  const dotDirectionNormal = dot(direction, normal);
  if (dotDirectionNormal === 0) return INTERSECTIONS.SAME_PLANE;
  point = set$2(TEMP_2, point);
  const t = dot(sub(point, origin), normal) / dotDirectionNormal;
  if (t < 0) return INTERSECTIONS.PARALLEL;
  set$2(out, add(origin, scale$1(direction, t)));
  return INTERSECTIONS.INTERSECT;
}
/**
 * Determines if a ray intersect a triangle
 * http://geomalgorithms.com/a06-_intersect-2.html#intersect3D_RayTriangle()
 * @param {ray} ray
 * @param {triangle} triangle
 * @param {import("pex-math").vec3} out
 * @returns {number}
 */

function hitTestTriangle([origin, direction], [p0, p1, p2], out = create$4()) {
  // get triangle edge vectors and plane normal
  const u = sub(set$2(TEMP_0, p1), p0);
  const v = sub(set$2(TEMP_1, p2), p0);
  const n = cross(set$2(TEMP_2, u), v);
  if (length(n) < EPSILON) return INTERSECTIONS.TRIANGLE_DEGENERATE; // ray vectors

  const w0 = sub(set$2(TEMP_3, origin), p0); // params to calc ray-plane intersect

  const a = -dot(n, w0);
  const b = dot(n, direction);

  if (Math.abs(b) < EPSILON) {
    if (a === 0) return INTERSECTIONS.SAME_PLANE;
    return INTERSECTIONS.NO_INTERSECT;
  } // get intersect point of ray with triangle plane


  const r = a / b; // ray goes away from triangle

  if (r < -EPSILON) return INTERSECTIONS.NO_INTERSECT; // for a segment, also test if (r > 1.0) => no intersect
  // intersect point of ray and plane

  const I = add(set$2(TEMP_4, origin), scale$1(set$2(TEMP_5, direction), r));
  const uu = dot(u, u);
  const uv = dot(u, v);
  const vv = dot(v, v);
  const w = sub(set$2(TEMP_6, I), p0);
  const wu = dot(w, u);
  const wv = dot(w, v);
  const D = uv * uv - uu * vv; // get and test parametric coords

  const s = (uv * wv - vv * wu) / D;
  if (s < -EPSILON || s > 1.0 + EPSILON) return INTERSECTIONS.NO_INTERSECT;
  const t = (uv * wu - uu * wv) / D;
  if (t < -EPSILON || s + t > 1.0 + EPSILON) return INTERSECTIONS.NO_INTERSECT;
  set$2(out, u);
  scale$1(out, s);
  add(out, scale$1(set$2(TEMP_7, v), t));
  add(out, p0);
  return INTERSECTIONS.INTERSECT;
}
/**
 * Determines if a ray intersect an AABB bounding box
 * http://gamedev.stackexchange.com/questions/18436/most-efficient-aabb-vs-ray-collision-algorithms
 * @param {ray} ray
 * @param {aabb} aabb
 * @returns {boolean}
 */

function hitTestAABB([origin, direction], aabb) {
  const dirFracx = 1.0 / direction[0];
  const dirFracy = 1.0 / direction[1];
  const dirFracz = 1.0 / direction[2];
  const min = aabb[0];
  const max = aabb[1];
  const minx = min[0];
  const miny = min[1];
  const minz = min[2];
  const maxx = max[0];
  const maxy = max[1];
  const maxz = max[2];
  const t1 = (minx - origin[0]) * dirFracx;
  const t2 = (maxx - origin[0]) * dirFracx;
  const t3 = (miny - origin[1]) * dirFracy;
  const t4 = (maxy - origin[1]) * dirFracy;
  const t5 = (minz - origin[2]) * dirFracz;
  const t6 = (maxz - origin[2]) * dirFracz;
  const tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)), Math.min(t5, t6));
  const tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)), Math.max(t5, t6));
  return !(tmax < 0 || tmin > tmax);
}
/**
 * Alias for {@link hitTestAABB}
 * @function
 */

const intersectsAABB = hitTestAABB;

var ray = /*#__PURE__*/Object.freeze({
  __proto__: null,
  INTERSECTIONS: INTERSECTIONS,
  create: create$1,
  hitTestPlane: hitTestPlane,
  hitTestTriangle: hitTestTriangle,
  hitTestAABB: hitTestAABB,
  intersectsAABB: intersectsAABB
});

/**
 * @module plane
 */
/**
 * @typedef {number[][]} plane A plane defined by a 3D point and a normal vector perpendicular to the plane’s surface.
 */

const TEMP_0$1 = create$4();
/**
 * Creates a new plane
 * @returns {plane}
 */

function create$2() {
  return [[0, 0, 0], [0, 1, 0]];
}
/**
 * Set the point of intersection betweeen a plane and a ray if it exists to out.
 * @param {plane} plane
 * @param {ray} ray
 * @param {import("pex-math").vec3} out
 * @returns {number}
 */

function getRayIntersection(plane, ray, out) {
  return hitTestPlane(ray, plane[0], plane[1], out);
}
/**
 * Returns on which side a point is.
 * @param {plane} plane
 * @param {import("pex-math").vec3} point
 * @returns {number}
 */

function side(plane, point) {
  const planePoint = plane[0];
  const planeNormal = plane[1];
  set$2(TEMP_0$1, planePoint);
  sub(TEMP_0$1, point);
  normalize(TEMP_0$1);
  const dot$1 = dot(TEMP_0$1, planeNormal);
  if (dot$1 > 0) return 1;
  if (dot$1 < 0) return -1;
  return 0;
}

var plane = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create$2,
  getRayIntersection: getRayIntersection,
  side: side
});

/**
 * @module rect
 */

/**
 * @typedef {number[][]} rect A rectangle defined by two diagonally opposite 2D points.
 */

/**
 * Creates a new rectangle.
 * @returns {rect}
 */
function create$3() {
  return [[Infinity, Infinity], [-Infinity, -Infinity]];
}
/**
 * Reset a rectangle.
 * @param {rect} a
 * @returns {rect}
 */

function empty$1(a) {
  a[0][0] = a[0][1] = Infinity;
  a[1][0] = a[1][1] = -Infinity;
  return a;
}
/**
 * Copies a rectangle.
 * @param {rect} b
 * @returns {rect}
 */

function copy$1(a) {
  return [a[0].slice(), a[1].slice()];
}
/**
 * Sets a rectangle to another.
 * @param {rect} a
 * @param {rect} b
 * @returns {rect}
 */

function set$1(a, b) {
  a[0][0] = b[0][0];
  a[0][1] = b[0][1];
  a[1][0] = b[1][0];
  a[1][1] = b[1][1];
  return a;
}
/**
 * Checks if a rectangle is empty.
 * @param {rect} a
 * @returns {boolean}
 */

function isEmpty$1(a) {
  return a[0][0] > a[1][0] || a[0][1] > a[1][1];
}
/**
 * Updates a rectangle from a list of points.
 * @param {rect} a
 * @param {import("pex-math").vec2[]} points
 * @returns {rect}
 */

function fromPoints$1(a, points) {
  for (let i = 0; i < points.length; i++) {
    includePoint$1(a, points[i]);
  }

  return a;
}
/**
 * Returns a list of 4 points from a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2[]} points
 * @returns {import("pex-math").vec2[]}
 */

function getPoints$1(a, points = []) {
  points[0] = a[0].slice();
  points[1] = [a[0][1], a[1][0]];
  points[2] = a[1].slice();
  points[3] = [a[1][0], a[0][1]];
  return points;
}
/**
 * Scales a rectangle.
 * @param {rect} a
 * @param {number} n
 * @returns {rect}
 */

function scale(a, n) {
  a[0][0] *= n;
  a[0][1] *= n;
  a[1][0] *= n;
  a[1][1] *= n;
  return a;
}
/**
 * Sets the size of a rectangle using width and height.
 * @param {rect} a
 * @param {import("pex-math").vec2} size
 * @returns {rect}
 */

function setSize(a, size) {
  a[1][0] = a[0][0] + size[0];
  a[1][1] = a[0][1] + size[1];
  return a;
}
/**
 * Returns the size of a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2} out
 * @returns {import("pex-math").vec2}
 */

function size$1(a, out = []) {
  out[0] = width(a);
  out[1] = height(a);
  return out;
}
/**
 * Returns the width of a rectangle.
 * @param {rect} a
 * @returns {number}
 */

function width(a) {
  return a[1][0] - a[0][0];
}
/**
 * Returns the height of a rectangle.
 * @param {rect} a
 * @returns {number}
 */

function height(a) {
  return a[1][1] - a[0][1];
}
/**
 * Returns the aspect ratio of a rectangle.
 * @param {rect} a
 * @returns {number}
 */

function aspectRatio(a) {
  return width(a) / height(a);
}
/**
 * Sets the position of a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2} p
 * @returns {rect}
 */

function setPosition(a, [x, y]) {
  const w = width(a);
  const h = height(a);
  a[0][0] = x;
  a[0][1] = y;
  a[1][0] = x + w;
  a[1][1] = y + h;
  return a;
}
/**
 * Returns the center of a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2} out
 * @returns {rect}
 */

function center$1(a, out = []) {
  out[0] = a[0][0] + width(a) * 0.5;
  out[1] = a[0][1] + height(a) * 0.5;
  return out;
}
/**
 * Checks if a point is inside a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2} p
 * @returns {boolean}
 */

function containsPoint(a, [x, y]) {
  return x >= a[0][0] && x <= a[1][0] && y >= a[0][1] && y <= a[1][1];
}
/**
 * Checks if a rectangle is inside another rectangle.
 * @param {rect} a
 * @param {rect} b
 * @returns {boolean}
 */

function containsRect(a, b) {
  return containsPoint(a, b[0]) && containsPoint(a, b[1]);
}
/**
 * Includes a point in a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2} p
 * @returns {rect}
 */

function includePoint$1(a, [x, y]) {
  const minx = a[0][0];
  const miny = a[0][1];
  const maxx = a[1][0];
  const maxy = a[1][1];
  a[0][0] = minx > x ? x : minx;
  a[0][1] = miny > y ? y : miny;
  a[1][0] = maxx < x ? x : maxx;
  a[1][1] = maxy < y ? y : maxy;
  return a;
}
/**
 * Includes a rectangle in another rectangle.
 * @param {rect} a
 * @param {rect} b
 * @returns {rect}
 */

function includeRect(a, b) {
  includePoint$1(a, b[0]);
  includePoint$1(a, b[1]);
  return a;
}
/**
 * Maps a point into the dimensions of a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2} p
 * @returns {import("pex-math").vec2}
 */

function mapPoint(a, p) {
  const minx = a[0][0];
  const miny = a[0][1];
  const maxx = a[1][0];
  const maxy = a[1][1];
  p[0] = Math.max(minx, Math.min(p[0], maxx)) - minx;
  p[1] = Math.max(miny, Math.min(p[1], maxy)) - miny;
  return p;
}
/**
 * Clamps a point into the dimensions of a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2} p
 * @returns {import("pex-math").vec2}
 */

function clampPoint(a, p) {
  const minx = a[0][0];
  const miny = a[0][1];
  const maxx = a[1][0];
  const maxy = a[1][1];
  p[0] = Math.max(minx, Math.min(p[0], maxx));
  p[1] = Math.max(miny, Math.min(p[1], maxy));
  return p;
}

var rect = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create$3,
  empty: empty$1,
  copy: copy$1,
  set: set$1,
  isEmpty: isEmpty$1,
  fromPoints: fromPoints$1,
  getPoints: getPoints$1,
  scale: scale,
  setSize: setSize,
  size: size$1,
  width: width,
  height: height,
  aspectRatio: aspectRatio,
  setPosition: setPosition,
  center: center$1,
  containsPoint: containsPoint,
  containsRect: containsRect,
  includePoint: includePoint$1,
  includeRect: includeRect,
  mapPoint: mapPoint,
  clampPoint: clampPoint
});

export { aabb, plane, ray, rect };
