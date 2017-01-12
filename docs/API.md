<a name="module_buffer"></a>

## buffer
> Array buffer manipulation functions

[![npm install dsp-buffer](https://nodei.co/npm/dsp-buffer.png?mini=true)](https://npmjs.org/package/dsp-buffer/)

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
var dsp = require('dsp-kit')
dsp.generate(...)
```
**Example**  
```js
// require only this module
var buffer = require('dsp-buffer')
const sine = buffer.generate(1024, (x) => Math.sin(0.5 * x))
```

* [buffer](#module_buffer)
    * [.from](#module_buffer.from)
    * [.add](#module_buffer.add) ⇒ <code>Array</code>
    * [.mult](#module_buffer.mult)
    * [.zeros(size)](#module_buffer.zeros) ⇒ <code>Array</code>
    * [.generate(buffer, fn)](#module_buffer.generate)
    * [.concat(bufferA, bufferB, destination)](#module_buffer.concat) ⇒ <code>Array</code>
    * [.combinator(fn)](#module_buffer.combinator) ⇒ <code>function</code>
    * [.copy(source, destination)](#module_buffer.copy) ⇒ <code>Array</code>
    * [.map(fn, source, destination)](#module_buffer.map) ⇒ <code>Array</code>
    * [.round(array, decimals)](#module_buffer.round)

<a name="module_buffer.from"></a>

### buffer.from
Create a buffer from an array (an alias for Float64Array.from)

**Kind**: static constant of <code>[buffer](#module_buffer)</code>  
<a name="module_buffer.add"></a>

### buffer.add ⇒ <code>Array</code>
Add two buffers.

**Kind**: static constant of <code>[buffer](#module_buffer)</code>  
**Returns**: <code>Array</code> - the destination buffer (the provided or a new one if no one provided)  

| Param | Type | Description |
| --- | --- | --- |
| bufferA | <code>Array</code> | the source buffer |
| bufferB | <code>Array</code> | the B buffer |
| destination | <code>Array</code> &#124; <code>Integer</code> | (Optional) the destination buffer or the number of samples to add. If not present, a new buffer is created. |
| offsetA | <code>Integer</code> | (Optional) the start offset of the A buffer |
| offsetA | <code>Integer</code> | (Optional) the start offset of the B buffer |
| offsetDestination | <code>Integer</code> | (Optional) the start offset of the destination buffer |

**Example**  
```js
// add to buffers into a new one
const result = buffer.add(bufferA, bufferB)
// add to buffers into a third
buffer.add(bufferA, bufferB, dest)
```
<a name="module_buffer.mult"></a>

### buffer.mult
Multiply two buffers.

**Kind**: static constant of <code>[buffer](#module_buffer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| bufferA | <code>Array</code> | the source buffer |
| bufferB | <code>Array</code> | the B buffer |
| destination | <code>Array</code> &#124; <code>Integer</code> | (Optional) the destination buffer or the number of samples to add. If not present, a new buffer is created. |
| offsetA | <code>Integer</code> | the start offset of the A buffer |
| offsetA | <code>Integer</code> | the start offset of the B buffer |
| offsetDestination | <code>Integer</code> | the start offset of the destination buffer |

**Example**  
```js
// add to buffers into a new one
const result = buffer.add(bufferA, bufferB)
```
**Example**  
```js
// add to buffers into a third
buffer.add(bufferA, bufferB, dest)
```
<a name="module_buffer.zeros"></a>

### buffer.zeros(size) ⇒ <code>Array</code>
Create a buffer (a Float64Array) filled with zeros

**Kind**: static method of <code>[buffer](#module_buffer)</code>  
**Returns**: <code>Array</code> - the buffer  

| Param | Type |
| --- | --- |
| size | <code>Integer</code> | 

<a name="module_buffer.generate"></a>

### buffer.generate(buffer, fn)
Generate a buffer using a function

**Kind**: static method of <code>[buffer](#module_buffer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Number</code> &#124; <code>Array</code> | The buffer (to reuse) or a buffer length to create one |
| fn | <code>function</code> | the generator function. It receives the following parameters: - n: a number from [0..1] - index: a number from [0...length] - length: the buffer length |

**Example**  
```js
const sine = buffer.generate(10, (x) => Math.sin(x))
```
<a name="module_buffer.concat"></a>

### buffer.concat(bufferA, bufferB, destination) ⇒ <code>Array</code>
Concatenate two buffers

**Kind**: static method of <code>[buffer](#module_buffer)</code>  
**Returns**: <code>Array</code> - destination  

| Param | Type | Description |
| --- | --- | --- |
| bufferA | <code>Array</code> |  |
| bufferB | <code>Array</code> |  |
| destination | <code>Array</code> | (Optional) If provided, the length must be _at least_ the sum of the bufferA and bufferB length plus the destOffset |

**Example**  
```js
// concat into a new buffer
const bufferC = buffer.concat(bufferA, bufferB)
```
<a name="module_buffer.combinator"></a>

### buffer.combinator(fn) ⇒ <code>function</code>
Create a buffer combinator. Given a function, returns a function to combine
two buffers using that function.

**Kind**: static method of <code>[buffer](#module_buffer)</code>  
**Returns**: <code>function</code> - the combinator function  
**See**: copyTo, add, mult  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | the function used to combine the buffers. It accepts two parameters: the numbers of each buffer to combine |

<a name="module_buffer.copy"></a>

### buffer.copy(source, destination) ⇒ <code>Array</code>
Copy a buffer

**Kind**: static method of <code>[buffer](#module_buffer)</code>  
**Returns**: <code>Array</code> - destination  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Array</code> |  |
| destination | <code>Array</code> | (Optional) |

<a name="module_buffer.map"></a>

### buffer.map(fn, source, destination) ⇒ <code>Array</code>
Map a buffer with a function

This function can be partially applied (see examples)

**Kind**: static method of <code>[buffer](#module_buffer)</code>  
**Returns**: <code>Array</code> - the mapped buffer  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | the mapping function |
| source | <code>Array</code> | the source |
| destination | <code>Array</code> | (Optional) if no one is provided, a new buffer is created |

**Example**  
```js
const sine = buffer.generate(1024, (x) => Math.sin(x))
buffer.map((x) => x * 2, sine) // => a buffer with the gain doubled
// partially applied
const doubleGain = buffer.map((x) => x * 2)
doubleGain(buffer) // => a buffer with the gain doubled
```
<a name="module_buffer.round"></a>

### buffer.round(array, decimals)
Round the values of an array to a number of decimals.

There are small differences of precission between algorithms. This helper
function allows to compare them discarding the precission errors.

**Kind**: static method of <code>[buffer](#module_buffer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> |  |
| decimals | <code>Integer</code> | (Optional) the number of decimals (8 by default) |

<a name="module_delay"></a>

## delay
> Delay a signal

[![npm install dsp-delay](https://nodei.co/npm/dsp-delay.png?mini=true)](https://npmjs.org/package/dsp-delay/)

The code of this module is adapted from the unmaintained
[dsp.js](https://github.com/corbanbrook/dsp.js) by Corban Brook
which in turn is adapted from
http://code.almeros.com/code-examples/delay-firefox-audio-api by Almer Thie

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

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
- Testing: test more complex algorithms against this to check results

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
// using dsp-kit
var dsp = require('dsp-kit')
dsp.dft(signal)
```
**Example**  
```js
// requiring only this module
var dft = require('dsp-dft')
dft.dft(signal)
```

* [dft](#module_dft)
    * [.dft(signal, result)](#module_dft.dft) ⇒ <code>Object</code>
    * [.idft(signal, result)](#module_dft.idft) ⇒ <code>Object</code>

<a name="module_dft.dft"></a>

### dft.dft(signal, result) ⇒ <code>Object</code>
Perform a DFT using a _brute force_ correlation algorithm

It accepts real and complex signals of any size.

It implements the mathematical function as it, without any kind of optimization,
so it's the slowest algorithm possible.

This algorithm is not intended to be used in production. It's main use
(apart from the educational purposes) is to check the output of more
complex algorithms

**Kind**: static method of <code>[dft](#module_dft)</code>  
**Returns**: <code>Object</code> - the DFT result  

| Param | Type | Description |
| --- | --- | --- |
| signal | <code>Array</code> &#124; <code>Object</code> | The (real) signal array, or the complex signal object `{ imag, real }` |
| result | <code>Object</code> | (Optional) the pair of buffers `{ imag, real }` to store the result (or new buffers are created if not provided) |

<a name="module_dft.idft"></a>

### dft.idft(signal, result) ⇒ <code>Object</code>
Perform a __inverse__ DFT using a _brute force_ correlation algorithm

It accepts real and complex signals of any size.

It implements the mathematical function as it, without any kind of optimization,
so it's the slowest algorithm possible.

This algorithm is not intended to be used in production. It's main use
(apart from the educational purposes) is to check the output of more
complex algorithms

**Kind**: static method of <code>[dft](#module_dft)</code>  
**Returns**: <code>Object</code> - the  

| Param | Type | Description |
| --- | --- | --- |
| signal | <code>Object</code> | The complex signal as an object with two arrays |
| result | <code>Array</code> &#124; <code>Object</code> | (Optional) the result buffer(s). If is an array or is not provided |

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
const signal = dsp.generate(1024, (x) => Math.sin(x))
dsp.fft.forward(signal)
```
**Example**  
```js
// apply a window to a new buffer
const signal = dsp.generate(1024, (x) => Math.sin(x))
const windowed = dsp.map(signal, dsp.window.hanning())
// apply a window to the same buffer
dsp.map(signal, dsp.window.hanning(), signal)
```
<a name="ola"></a>

## ola
> timestretch audio in the browser

It bridges the web audio api (audio buffers, audio workers) with the
timestretch functions of dsp-kit

Will be published as an independent module

**Kind**: global variable  
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
<a name="module_ola"></a>

## ola
> Add and overlap timestretch algorithm

The overlap and add is the simplest, cheaper (in terms of computation) and
less quality timestretch algorithm. It changes the length of a buffer without
changing it's pitch.

[![npm install dsp-ola](https://nodei.co/npm/dsp-ola.png?mini=true)](https://npmjs.org/package/dsp-ola/)

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
var ola = require('dsp-ola')
const stretch = ola.overlapAdd({ size: 1024 })
const halfSize = stretch(0.5, audioBuffer)
```
**Example**  
```js
var dsp = require('dsp-kit')
```
<a name="module_ola.overlapAdd"></a>

### ola.overlapAdd(options) ⇒ <code>function</code>
Create a timestretch function using an overlap and add algorithm

**Kind**: static method of <code>[ola](#module_ola)</code>  
**Returns**: <code>function</code> - the timestretch function  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

**Example**  
```js
const stretch = ola.overlapAdd()
stretch(0.5, audio) // => a new audio buffer half of the length
```
<a name="module_oscillator"></a>

## oscillator
> Wavetable oscillators

[![npm install dsp-oscillator](https://nodei.co/npm/dsp-oscillator.png?mini=true)](https://npmjs.org/package/dsp-oscillator/)

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

### References

- http://www.earlevel.com/main/2012/05/09/a-wavetable-oscillator%E2%80%94part-3/
- https://github.com/OpenDAWN/wavetable

**Example**  
```js
const oscillator = require('dsp-oscillator')
```
<a name="module_phase-vocoder"></a>

## phase-vocoder
> Phase-vocoder timestretch algorithm

Time stretching means altering the duration of a signal without changing its pitch

[![npm install dsp-phase-vocoder](https://nodei.co/npm/dsp-phase-vocoder.png?mini=true)](https://npmjs.org/package/dsp-phase-vocoder/)

A short-time Fourier transform (STFT) is performed on a windowed time-domain
real signal to obtain a succession of overlapped spectral frames with minimal
side-band effects (analysis stage). The time delay at which every spectral
frame is picked up from the signal is called the hop size.

The timedomain signal may be rebuilt by performing an inverse FastFourier
transform on all frames followed by a successive accumulation of all frames
(an operation termed overlap-add)

Knowing the modulus of every bin is not enough: the phase information is
necessary for a perfect recovery of a signal without modification.
Furthermore the phase information allows an evaluation of ’instantaneous
frequencies’ by the measure of phases between two frames

The essential idea is to build two functions (analyze and
synthesize) which are intended to work as a tightly coupled set. Between
these two function calls, however, any number of manipulations can be
performed to obtain the desired effects

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

### References

- https://www.spsc.tugraz.at/sites/default/files/Bachelor%20Thesis%20Gruenwald.pdf
- http://www.cs.princeton.edu/courses/archive/spr09/cos325/Bernardini.pdf

**Example**  
```js
var dsp = require('dsp-kit')
```

* [phase-vocoder](#module_phase-vocoder)
    * [.analysis()](#module_phase-vocoder.analysis)
    * [.synthesis()](#module_phase-vocoder.synthesis)

<a name="module_phase-vocoder.analysis"></a>

### phase-vocoder.analysis()
**Kind**: static method of <code>[phase-vocoder](#module_phase-vocoder)</code>  
<a name="module_phase-vocoder.synthesis"></a>

### phase-vocoder.synthesis()
Synthesize a signal from a collection of frames

**Kind**: static method of <code>[phase-vocoder](#module_phase-vocoder)</code>  
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

<a name="module_window"></a>

## window
> Windowing functions for digital signal processing

[![npm install dsp-window](https://nodei.co/npm/dsp-window.png?mini=true)](https://npmjs.org/package/dsp-window/)


All window functions have some extra properties:

- rov: recommended overlap

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

### References
https://www.dsprelated.com/freebooks/sasp/Spectrum_Analysis_Windows.html

**Example**  
```js
const dsp = require('dsp-kit')
dsp.generate(1024, dsp.window.hanning())
```

* [window](#module_window)
    * [.rectangular](#module_window.rectangular)
    * [.hanning](#module_window.hanning)
    * [.blackmanHarris](#module_window.blackmanHarris)

<a name="module_window.rectangular"></a>

### window.rectangular
The rectangular window, also sometimes called ‘uniform window’, is given by
w = 1, equivalent to using no window at all.

Although there are some special applications where the rectangular
window is advantageous, it is probably not useful for any of our applications

- Abrupt transition from 1 to 0 at the window endpoints
- Roll-off is asymptotically -6dB per octave
- First side lobe is -13dB relative to main-lobe peak

**Kind**: static constant of <code>[window](#module_window)</code>  
<a name="module_window.hanning"></a>

### window.hanning
The Hanning window (one of a family of ‘raised cosine’ windows) is also known
as ‘Hann window’. Do not confuse it with the ‘Hamming’ window.

- Smooth transition to zero at window endpoints
- Roll-off is asymptotically -18 dB per octave
- First side lobe is -31dB relative to main-lobe peak

**Kind**: static constant of <code>[window](#module_window)</code>  
<a name="module_window.blackmanHarris"></a>

### window.blackmanHarris
The Blackman-Harris window is one of a family of window functions given by a
sum of cosine terms. By varying the number and coefficients of the terms
different characteristics can be optimized.

**Kind**: static constant of <code>[window](#module_window)</code>  
