<a name="module_ola"></a>

## ola
> Add and overlap timestretch algorithm

The overlap and add is the simplest, cheaper (in terms of computation) and
less quality timestretch algorithm. It changes the length of a buffer without
changing it's pitch.

[![npm install dsp-ola](https://nodei.co/npm/dsp-ola.png?mini=true)](https://npmjs.org/package/dsp-ola/)

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
var ola = require('dsp-ola')
const stretch = ola.overlapAdd({ size: 1024 })
const halfSize = stretch(0.5, audioBuffer)
```
**Example**  
```js
var dsp = require('dsp-kit')
```
<a name="module_ola.overlapAdd"></a>

### ola.overlapAdd(options) ⇒ <code>function</code>
Create a timestretch function using an overlap and add algorithm

**Kind**: static method of <code>[ola](#module_ola)</code>  
**Returns**: <code>function</code> - the timestretch function  

| Param | Type |
| --- | --- |
| options | <code>Object</code> |

**Example**  
```js
const stretch = ola.overlapAdd()
stretch(0.5, signal) // => stretch a signal 
```
