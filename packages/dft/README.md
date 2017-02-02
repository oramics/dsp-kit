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

The function of this module is __really slow__, and not intended to be used
in production. It has two goals:

- Educational: learn how to implement the DFT correlation algorithm
- Testing: test more complex algorithms against this to check outputs

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
// using dsp-kit
var dsp = require('dsp-kit')
dsp.dft('forward', signal)
dsp.dft('inverse', complexSignal)
```
**Example**  
```js
// requiring only this module
var dft = require('dsp-dft')
dft.dft('forward', signal)
```
<a name="module_dft.dft"></a>

### dft.dft(direction, signal, output) ⇒ <code>Object</code>
Perform a DFT using a _brute force_ correlation algorithm

It accepts real and complex signals of any size.

It implements the mathematical function as it, without any kind of optimization,
so it's the slowest algorithm possible.

This algorithm is not intended to be used in production. It's main use
(apart from the educational purposes) is to check the output of more
complex algorithms

**Kind**: static method of <code>[dft](#module_dft)</code>  
**Returns**: <code>Object</code> - the DFT output  

| Param | Type | Description |
| --- | --- | --- |
| direction | <code>String</code> | Can be 'forward' or 'inverse' |
| signal | <code>Array</code> &#124; <code>Object</code> | The (real) signal array, or the complex signal object `{ imag, real }` |
| output | <code>Object</code> | (Optional) the pair of buffers `{ imag, real }` to store the output (or new buffers are created if not provided) |

**Example**  
```js
dft('forward', signal)
dft('inverse', { real: ..., imag: .... })
```
