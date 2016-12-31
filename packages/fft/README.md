<a name="module_fft"></a>

## fft
> Fast Fourier Transform

[![npm install dsp-fft](https://nodei.co/npm/dsp-fft.png?mini=true)](https://npmjs.org/package/dsp-fft/)

This module have functions to compute a Fast Fourier transform either
in forward and inverse versions. The code is adapted from the unmaintained
[dsp.js](https://github.com/corbanbrook/dsp.js) library.

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

### References

- https://jakevdp.github.io/blog/2013/08/28/understanding-the-fft/

**Example**  
```js
const dsp = require('dsp-kit')
dsp.spectrum(dsp.fft(signal))
```
**Example**  
```js
const fft = require('dsp-fft')
const signal = ...
// invertible fft
fft.ifft(fft.fft(signal)) === signal
```

* [fft](#module_fft)
    * [.fft(signal, output)](#module_fft.fft) ⇒ <code>Object</code>
    * [.ifft(input, output)](#module_fft.ifft) ⇒ <code>Array.&lt;Number&gt;</code>

<a name="module_fft.fft"></a>

### fft.fft(signal, output) ⇒ <code>Object</code>
Perform a forward Fast Fourier Transform over a real signal (represented
as an array of numbers)

The length of the input array must be a power of 2.

The result is a complex signal, represented with an object with two arrays
of same length: `{ real: Array<Number>, imag: Array<Number> }`

This code is adapted from the unmaintained library dsp.js

**Kind**: static method of <code>[fft](#module_fft)</code>  
**Returns**: <code>Object</code> - the output buffers  

| Param | Type | Description |
| --- | --- | --- |
| signal | <code>Array</code> | The signal to perform the forward fft to. It's length must be a power of 2 |
| output | <code>Object</code> | (Optional) the output buffers. If you want to recycle some arrays for performance reason, you can given them here |

<a name="module_fft.ifft"></a>

### fft.ifft(input, output) ⇒ <code>Array.&lt;Number&gt;</code>
Perform an inverse Fast Fourier Transform over a complex signal

The complex signal is an object with the form `{ real: Array<Number>, imag: Array<Number> }`
with the same length. Also the length must be a power of 2

It returns a real signal (`Array<Number>`) with the same size.

**Kind**: static method of <code>[fft](#module_fft)</code>  
**Returns**: <code>Array.&lt;Number&gt;</code> - the real signal  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Object</code> | The complex signal |
| output | <code>Array.&lt;Number&gt;</code> | (Optional) the output buffer (if you want to reuse a buffer for performance issues) |

