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

## API

<!-- api-start -->

## Modules

<dl>
<dt><a href="#module_pex-random">pex-random</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Random">Random</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#FBMOptions">FBMOptions</a></dt>
<dd></dd>
</dl>

<a name="module_pex-random"></a>

## pex-random

**Summary**: Export a Random instance using the global PRNG:

- The instance is seeded by `performance.now()`
- Call `random.seed("seed")` to overwrite the global PRNG: all other calls to `random.float()` will derive from the new seeded state.
- Call `random.create()` to create a local instance of Random with a separate unpredictable PRNG.
- Call `random.create("seed")` to create a local instance of Random with a separate predictable PRNG: all other calls to `random.float()` will derive from the new seeded state.
  <a name="Random"></a>

## Random

**Kind**: global class

- [Random](#Random)
  - [new Random([seed])](#new_Random_new)
  - [.create](#Random+create) ⇒ [<code>Random</code>](#Random)
  - [.seed(s)](#Random+seed)
  - [.float([min], [max])](#Random+float) ⇒ <code>number</code>
  - [.int([min], [max])](#Random+int) ⇒ <code>number</code>
  - [.vec2([r])](#Random+vec2) ⇒ <code>module:pex-math~vec2</code>
  - [.vec3([r])](#Random+vec3) ⇒ <code>module:pex-math~vec3</code>
  - [.vec2InRect(rect)](#Random+vec2InRect) ⇒ <code>module:pex-math~vec2</code>
  - [.vec3InAABB(bbox)](#Random+vec3InAABB) ⇒ <code>module:pex-math~vec3</code>
  - [.chance([probability])](#Random+chance) ⇒ <code>boolean</code>
  - [.element(list)](#Random+element) ⇒ <code>\*</code>
  - [.noise2(x, y)](#Random+noise2) ⇒ <code>number</code>
  - [.noise3(x, y, z)](#Random+noise3) ⇒ <code>number</code>
  - [.noise4(x, y, z, w)](#Random+noise4) ⇒ <code>number</code>
  - [.fbm(options, ...d)](#Random+fbm) ⇒ <code>number</code>

<a name="new_Random_new"></a>

### new Random([seed])

Creates an instance of Random

| Param  | Type                                       | Default                                                     |
| ------ | ------------------------------------------ | ----------------------------------------------------------- |
| [seed] | <code>string</code> \| <code>number</code> | <code>&quot;Random.NOW + Random.#instanceCount&quot;</code> |

<a name="Random+create"></a>

### random.create ⇒ [<code>Random</code>](#Random)

Create an instance of Random.

**Kind**: instance property of [<code>Random</code>](#Random)

| Param  | Type                                       | Description                                                                        |
| ------ | ------------------------------------------ | ---------------------------------------------------------------------------------- |
| [seed] | <code>string</code> \| <code>number</code> | If omitted, the global PRNG seed will be used and incremented for each local PRNG. |

<a name="Random+seed"></a>

### random.seed(s)

Set the seed for the random number generator

**Kind**: instance method of [<code>Random</code>](#Random)

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| s     | <code>string</code> | Seed value  |

<a name="Random+float"></a>

### random.float([min], [max]) ⇒ <code>number</code>

Get a float between min and max. Defaults to:

- `0 <= x < 1` if no argument supplied
- `0 <= x < max` if only one argument supplied

**Kind**: instance method of [<code>Random</code>](#Random)

| Param | Type                |
| ----- | ------------------- |
| [min] | <code>number</code> |
| [max] | <code>number</code> |

<a name="Random+int"></a>

### random.int([min], [max]) ⇒ <code>number</code>

Get an int between min and max. Defaults to:

- `0 <= x < Number.MAX_SAFE_INTEGER` if no argument supplied
- `0 <= x < max` if only one argument supplied

**Kind**: instance method of [<code>Random</code>](#Random)

| Param | Type                |
| ----- | ------------------- |
| [min] | <code>number</code> |
| [max] | <code>number</code> |

<a name="Random+vec2"></a>

### random.vec2([r]) ⇒ <code>module:pex-math~vec2</code>

Get a vec2 included in a radius

**Kind**: instance method of [<code>Random</code>](#Random)

| Param | Type                | Default        | Description |
| ----- | ------------------- | -------------- | ----------- |
| [r]   | <code>number</code> | <code>1</code> | radius      |

<a name="Random+vec3"></a>

### random.vec3([r]) ⇒ <code>module:pex-math~vec3</code>

Get a vec3 included in a radius

**Kind**: instance method of [<code>Random</code>](#Random)

| Param | Type                | Default        | Description |
| ----- | ------------------- | -------------- | ----------- |
| [r]   | <code>number</code> | <code>1</code> | radius      |

<a name="Random+vec2InRect"></a>

### random.vec2InRect(rect) ⇒ <code>module:pex-math~vec2</code>

Get a vec2 included in a rectangle

**Kind**: instance method of [<code>Random</code>](#Random)

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| rect  | <code>number</code> | rectangle   |

<a name="Random+vec3InAABB"></a>

### random.vec3InAABB(bbox) ⇒ <code>module:pex-math~vec3</code>

Get a vec3 included in a rectangle bbox

**Kind**: instance method of [<code>Random</code>](#Random)

| Param | Type                | Description    |
| ----- | ------------------- | -------------- |
| bbox  | <code>number</code> | rectangle bbox |

<a name="Random+chance"></a>

### random.chance([probability]) ⇒ <code>boolean</code>

Returns a chance of an event occuring according to a given probability between 0 and 1.

**Kind**: instance method of [<code>Random</code>](#Random)

| Param         | Type                | Default          | Description            |
| ------------- | ------------------- | ---------------- | ---------------------- |
| [probability] | <code>number</code> | <code>0.5</code> | Float between 0 and 1. |

<a name="Random+element"></a>

### random.element(list) ⇒ <code>\*</code>

Gets a random element from a list

**Kind**: instance method of [<code>Random</code>](#Random)

| Param | Type               |
| ----- | ------------------ |
| list  | <code>Array</code> |

<a name="Random+noise2"></a>

### random.noise2(x, y) ⇒ <code>number</code>

Samples the noise field in 2 dimensions

**Kind**: instance method of [<code>Random</code>](#Random)
**Returns**: <code>number</code> - in the interval [-1, 1]

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |

<a name="Random+noise3"></a>

### random.noise3(x, y, z) ⇒ <code>number</code>

Samples the noise field in 3 dimensions

**Kind**: instance method of [<code>Random</code>](#Random)
**Returns**: <code>number</code> - in the interval [-1, 1]

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |
| z     | <code>number</code> |

<a name="Random+noise4"></a>

### random.noise4(x, y, z, w) ⇒ <code>number</code>

Samples the noise field in 4 dimensions

**Kind**: instance method of [<code>Random</code>](#Random)
**Returns**: <code>number</code> - in the interval [-1, 1]

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |
| z     | <code>number</code> |
| w     | <code>number</code> |

<a name="Random+fbm"></a>

### random.fbm(options, ...d) ⇒ <code>number</code>

Fractional Brownian motion (also called fractal Brownian motion) noise. Default to 1/f noise with 8 octaves.

**Kind**: instance method of [<code>Random</code>](#Random)
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

<!-- api-end -->

## License

MIT. See [license file](https://github.com/pex-gl/pex-random/blob/main/LICENSE.md).
