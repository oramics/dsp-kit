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

