<a name="module_array"></a>

## array
> Array manipulation functions

This module contains helper functions to work with arrays (usually typed arrays,
but not required).

This module accepts the premise that explicit is better than implicit.
For this reason:
- The first parameter of all the functions is the number of samples to process.
- The last parameter of all modifyng functions is the array to use as output
allowing _explicit_ in-place modification

[![npm install dsp-array](https://nodei.co/npm/dsp-array.png?mini=true)](https://npmjs.org/package/dsp-array/)

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
var array = require('dsp-array')
const sine = array.fill(1024, (x) => Math.sin(0.5 * x))
```
**Example**  
```js
// included in dsp-kit package
var dsp = require('dsp-kit')
dsp.fill(...)
```

* [array](#module_array)
    * [.zeros(size)](#module_array.zeros) ⇒ <code>Array</code>
    * [.fill(array, fn)](#module_array.fill)
    * [.concat(arrayA, arrayB, destination)](#module_array.concat) ⇒ <code>Array</code>
    * [.add(numberOfSamples, a, b, output)](#module_array.add) ⇒ <code>Array</code>
    * [.mult(numberOfSamples, a, b, output)](#module_array.mult) ⇒ <code>Array</code>
    * [.substr(numberOfSamples, minuend, subtrahend, output)](#module_array.substr) ⇒ <code>Array</code>
    * [.round(array, decimals)](#module_array.round)
    * [.roundTo(decimals)](#module_array.roundTo) ⇒ <code>function</code>
    * [.testAll(N, predicate, array)](#module_array.testAll) ⇒ <code>Boolean</code>

<a name="module_array.zeros"></a>

### array.zeros(size) ⇒ <code>Array</code>
Create a typed array (a Float64Array) filled with zeros

**Kind**: static method of <code>[array](#module_array)</code>  
**Returns**: <code>Array</code> - the array  

| Param | Type |
| --- | --- |
| size | <code>Integer</code> | 

<a name="module_array.fill"></a>

### array.fill(array, fn)
Fill an array using a function

**Kind**: static method of <code>[array](#module_array)</code>  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Number</code> &#124; <code>Array</code> | The array (to reuse) or an array length to create one |
| fn | <code>function</code> | the generator function. It receives the following parameters: - n: a number from [0..1] - index: a number from [0...length] - length: the array length |

**Example**  
```js
const sine = array.fill(10, (x) => Math.sin(x))
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
<a name="module_array.add"></a>

### array.add(numberOfSamples, a, b, output) ⇒ <code>Array</code>
Add elements from two arrays. Can work in-place

**Kind**: static method of <code>[array](#module_array)</code>  
**Returns**: <code>Array</code> - the output buffer  

| Param | Type | Description |
| --- | --- | --- |
| numberOfSamples | <code>Integer</code> | the number of samples to add |
| a | <code>Array</code> | one buffer to add |
| b | <code>Array</code> | the other buffer |
| output | <code>Array</code> | (Optional) the output buffer (or a new one if not provided) |

**Example**  
```js
add(10, signalA, signalB)
// in-place (store the result in signalA)
add(10, signalA, signalB, signalA)
```
<a name="module_array.mult"></a>

### array.mult(numberOfSamples, a, b, output) ⇒ <code>Array</code>
Multiply elements from two arrays. Can work in-place

**Kind**: static method of <code>[array](#module_array)</code>  
**Returns**: <code>Array</code> - the output buffer  

| Param | Type | Description |
| --- | --- | --- |
| numberOfSamples | <code>Integer</code> | the number of samples to add |
| a | <code>Array</code> | one buffer to add |
| b | <code>Array</code> | the other buffer |
| output | <code>Array</code> | (Optional) the output buffer (or a new one if not provided) |

**Example**  
```js
mult(10, signalA, signalB)
// in-place (store the result in signalA)
mult(10, signalA, signalB, signalA)
```
<a name="module_array.substr"></a>

### array.substr(numberOfSamples, minuend, subtrahend, output) ⇒ <code>Array</code>
Substract elements from two arrays. Can work in-place

**Kind**: static method of <code>[array](#module_array)</code>  
**Returns**: <code>Array</code> - the output buffer  

| Param | Type | Description |
| --- | --- | --- |
| numberOfSamples | <code>Integer</code> | the number of samples to add |
| minuend | <code>Array</code> | the buffer to substract from |
| subtrahend | <code>Array</code> | the buffer to get the numbers to being subtracted |
| output | <code>Array</code> | (Optional) the output buffer (or a new one if not provided) |

**Example**  
```js
var signalA = [3, 3, 3, 3]
var signalB = [0, 1, 2, 3]
substr(10, signalA, signalB) // => [3, 2, 1, 0]
// in-place (store the result in signalA)
substr(10, signalA, signalB, signalA) // => signalA contains the result
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

<a name="module_array.roundTo"></a>

### array.roundTo(decimals) ⇒ <code>function</code>
Create a function that rounds to the given decimals

**Kind**: static method of <code>[array](#module_array)</code>  
**Returns**: <code>function</code> - a function  
**See**: round  

| Param | Type | Description |
| --- | --- | --- |
| decimals | <code>Integer</code> | The number of decimals |

<a name="module_array.testAll"></a>

### array.testAll(N, predicate, array) ⇒ <code>Boolean</code>
Test if the N first elements of an array is true for a given predicate

**Kind**: static method of <code>[array](#module_array)</code>  

| Param | Type | Description |
| --- | --- | --- |
| N | <code>Integer</code> | the number of elements to test |
| predicate | <code>function</code> | a function that receive an element of the array and should return true or false |
| array | <code>Array</code> | the array |

**Example**  
```js
var signal = [1, 1, 1, 2, 2, 2]
testAll(3, signal, (x) => x === 1) // => true
testAll(4, signal, (x) => x === 1) // => false
```
