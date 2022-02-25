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
import { seed, float } from "pex-random";

seed("0");
console.log(float());
// Always returns:
// => 0.8071179636424909
```

## API

<!-- api-start -->

## Functions

<dl>
<dt><a href="#seed">seed(s)</a></dt>
<dd><p>Set the seed for the random number generator</p>
</dd>
<dt><a href="#float">float([min], [max])</a> ⇒ <code>number</code></dt>
<dd><p>Get a float between min and max. Defaults to:</p>
<ul>
<li><code>0 &lt;= x &lt; 1</code> if no argument supplied</li>
<li><code>0 &lt;= x &lt; max</code> if only one argument supplied</li>
</ul>
</dd>
<dt><a href="#int">int([min], [max])</a> ⇒ <code>number</code></dt>
<dd><p>Get an int between min and max. Defaults to:</p>
<ul>
<li><code>0 &lt;= x &lt; Number.MAX_SAFE_INTEGER</code> if no argument supplied</li>
<li><code>0 &lt;= x &lt; max</code> if only one argument supplied</li>
</ul>
</dd>
<dt><a href="#vec2">vec2([r])</a> ⇒ <code>module:pex-math~vec2</code></dt>
<dd><p>Get a vec2 included in a radius</p>
</dd>
<dt><a href="#vec3">vec3([r])</a> ⇒ <code>module:pex-math~vec3</code></dt>
<dd><p>Get a vec3 included in a radius</p>
</dd>
<dt><a href="#vec2InRect">vec2InRect(rect)</a> ⇒ <code>module:pex-math~vec2</code></dt>
<dd><p>Get a vec2 included in a rectangle</p>
</dd>
<dt><a href="#vec3InAABB">vec3InAABB(bbox)</a> ⇒ <code>module:pex-math~vec3</code></dt>
<dd><p>Get a vec3 included in a rectangle bbox</p>
</dd>
<dt><a href="#chance">chance(probability)</a> ⇒ <code>boolean</code></dt>
<dd><p>Returns a chance of an event occuring according to a given probability between 0 and 1.</p>
</dd>
<dt><a href="#element">element(list)</a> ⇒ <code>*</code></dt>
<dd><p>Gets a random element from a list</p>
</dd>
<dt><a href="#noise2">noise2(x, y)</a> ⇒ <code>number</code></dt>
<dd><p>Samples the noise field in 2 dimensions</p>
</dd>
<dt><a href="#noise3">noise3(x, y, z)</a> ⇒ <code>number</code></dt>
<dd><p>Samples the noise field in 3 dimensions</p>
</dd>
<dt><a href="#noise4">noise4(x, y, z, w)</a> ⇒ <code>number</code></dt>
<dd><p>Samples the noise field in 4 dimensions</p>
</dd>
</dl>

<a name="seed"></a>

## seed(s)

Set the seed for the random number generator

**Kind**: global function

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| s     | <code>string</code> | Seed value  |

<a name="float"></a>

## float([min], [max]) ⇒ <code>number</code>

Get a float between min and max. Defaults to:

- `0 <= x < 1` if no argument supplied
- `0 <= x < max` if only one argument supplied

**Kind**: global function

| Param | Type                |
| ----- | ------------------- |
| [min] | <code>number</code> |
| [max] | <code>number</code> |

<a name="int"></a>

## int([min], [max]) ⇒ <code>number</code>

Get an int between min and max. Defaults to:

- `0 <= x < Number.MAX_SAFE_INTEGER` if no argument supplied
- `0 <= x < max` if only one argument supplied

**Kind**: global function

| Param | Type                |
| ----- | ------------------- |
| [min] | <code>number</code> |
| [max] | <code>number</code> |

<a name="vec2"></a>

## vec2([r]) ⇒ <code>module:pex-math~vec2</code>

Get a vec2 included in a radius

**Kind**: global function

| Param | Type                | Default        | Description |
| ----- | ------------------- | -------------- | ----------- |
| [r]   | <code>number</code> | <code>1</code> | radius      |

<a name="vec3"></a>

## vec3([r]) ⇒ <code>module:pex-math~vec3</code>

Get a vec3 included in a radius

**Kind**: global function

| Param | Type                | Default        | Description |
| ----- | ------------------- | -------------- | ----------- |
| [r]   | <code>number</code> | <code>1</code> | radius      |

<a name="vec2InRect"></a>

## vec2InRect(rect) ⇒ <code>module:pex-math~vec2</code>

Get a vec2 included in a rectangle

**Kind**: global function

| Param | Type                | Description |
| ----- | ------------------- | ----------- |
| rect  | <code>number</code> | rectangle   |

<a name="vec3InAABB"></a>

## vec3InAABB(bbox) ⇒ <code>module:pex-math~vec3</code>

Get a vec3 included in a rectangle bbox

**Kind**: global function

| Param | Type                | Description    |
| ----- | ------------------- | -------------- |
| bbox  | <code>number</code> | rectangle bbox |

<a name="chance"></a>

## chance(probability) ⇒ <code>boolean</code>

Returns a chance of an event occuring according to a given probability between 0 and 1.

**Kind**: global function

| Param       | Type                | Description            |
| ----------- | ------------------- | ---------------------- |
| probability | <code>number</code> | Float between 0 and 1. |

<a name="element"></a>

## element(list) ⇒ <code>\*</code>

Gets a random element from a list

**Kind**: global function

| Param | Type               |
| ----- | ------------------ |
| list  | <code>Array</code> |

<a name="noise2"></a>

## noise2(x, y) ⇒ <code>number</code>

Samples the noise field in 2 dimensions

**Kind**: global function
**Returns**: <code>number</code> - in the interval [-1, 1]

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |

<a name="noise3"></a>

## noise3(x, y, z) ⇒ <code>number</code>

Samples the noise field in 3 dimensions

**Kind**: global function
**Returns**: <code>number</code> - in the interval [-1, 1]

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |
| z     | <code>number</code> |

<a name="noise4"></a>

## noise4(x, y, z, w) ⇒ <code>number</code>

Samples the noise field in 4 dimensions

**Kind**: global function
**Returns**: <code>number</code> - in the interval [-1, 1]

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |
| z     | <code>number</code> |
| w     | <code>number</code> |

<!-- api-end -->

## License

MIT. See [license file](https://github.com/pex-gl/pex-random/blob/main/LICENSE.md).
