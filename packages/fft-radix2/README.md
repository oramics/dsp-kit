<a name="module_fft-radix2"></a>

## fft-radix2
> Fast fourier transform using radix-2 Cooley-Tukey algorithm

[![npm install dsp-fft-radix2](https://nodei.co/npm/dsp-fft-radix2.png?mini=true)](https://npmjs.org/package/dsp-fft-radix2/)

This module have functions to compute a Fast Fourier transform either
in forward and inverse versions. The code is adapted from the unmaintained
[dsp.js](https://github.com/corbanbrook/dsp.js) library.

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
var fftRadix2 = require('dsp-fft-radix2')
var ft = fftRadix2(1024)
ft.forward(signal)
ft.inverse(signal)
```
<a name="module_fft-radix2.fftRadix2"></a>

### fft-radix2.fftRadix2(size) ⇒ <code>Object.&lt;forward, inverse&gt;</code>
Create a Fast Fourier Transform functions

It returns an object with two funtions: forward and inverse.
Both accepts a signal and (optionally) an output buffer to store the
results (to reduce memory allocation).

**Kind**: static method of <code>[fft-radix2](#module_fft-radix2)</code>  
**Returns**: <code>Object.&lt;forward, inverse&gt;</code> - fourier transform functions  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>Integer</code> | the FFT size |

**Example**  
```js
var fftRadix2 = require('dsp-fft-radix2')
var ft = fftRadix2(1024)
// Given a signal (a Float32Array) ...
output = { real: new Float32Array(1024), imag: new Float32Array(1024) }
ft.forward(signal, output)
// it's invertible
ft.inverse(output).real === signal
```
