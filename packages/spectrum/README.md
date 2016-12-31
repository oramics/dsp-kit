<a name="module_spectrum"></a>

## spectrum
> Transformations of frequency domain information

> In virtually all cases, the result from the DFT has to be converted into polar coordinates in
order to permit the desired modifications in an appropriate way as magnitudes and phases:

[![npm install dsp-spectrum](https://nodei.co/npm/dsp-spectrum.png?mini=true)](https://npmjs.org/package/dsp-spectrum/)

This module contains function to work with the result of a DFT (or FFT),
the signal in the frequency domain.

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
const dsp = require('dsp-kit')
dsp.spectrum(dft.fft(signal))
```

* [spectrum](#module_spectrum)
    * [.bandWidth(size, sampleRate)](#module_spectrum.bandWidth) ⇒ <code>Number</code>
    * [.bandFrequency(index, size, sampleRate)](#module_spectrum.bandFrequency) ⇒ <code>Number</code>
    * [.spectrum(freqDomain, spectrum)](#module_spectrum.spectrum) ⇒ <code>Array</code>

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

<a name="module_spectrum.spectrum"></a>

### spectrum.spectrum(freqDomain, spectrum) ⇒ <code>Array</code>
Calculate the spectrum of a DFT or FFT result (a
signal in the frequency domain)

**Kind**: static method of <code>[spectrum](#module_spectrum)</code>  
**Returns**: <code>Array</code> - the spectrum  

| Param | Type | Description |
| --- | --- | --- |
| freqDomain | <code>Object</code> | the frequency domain data |
| spectrum | <code>Object</code> | (Optional) the buffers to store the spectrum (with the form { `magnitudes`: Array, `phases`: Array }) |

**Example**  
```js
const dsp = require('dsp-kit')
dsp.spectrum(dsp.fft(signal)).magnitudes
```
