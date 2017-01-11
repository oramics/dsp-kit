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
const FFT = require('dsp-fft').FFT
const fft = new FFT(1024)
output = fft.forward(signal) // the signal must have 1024 samples length
fft.forward(signal, output) // reuse the output buffers
fft.inverse(output) // => signal
```
<a name="module_fft.FFT"></a>

### fft.FFT
FFT is a class for calculating the Discrete Fourier Transform of a signal
with the Fast Fourier Transform algorithm.

**Kind**: static class of <code>[fft](#module_fft)</code>  
