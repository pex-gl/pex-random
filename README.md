# pex-random

[![npm version](https://img.shields.io/npm/v/pex-random)](https://www.npmjs.com/package/pex-random)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/pex-random)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/pex-random)](https://bundlephobia.com/package/pex-random)
[![dependencies](https://img.shields.io/librariesio/release/npm/pex-random)](https://github.com/pex-gl/pex-random/blob/main/package.json)
[![types](https://img.shields.io/npm/types/pex-random)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/pex-gl/pex-random)](https://github.com/pex-gl/pex-random/blob/main/LICENSE.md)

Random value generators (float, int, vector and noise) for [PEX](https://pex.gl).

## Installation

```bash
npm install pex-random
```

## Usage

```js
import random from "pex-random";

// Use global PRNG
console.log(random.float());
// => unpredictable (seeded by performance.now())

// Seed global PRNG
random.seed("0");
console.log(random.float());
// => predictable, always returns: 0.8071179636424909

// Use local PRNG
const localRandom = random.create();
console.log(localRandom.float());
// => unpredictable (seeded by performance.now() + INCREMENT)

// Use seeded local PRNG
const localSeededRandom = random.create("0");
console.log(localSeededRandom.float());
// => predictable, always returns: 0.8071179636424909
```

Notes:

- noise2/3/4: coordinates must be [between -2^31 and 2^31](https://github.com/jwagner/simplex-noise.js/#400). Eg. using `Date.now()` is not viable but `performance.now()` is.
- [similar seeds might not result in different starting values](https://github.com/davidbau/seedrandom/issues/48#issuecomment-331904087)

## API

<!-- api-start -->

## Modules

<dl>
<dt><a href="#module_pex-random">pex-random</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#pex-random">pex-random</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#FBMOptions">FBMOptions</a></dt>
<dd></dd>
<dt><a href="#vec2">vec2</a> : <code>module:pex-math~vec2</code></dt>
<dd></dd>
<dt><a href="#vec3">vec3</a> : <code>module:pex-math~vec3</code></dt>
<dd></dd>
<dt><a href="#quat">quat</a> : <code>module:pex-math~quat</code></dt>
<dd></dd>
</dl>

<a name="module_pex-random"></a>

## pex-random

**Summary**: Export a Random instance using the global PRNG:

- The instance is seeded by `performance.now()`
- Call `random.seed("seed")` to overwrite the global PRNG: all other calls to `random.float()` will derive from the new seeded state.
- Call `random.create()` to create a local instance of Random with a separate unpredictable PRNG.
- Call `random.create("seed")` to create a local instance of Random with a separate predictable PRNG: all other calls to `random.float()` will derive from the new seeded state.
  <a name="pex-random"></a>

## pex-random

**Kind**: global class

- [pex-random](#pex-random)
  - [new Random([seed])](#new_pex-random_new)
  - [.create](#pex-random+create) ⇒ <code>Random</code>
  - [.seed(s)](#pex-random+seed)
  - [.float([min], [max])](#pex-random+float) ⇒ <code>number</code>
  - [.int([min], [max])](#pex-random+int) ⇒ <code>number</code>
  - [.vec2([r])](#pex-random+vec2) ⇒ [<code>vec2</code>](#vec2)
  - [.vec3([r])](#pex-random+vec3) ⇒ [<code>vec3</code>](#vec3)
  - [.vec2InRect(rect)](#pex-random+vec2InRect) ⇒ [<code>vec2</code>](#vec2)
  - [.vec3InAABB(bbox)](#pex-random+vec3InAABB) ⇒ [<code>vec3</code>](#vec3)
  - [.quat()](#pex-random+quat) ⇒ [<code>quat</code>](#quat)
  - [.chance([probability])](#pex-random+chance) ⇒ <code>boolean</code>
  - [.element(list)](#pex-random+element) ⇒ <code>\*</code>
  - [.noise2(x, y)](#pex-random+noise2) ⇒ <code>number</code>
  - [.noise3(x, y, z)](#pex-random+noise3) ⇒ <code>number</code>
  - [.noise4(x, y, z, w)](#pex-random+noise4) ⇒ <code>number</code>
  - [.fbm(options, ...d)](#pex-random+fbm) ⇒ <code>number</code>

<a name="new_pex-random_new"></a>

### new Random([seed])

Creates an instance of Random.

| Param  | Type                                       | Default                                                     |
| ------ | ------------------------------------------ | ----------------------------------------------------------- |
| [seed] | <code>string</code> \| <code>number</code> | <code>&quot;Random.NOW + Random.#instanceCount&quot;</code> |

<a name="pex-random+create"></a>

### pex-random.create ⇒ <code>Random</code>

Create an instance of Random.

**Kind**: instance property of [<code>pex-random</code>](#pex-random)

| Param  | Type                                       | Description                                                                        |
| ------ | ------------------------------------------ | ---------------------------------------------------------------------------------- |
| [seed] | <code>string</code> \| <code>number</code> | If omitted, the global PRNG seed will be used and incremented for each local PRNG. |

<a name="pex-random+seed"></a>

### pex-random.seed(s)

Set the seed for the random number generator.

**Kind**: instance method of [<code>pex-random</code>](#pex-random)

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| s     | <code>string</code> | Seed value  |

<a name="pex-random+float"></a>

### pex-random.float([min], [max]) ⇒ <code>number</code>

Get a float between min and max. Defaults to:

- `0 <= x < 1` if no argument supplied
- `0 <= x < max` if only one argument supplied

**Kind**: instance method of [<code>pex-random</code>](#pex-random)

| Param | Type                |
| ----- | ------------------- |
| [min] | <code>number</code> |
| [max] | <code>number</code> |

<a name="pex-random+int"></a>

### pex-random.int([min], [max]) ⇒ <code>number</code>

Get an int between min and max. Defaults to:

- `0 <= x < Number.MAX_SAFE_INTEGER` if no argument supplied
- `0 <= x < max` if only one argument supplied

**Kind**: instance method of [<code>pex-random</code>](#pex-random)

| Param | Type                |
| ----- | ------------------- |
| [min] | <code>number</code> |
| [max] | <code>number</code> |

<a name="pex-random+vec2"></a>

### pex-random.vec2([r]) ⇒ [<code>vec2</code>](#vec2)

Get a vec2 included in a radius.

**Kind**: instance method of [<code>pex-random</code>](#pex-random)

| Param | Type                | Default        | Description |
| ----- | ------------------- | -------------- | ----------- |
| [r]   | <code>number</code> | <code>1</code> | radius      |

<a name="pex-random+vec3"></a>

### pex-random.vec3([r]) ⇒ [<code>vec3</code>](#vec3)

Get a vec3 included in a radius.

**Kind**: instance method of [<code>pex-random</code>](#pex-random)

| Param | Type                | Default        | Description |
| ----- | ------------------- | -------------- | ----------- |
| [r]   | <code>number</code> | <code>1</code> | radius      |

<a name="pex-random+vec2InRect"></a>

### pex-random.vec2InRect(rect) ⇒ [<code>vec2</code>](#vec2)

Get a vec2 included in a rectangle.

**Kind**: instance method of [<code>pex-random</code>](#pex-random)

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| rect  | <code>number</code> | rectangle   |

<a name="pex-random+vec3InAABB"></a>

### pex-random.vec3InAABB(bbox) ⇒ [<code>vec3</code>](#vec3)

Get a vec3 included in a rectangle bbox.

**Kind**: instance method of [<code>pex-random</code>](#pex-random)

| Param | Type                | Description    |
| ----- | ------------------- | -------------- |
| bbox  | <code>number</code> | rectangle bbox |

<a name="pex-random+quat"></a>

### pex-random.quat() ⇒ [<code>quat</code>](#quat)

Get a random quaternion.

**Kind**: instance method of [<code>pex-random</code>](#pex-random)
**See**

- [Graphics Gems III, Edited by David Kirk, III.6 UNIFORM RANDOM ROTATIONS]
- [Steve LaValle](https://web.archive.org/web/20211105205926/http://planning.cs.uiuc.edu/node198.html)

<a name="pex-random+chance"></a>

### pex-random.chance([probability]) ⇒ <code>boolean</code>

Returns a chance of an event occuring according to a given probability between 0 and 1.

**Kind**: instance method of [<code>pex-random</code>](#pex-random)

| Param         | Type                | Default          | Description            |
| ------------- | ------------------- | ---------------- | ---------------------- |
| [probability] | <code>number</code> | <code>0.5</code> | Float between 0 and 1. |

<a name="pex-random+element"></a>

### pex-random.element(list) ⇒ <code>\*</code>

Gets a random element from a list.

**Kind**: instance method of [<code>pex-random</code>](#pex-random)

| Param | Type               |
| ----- | ------------------ |
| list  | <code>Array</code> |

<a name="pex-random+noise2"></a>

### pex-random.noise2(x, y) ⇒ <code>number</code>

Samples the noise field in 2 dimensions.

**Kind**: instance method of [<code>pex-random</code>](#pex-random)
**Returns**: <code>number</code> - in the interval [-1, 1]

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |

<a name="pex-random+noise3"></a>

### pex-random.noise3(x, y, z) ⇒ <code>number</code>

Samples the noise field in 3 dimensions.

**Kind**: instance method of [<code>pex-random</code>](#pex-random)
**Returns**: <code>number</code> - in the interval [-1, 1]

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |
| z     | <code>number</code> |

<a name="pex-random+noise4"></a>

### pex-random.noise4(x, y, z, w) ⇒ <code>number</code>

Samples the noise field in 4 dimensions.

**Kind**: instance method of [<code>pex-random</code>](#pex-random)
**Returns**: <code>number</code> - in the interval [-1, 1]

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |
| z     | <code>number</code> |
| w     | <code>number</code> |

<a name="pex-random+fbm"></a>

### pex-random.fbm(options, ...d) ⇒ <code>number</code>

Fractional Brownian motion (also called fractal Brownian motion) noise. Default to 1/f noise with 8 octaves.

**Kind**: instance method of [<code>pex-random</code>](#pex-random)
**Returns**: <code>number</code> - in the interval [-1, 1]

| Param   | Type                                   | Description  |
| ------- | -------------------------------------- | ------------ |
| options | [<code>FBMOptions</code>](#FBMOptions) |              |
| ...d    | <code>number</code>                    | x, y, z?, w? |

<a name="FBMOptions"></a>

## FBMOptions

**Kind**: global typedef
**Properties**

| Name         | Type                  | Default           |
| ------------ | --------------------- | ----------------- |
| [octaves]    | <code>number</code>   | <code>8</code>    |
| [lacunarity] | <code>number</code>   | <code>2</code>    |
| [gain]       | <code>number</code>   | <code>0.5</code>  |
| [frequency]  | <code>number</code>   | <code>1</code>    |
| [amplitude]  | <code>number</code>   | <code>gain</code> |
| [noise]      | <code>function</code> |                   |

<a name="vec2"></a>

## vec2 : <code>module:pex-math~vec2</code>

**Kind**: global typedef
<a name="vec3"></a>

## vec3 : <code>module:pex-math~vec3</code>

**Kind**: global typedef
<a name="quat"></a>

## quat : <code>module:pex-math~quat</code>

**Kind**: global typedef

<!-- api-end -->

## License

MIT. See [license file](https://github.com/pex-gl/pex-random/blob/main/LICENSE.md).
