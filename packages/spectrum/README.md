<a name="module_spectrum"></a>

## spectrum
> Transformations of frequency domain information

This module is a collection of functions to work with spectrum of a signal

Before we do anything in the field of spectral modeling, we must be able to
competently compute the spectrum of a signal. The spectrum is given by
the Fourier transform of a signal, but in virtually all cases, the result
from the DFT has to be converted into polar coordinates in order to permit
the desired modifications in an appropriate way as magnitudes and phases

[![npm install dsp-spectrum](https://nodei.co/npm/dsp-spectrum.png?mini=true)](https://npmjs.org/package/dsp-spectrum/)

This module contains function to work with the result of a DFT (or FFT),
the signal in the frequency domain.

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

### References
- Polar notation: http://www.dspguide.com/ch8/8.htm

**Example**  
```js
const dsp = require('dsp-kit')
dsp.spectrum(dft.fft(signal))
```

* [spectrum](#module_spectrum)
    * [.bandWidth(size, sampleRate)](#module_spectrum.bandWidth) ⇒ <code>Number</code>
    * [.bandFrequency(index, size, sampleRate)](#module_spectrum.bandFrequency) ⇒ <code>Number</code>
    * [.polar(freqDomain, output)](#module_spectrum.polar) ⇒ <code>Array</code>
    * [.rectangular()](#module_spectrum.rectangular)
    * [.unwrap(data, output)](#module_spectrum.unwrap) ⇒ <code>Array</code>
    * [.fftshift(source, result)](#module_spectrum.fftshift)

<a name="module_spectrum.bandWidth"></a>

### spectrum.bandWidth(size, sampleRate) ⇒ <code>Number</code>
Get band width of a result of a fourier transformation

It calculates the size of each _bin_ of the spectrum in Hertzs.

**Kind**: static method of <code>[spectrum](#module_spectrum)</code>  
**Returns**: <code>Number</code> - the frequency width of each bin  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>Integer</code> | the DFT (or FFT) buffer size |
| sampleRate | <code>Integer</code> | the sample rate of the original signal |

<a name="module_spectrum.bandFrequency"></a>

### spectrum.bandFrequency(index, size, sampleRate) ⇒ <code>Number</code>
Calculates the center frequency of an DFT band (or bin)

**Kind**: static method of <code>[spectrum](#module_spectrum)</code>  
**Returns**: <code>Number</code> - the center frequency of the DFT bandThe middle frequency in Hz.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Integer</code> | The index of the FFT band. |
| size | <code>Integer</code> | the DFT (or FFT) buffer size |
| sampleRate | <code>Integer</code> | the sample rate of the original signal |

<a name="module_spectrum.polar"></a>

### spectrum.polar(freqDomain, output) ⇒ <code>Array</code>
Convert a signal in frequency domain from rectangular `{ real, imag }` to
polar form `{ magnitudes, phases }`

It returns an object with two arrays: `{ magnitures: <Array>, phases: <Array> }`
If not provided, the magnitudes and phases lengths will be the same as the
real and imaginary parts (you can remove calculations by providing arrays
of `length = (N / 2) + 1` in real signals because the symetric properties)

**Kind**: static method of <code>[spectrum](#module_spectrum)</code>  
**Returns**: <code>Array</code> - the frequency domain data in polar notation: an object
with the form: `{ magnitudes: <Array>, phases: <Array> }`  

| Param | Type | Description |
| --- | --- | --- |
| freqDomain | <code>Object</code> | the frequency domain data in rectangular notation |
| output | <code>Object</code> | (Optional) the buffers to store the data in polar form if you want to reuse buffers for performance reasons |

**Example**  
```js
const dsp = require('dsp-kit')
dsp.polar(dsp.fft(signal)).magnitudes
```
<a name="module_spectrum.rectangular"></a>

### spectrum.rectangular()
Given a spectrum in rectangular form (`{ magnitudes, phases }`) convert
into a spectrum in polar form (`{ real, imag }`).

This is the inverse operation of `polar` function

**Kind**: static method of <code>[spectrum](#module_spectrum)</code>  
**See**: polar  
<a name="module_spectrum.unwrap"></a>

### spectrum.unwrap(data, output) ⇒ <code>Array</code>
Perfroms a phase-unwrapping of a phase data

**Kind**: static method of <code>[spectrum](#module_spectrum)</code>  
**Returns**: <code>Array</code> - the unrapped phase data  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Array</code> | phase data |
| output | <code>Array</code> | (Optional) the output array to store the unrapped phase data (or a new array will be created if not provided) |

**Example**  
```js
// get the spectrum of a 1024 size signal fragment
const spectrum = dsp.spectrum(dsp.fft(1024, signal))
// unwrap the phases
const unwrapped = dsp.unwrap(spectrum.phases)
```
<a name="module_spectrum.fftshift"></a>

### spectrum.fftshift(source, result)
Perform a cyclic shifting (rotation) to set the first sample at the middle
of the buffer (it reorder buffer samples from (0:N-1) to [(N/2:N-1) (0:(N/2-1))])

This is useful to perform zero-phase windowing

This is the same function as mathlab's `fftshift`

**Kind**: static method of <code>[spectrum](#module_spectrum)</code>  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Array</code> | the source buffer |
| result | <code>Array</code> | (Optional) the result buffer |

