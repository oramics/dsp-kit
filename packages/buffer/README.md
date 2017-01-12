<a name="module_buffer"></a>

## buffer
> Array buffer manipulation functions

[![npm install dsp-buffer](https://nodei.co/npm/dsp-buffer.png?mini=true)](https://npmjs.org/package/dsp-buffer/)

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
var dsp = require('dsp-kit')
dsp.generate(...)
```
**Example**  
```js
// require only this module
var buffer = require('dsp-buffer')
const sine = buffer.generate(1024, (x) => Math.sin(0.5 * x))
```

* [buffer](#module_buffer)
    * [.from](#module_buffer.from)
    * [.add](#module_buffer.add) ⇒ <code>Array</code>
    * [.mult](#module_buffer.mult)
    * [.zeros(size)](#module_buffer.zeros) ⇒ <code>Array</code>
    * [.generate(buffer, fn)](#module_buffer.generate)
    * [.concat(bufferA, bufferB, destination)](#module_buffer.concat) ⇒ <code>Array</code>
    * [.combinator(fn)](#module_buffer.combinator) ⇒ <code>function</code>
    * [.copy(source, destination)](#module_buffer.copy) ⇒ <code>Array</code>
    * [.map(fn, source, destination)](#module_buffer.map) ⇒ <code>Array</code>
    * [.round(array, decimals)](#module_buffer.round)

<a name="module_buffer.from"></a>

### buffer.from
Create a buffer from an array (an alias for Float64Array.from)

**Kind**: static constant of <code>[buffer](#module_buffer)</code>  
<a name="module_buffer.add"></a>

### buffer.add ⇒ <code>Array</code>
Add two buffers.

**Kind**: static constant of <code>[buffer](#module_buffer)</code>  
**Returns**: <code>Array</code> - the destination buffer (the provided or a new one if no one provided)  

| Param | Type | Description |
| --- | --- | --- |
| bufferA | <code>Array</code> | the source buffer |
| bufferB | <code>Array</code> | the B buffer |
| destination | <code>Array</code> &#124; <code>Integer</code> | (Optional) the destination buffer or the number of samples to add. If not present, a new buffer is created. |
| offsetA | <code>Integer</code> | (Optional) the start offset of the A buffer |
| offsetA | <code>Integer</code> | (Optional) the start offset of the B buffer |
| offsetDestination | <code>Integer</code> | (Optional) the start offset of the destination buffer |

**Example**  
```js
// add to buffers into a new one
const result = buffer.add(bufferA, bufferB)
// add to buffers into a third
buffer.add(bufferA, bufferB, dest)
```
<a name="module_buffer.mult"></a>

### buffer.mult
Multiply two buffers.

**Kind**: static constant of <code>[buffer](#module_buffer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| bufferA | <code>Array</code> | the source buffer |
| bufferB | <code>Array</code> | the B buffer |
| destination | <code>Array</code> &#124; <code>Integer</code> | (Optional) the destination buffer or the number of samples to add. If not present, a new buffer is created. |
| offsetA | <code>Integer</code> | the start offset of the A buffer |
| offsetA | <code>Integer</code> | the start offset of the B buffer |
| offsetDestination | <code>Integer</code> | the start offset of the destination buffer |

**Example**  
```js
// add to buffers into a new one
const result = buffer.add(bufferA, bufferB)
```
**Example**  
```js
// add to buffers into a third
buffer.add(bufferA, bufferB, dest)
```
<a name="module_buffer.zeros"></a>

### buffer.zeros(size) ⇒ <code>Array</code>
Create a buffer (a Float64Array) filled with zeros

**Kind**: static method of <code>[buffer](#module_buffer)</code>  
**Returns**: <code>Array</code> - the buffer  

| Param | Type |
| --- | --- |
| size | <code>Integer</code> | 

<a name="module_buffer.generate"></a>

### buffer.generate(buffer, fn)
Generate a buffer using a function

**Kind**: static method of <code>[buffer](#module_buffer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Number</code> &#124; <code>Array</code> | The buffer (to reuse) or a buffer length to create one |
| fn | <code>function</code> | the generator function. It receives the following parameters: - n: a number from [0..1] - index: a number from [0...length] - length: the buffer length |

**Example**  
```js
const sine = buffer.generate(10, (x) => Math.sin(x))
```
<a name="module_buffer.concat"></a>

### buffer.concat(bufferA, bufferB, destination) ⇒ <code>Array</code>
Concatenate two buffers

**Kind**: static method of <code>[buffer](#module_buffer)</code>  
**Returns**: <code>Array</code> - destination  

| Param | Type | Description |
| --- | --- | --- |
| bufferA | <code>Array</code> |  |
| bufferB | <code>Array</code> |  |
| destination | <code>Array</code> | (Optional) If provided, the length must be _at least_ the sum of the bufferA and bufferB length plus the destOffset |

**Example**  
```js
// concat into a new buffer
const bufferC = buffer.concat(bufferA, bufferB)
```
<a name="module_buffer.combinator"></a>

### buffer.combinator(fn) ⇒ <code>function</code>
Create a buffer combinator. Given a function, returns a function to combine
two buffers using that function.

**Kind**: static method of <code>[buffer](#module_buffer)</code>  
**Returns**: <code>function</code> - the combinator function  
**See**: copyTo, add, mult  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | the function used to combine the buffers. It accepts two parameters: the numbers of each buffer to combine |

<a name="module_buffer.copy"></a>

### buffer.copy(source, destination) ⇒ <code>Array</code>
Copy a buffer

**Kind**: static method of <code>[buffer](#module_buffer)</code>  
**Returns**: <code>Array</code> - destination  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Array</code> |  |
| destination | <code>Array</code> | (Optional) |

<a name="module_buffer.map"></a>

### buffer.map(fn, source, destination) ⇒ <code>Array</code>
Map a buffer with a function

This function can be partially applied (see examples)

**Kind**: static method of <code>[buffer](#module_buffer)</code>  
**Returns**: <code>Array</code> - the mapped buffer  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | the mapping function |
| source | <code>Array</code> | the source |
| destination | <code>Array</code> | (Optional) if no one is provided, a new buffer is created |

**Example**  
```js
const sine = buffer.generate(1024, (x) => Math.sin(x))
buffer.map((x) => x * 2, sine) // => a buffer with the gain doubled
// partially applied
const doubleGain = buffer.map((x) => x * 2)
doubleGain(buffer) // => a buffer with the gain doubled
```
<a name="module_buffer.round"></a>

### buffer.round(array, decimals)
Round the values of an array to a number of decimals.

There are small differences of precission between algorithms. This helper
function allows to compare them discarding the precission errors.

**Kind**: static method of <code>[buffer](#module_buffer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> |  |
| decimals | <code>Integer</code> | (Optional) the number of decimals (8 by default) |

