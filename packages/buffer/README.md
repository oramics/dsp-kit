<a name="module_buffer"></a>

## buffer
> Array buffer manipulation functions

[![npm install dsp-buffer](https://nodei.co/npm/dsp-buffer.png?mini=true)](https://npmjs.org/package/dsp-buffer/)

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
var buffer = require('dsp-buffer')
const sine = buffer.generate(1024, (x) => Math.sin(0.5 * x))
```
**Example**  
```js
var dsp = require('dsp-kit')
dsp.buffer.generate(...)
```

* [buffer](#module_buffer)
    * [~zeros(size)](#module_buffer..zeros) ⇒ <code>Array</code>
    * [~generate(buffer, fn)](#module_buffer..generate)
    * [~map()](#module_buffer..map)
    * [~copy()](#module_buffer..copy)

<a name="module_buffer..zeros"></a>

### buffer~zeros(size) ⇒ <code>Array</code>
Create a buffer (a Float64Array) filled with zeros

**Kind**: inner method of <code>[buffer](#module_buffer)</code>  
**Returns**: <code>Array</code> - the buffer  

| Param | Type |
| --- | --- |
| size | <code>Integer</code> | 

<a name="module_buffer..generate"></a>

### buffer~generate(buffer, fn)
Generate a buffer using a function

**Kind**: inner method of <code>[buffer](#module_buffer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Number</code> &#124; <code>Array</code> | The buffer (to reuse) or a buffer length to create one |
| fn | <code>function</code> | the generator function. It receives the following parameters: - n: a number from [0..1] - index: a number from [0...length] - length: the buffer length |

**Example**  
```js
const sine = buffer.generate(10, (x) => Math.sin(x))
```
<a name="module_buffer..map"></a>

### buffer~map()
Map a source with a function

**Kind**: inner method of <code>[buffer](#module_buffer)</code>  
<a name="module_buffer..copy"></a>

### buffer~copy()
Copy a buffer into a destination

**Kind**: inner method of <code>[buffer](#module_buffer)</code>  
