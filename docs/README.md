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
<a name="module_dft"></a>

## dft
> Discrete Fourier Transformation

[![npm install dsp-dft](https://nodei.co/npm/dsp-dft.png?mini=true)](https://npmjs.org/package/dsp-dft/)

This module have functions to compute DFT using the correlation algorithm
(the simplest and easy to understand, also the slowest)

> Various methods are used to obtain DFT for time domain samples including use
of Simultaneous Equations using Gaussian elimination, correlation, and using
the Fast Fourier Transform algorithm. The first option requires massive work
even for a comparitively small number of samples. In actual practice,
correlation is the preferred method if the DFT has less than about 32 points.

The functions of this module are not intended to be used in production. It
has two objectives:

- Educational: learn how to implement the DFT correlation algorithm
- Test: test more complex algorithms against this to check results

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
var dft = require('dsp-dft')
dft.forward(signal)
```

* [dft](#module_dft)
    * [~dft(src, dest, inverse)](#module_dft..dft) ⇒ <code>Object</code>
    * [~forward(signal)](#module_dft..forward) ⇒ <code>Object</code>
    * [~inverse(signal)](#module_dft..inverse) ⇒ <code>Array</code>

<a name="module_dft..dft"></a>

### dft~dft(src, dest, inverse) ⇒ <code>Object</code>
Perform a DFT using a _brute force_ correlation algorithm

It accepts real and complex signals of any size.

It implements the mathematical function as it, without any kind of optimization,
so it's the slowest algorithm possible.

This algorithm is not intended to be used in production. It's main use
(apart from the educational purposes) is to check the output of more
complex algorithms

**Kind**: inner method of <code>[dft](#module_dft)</code>  
**Returns**: <code>Object</code> - the resulted dft as an object `{ real, imag }`  

| Param | Type | Description |
| --- | --- | --- |
| src | <code>Object</code> | The source source buffers. The imaginary part can be null. |
| dest | <code>Object</code> | The destation bufers. The imaginary part can be null. |
| inverse | <code>Boolean</code> | Perform inverse DFT |

<a name="module_dft..forward"></a>

### dft~forward(signal) ⇒ <code>Object</code>
A interface to perform forward DFT on a real signal

**Kind**: inner method of <code>[dft](#module_dft)</code>  
**Returns**: <code>Object</code> - the complex signal (an objects with the form:
`{ real: Array<Number>, im: Array<Number> }`)  

| Param | Type | Description |
| --- | --- | --- |
| signal | <code>Array</code> | The (real) signal array |

<a name="module_dft..inverse"></a>

### dft~inverse(signal) ⇒ <code>Array</code>
An interface to perform an inverse DFT on a complex signal with
a real signal as result

**Kind**: inner method of <code>[dft](#module_dft)</code>  
**Returns**: <code>Array</code> - the resulting real signal  

| Param | Type | Description |
| --- | --- | --- |
| signal | <code>Object</code> | The complex signal as an object with two arrays |

<a name="module_dsp-kit"></a>

## dsp-kit
> Digital Signal Processing

[![npm install dsp-kit](https://nodei.co/npm/dsp-kit.png?mini=true)](https://npmjs.org/package/dsp-kit/)

This module is a facade of the rest of the `dsp-kit` modules. Currently
it exposes:

- `dft`: discrete fourier transform functions
- `fft`: fast fourier transform functions
- `buffer`: create and manipulate buffers

**Example**  
```js
const dsp = require('dsp-kit')
const signal = dft.buffer.generate(1024, (x) => Math.sin(x))
dsp.fft.forward(signal)
```
<a name="module_fft"></a>

## fft
> Fast Fourier Transform

[![npm install dsp-fft](https://nodei.co/npm/dsp-fft.png?mini=true)](https://npmjs.org/package/dsp-fft/)

This module have functions to compute a Fast Fourier transform either
in forward and inverse versions. The code is adapted from the unmaintained
[dsp.js](https://github.com/corbanbrook/dsp.js) library.

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
const fft = require('dsp-fft')
const signal = ...
// invertible fft
fft.inverse(fft.forward(signal)) === signal
```

* [fft](#module_fft)
    * [~forward(signal, output)](#module_fft..forward) ⇒ <code>Object</code>
    * [~inverse(input, output)](#module_fft..inverse) ⇒ <code>Array.&lt;Number&gt;</code>

<a name="module_fft..forward"></a>

### fft~forward(signal, output) ⇒ <code>Object</code>
Perform a forward Fast Fourier Transform over a real signal (represented
as an array of numbers)

The length of the input array must be a power of 2.

The result is a complex signal, represented with an object with two arrays
of same length: `{ real: Array<Number>, imag: Array<Number> }`

This code is adapted from the unmaintained library dsp.js

**Kind**: inner method of <code>[fft](#module_fft)</code>  
**Returns**: <code>Object</code> - the output buffers  

| Param | Type | Description |
| --- | --- | --- |
| signal | <code>Array</code> | The signal to perform the forward fft to. It's length must be a power of 2 |
| output | <code>Object</code> | (Optional) the output buffers. If you want to recycle some arrays for performance reason, you can given them here |

<a name="module_fft..inverse"></a>

### fft~inverse(input, output) ⇒ <code>Array.&lt;Number&gt;</code>
Perform an inverse Fast Fourier Transform over a complex signal

The complex signal is an object with the form `{ real: Array<Number>, imag: Array<Number> }`
with the same length. Also the length must be a power of 2

It returns a real signal (`Array<Number>`) with the same size.

**Kind**: inner method of <code>[fft](#module_fft)</code>  
**Returns**: <code>Array.&lt;Number&gt;</code> - the real signal  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Object</code> | The complex signal |
| output | <code>Array.&lt;Number&gt;</code> | (Optional) the output buffer (if you want to reuse a buffer for performance issues) |

