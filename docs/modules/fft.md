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
const fft = new dsp.FFT(1024)
dsp.spectrum(fft.forward(signal))
```
**Example**  
```js
const FFT = require('dsp-fft')
const forward = FFT.fft(1024)
const freqDomainSignal = forward(timeDomainSignal)

const inverse = FFT.ifft(1024)
const timeDomainSignal = inverse(freqDomainSignal)

// the forward and inverse transformations are reversible
inverse(forward(signal)) // => signal
```
<a name="module_fft.ifft"></a>

### fft.ifft(size, signal, output) ⇒
Performs a inverse FFT transformation
Converts a frequency domain spectra to a time domain signal

**Kind**: static method of <code>[fft](#module_fft)</code>  
**Returns**: The signal after the inverse process  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>Integer</code> | the size of the FFT buffer |
| signal | <code>Object</code> | A complex signal object |
| output | <code>Object</code> | (Optional) a complex signal output buffers |

**Example**  
```js
// simple usage:
const FFT = require('dsp-fft')
FFT.ifft(1024, complexSignal)
```
**Example**  
```js
// performant usage:
const inverse = FFT.ifft(1024)
inverse(complexSignal1)
inverse(complexSignal2)
```
