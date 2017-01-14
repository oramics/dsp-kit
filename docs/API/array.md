<a name="module_array"></a>

## array
> Array manipulation functions

[![npm install dsp-array](https://nodei.co/npm/dsp-array.png?mini=true)](https://npmjs.org/package/dsp-array/)

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
var array = require('dsp-array')
const sine = array.generate(1024, (x) => Math.sin(0.5 * x))
```
**Example**  
```js
// included in dsp-kit package
var dsp = require('dsp-kit')
dsp.generate(...)
```

* [array](#module_array)
    * [.add](#module_array.add) ⇒ <code>Array</code>
    * [.mult](#module_array.mult)
    * [.zeros(size)](#module_array.zeros) ⇒ <code>Array</code>
    * [.generate(array, fn)](#module_array.generate)
    * [.concat(arrayA, arrayB, destination)](#module_array.concat) ⇒ <code>Array</code>
    * [.window(window, signal, offset, output)](#module_array.window) ⇒ <code>Array</code>
    * [.combinator(fn)](#module_array.combinator) ⇒ <code>function</code>
    * [.copy(source, destination)](#module_array.copy) ⇒ <code>Array</code>
    * [.map(fn, source, destination)](#module_array.map) ⇒ <code>Array</code>
    * [.round(array, decimals)](#module_array.round)

<a name="module_array.add"></a>

### array.add ⇒ <code>Array</code>
Add two arrays.

**Kind**: static constant of <code>[array](#module_array)</code>  
**Returns**: <code>Array</code> - the destination array (the provided or a new one if no one provided)  

| Param | Type | Description |
| --- | --- | --- |
| arrayA | <code>Array</code> | the source array |
| arrayB | <code>Array</code> | the B array |
| destination | <code>Array</code> &#124; <code>Integer</code> | (Optional) the destination array or the number of samples to add. If not present, a new array is created. |
| offsetA | <code>Integer</code> | (Optional) the start offset of the A array |
| offsetA | <code>Integer</code> | (Optional) the start offset of the B array |
| offsetDestination | <code>Integer</code> | (Optional) the start offset of the destination array |

**Example**  
```js
// add to arrays into a new one
const result = array.add(arrayA, arrayB)
// add to arrays into a third
array.add(arrayA, arrayB, dest)
```
<a name="module_array.mult"></a>

### array.mult
Multiply two arrays.

**Kind**: static constant of <code>[array](#module_array)</code>  

| Param | Type | Description |
| --- | --- | --- |
| arrayA | <code>Array</code> | the source array |
| arrayB | <code>Array</code> | the B array |
| destination | <code>Array</code> &#124; <code>Integer</code> | (Optional) the destination array or the number of samples to add. If not present, a new array is created. |
| offsetA | <code>Integer</code> | the start offset of the A array |
| offsetA | <code>Integer</code> | the start offset of the B array |
| offsetDestination | <code>Integer</code> | the start offset of the destination array |

**Example**  
```js
// add to arrays into a new one
const result = array.add(arrayA, arrayB)
```
**Example**  
```js
// add to arrays into a third
array.add(arrayA, arrayB, dest)
```
<a name="module_array.zeros"></a>

### array.zeros(size) ⇒ <code>Array</code>
Create a typed array (a Float64Array) filled with zeros

**Kind**: static method of <code>[array](#module_array)</code>  
**Returns**: <code>Array</code> - the array  

| Param | Type |
| --- | --- |
| size | <code>Integer</code> | 

<a name="module_array.generate"></a>

### array.generate(array, fn)
Generate an array using a function

**Kind**: static method of <code>[array](#module_array)</code>  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Number</code> &#124; <code>Array</code> | The array (to reuse) or an array length to create one |
| fn | <code>function</code> | the generator function. It receives the following parameters: - n: a number from [0..1] - index: a number from [0...length] - length: the array length |

**Example**  
```js
const sine = array.generate(10, (x) => Math.sin(x))
```
<a name="module_array.concat"></a>

### array.concat(arrayA, arrayB, destination) ⇒ <code>Array</code>
Concatenate two arrays

**Kind**: static method of <code>[array](#module_array)</code>  
**Returns**: <code>Array</code> - destination  

| Param | Type | Description |
| --- | --- | --- |
| arrayA | <code>Array</code> |  |
| arrayB | <code>Array</code> |  |
| destination | <code>Array</code> | (Optional) If provided, the length must be _at least_ the sum of the arrayA and arrayB length plus the destOffset |

**Example**  
```js
// concat into a new array
const arrayC = array.concat(arrayA, arrayB)
```
<a name="module_array.window"></a>

### array.window(window, signal, offset, output) ⇒ <code>Array</code>
Apply a window to a signal.

**Kind**: static method of <code>[array](#module_array)</code>  
**Returns**: <code>Array</code> - the signal fragment after the window applied  

| Param | Type | Description |
| --- | --- | --- |
| window | <code>Array</code> | the window to apply |
| signal | <code>Array</code> | the signal |
| offset | <code>Integer</code> | (Optional) the offset in the signal to place the window (0 by default) |
| output | <code>Array</code> | (Optional) the output array (must be at least the same size as the window) |

**Example**  
```js
var signal = array.generate(1024, ...)
var hamming = array.generate(100, (n, N) => 0.54 - 0.46 * Math.cos(2 * Math.PI * n / (N - 1)))
var windowed = array.window(hamming, signal)
windowed.length // => 100
```
<a name="module_array.combinator"></a>

### array.combinator(fn) ⇒ <code>function</code>
Create an array combinator. Given a function, returns a function to combine
two arrays using that function.

**Kind**: static method of <code>[array](#module_array)</code>  
**Returns**: <code>function</code> - the combinator function  
**See**: copyTo, add, mult  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | the function used to combine the arrays. It accepts two parameters: the numbers of each array to combine |

<a name="module_array.copy"></a>

### array.copy(source, destination) ⇒ <code>Array</code>
Copy an array

**Kind**: static method of <code>[array](#module_array)</code>  
**Returns**: <code>Array</code> - destination  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Array</code> |  |
| destination | <code>Array</code> | (Optional) |

<a name="module_array.map"></a>

### array.map(fn, source, destination) ⇒ <code>Array</code>
Map an array with a function

This function can be partially applied (see examples)

**Kind**: static method of <code>[array](#module_array)</code>  
**Returns**: <code>Array</code> - the mapped array  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | the mapping function |
| source | <code>Array</code> | the source |
| destination | <code>Array</code> | (Optional) if no one is provided, a new array is created |

**Example**  
```js
const sine = array.generate(1024, (x) => Math.sin(x))
array.map((x) => x * 2, sine) // => an array with the gain doubled
// partially applied
const doubleGain = array.map((x) => x * 2)
doubleGain(array) // => an array with the gain doubled
```
<a name="module_array.round"></a>

### array.round(array, decimals)
Round the values of an array to a number of decimals.

There are small differences of precission between algorithms. This helper
function allows to compare them discarding the precission errors.

**Kind**: static method of <code>[array](#module_array)</code>  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> |  |
| decimals | <code>Integer</code> | (Optional) the number of decimals (8 by default) |

