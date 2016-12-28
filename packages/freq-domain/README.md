<a name="module_freq-domain"></a>

## freq-domain
> Transformations of frequency domain information

[![npm install dsp-freq-domain](https://nodei.co/npm/dsp-freq-domain.png?mini=true)](https://npmjs.org/package/dsp-freq-domain/)

This module contains function to work with the result of a DFT (or FFT),
the signal in the frequency domain.

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
const dsp = require('dsp-kit')
dsp.spectrum(dft.fft(signal))
```

* [freq-domain](#module_freq-domain)
    * [.bandWidth(size, sampleRate)](#module_freq-domain.bandWidth) ⇒ <code>Number</code>
    * [.bandFrequency(index, size, sampleRate)](#module_freq-domain.bandFrequency) ⇒ <code>Number</code>
    * [.spectrum(freqDomain, spectrum)](#module_freq-domain.spectrum) ⇒ <code>Array</code>

<a name="module_freq-domain.bandWidth"></a>

### freq-domain.bandWidth(size, sampleRate) ⇒ <code>Number</code>
Get band width of a result of a fourier transformation

It calculates the size of each _bin_ of the spectrum in Hertzs.

**Kind**: static method of <code>[freq-domain](#module_freq-domain)</code>  
**Returns**: <code>Number</code> - the frequency width of each bin  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>Integer</code> | the DFT (or FFT) buffer size |
| sampleRate | <code>Integer</code> | the sample rate of the original signal |

<a name="module_freq-domain.bandFrequency"></a>

### freq-domain.bandFrequency(index, size, sampleRate) ⇒ <code>Number</code>
Calculates the center frequency of an DFT band (or bin)

**Kind**: static method of <code>[freq-domain](#module_freq-domain)</code>  
**Returns**: <code>Number</code> - the center frequency of the DFT bandThe middle frequency in Hz.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>Integer</code> | The index of the FFT band. |
| size | <code>Integer</code> | the DFT (or FFT) buffer size |
| sampleRate | <code>Integer</code> | the sample rate of the original signal |

<a name="module_freq-domain.spectrum"></a>

### freq-domain.spectrum(freqDomain, spectrum) ⇒ <code>Array</code>
Calculate the spectrum (amplitude magnitudes) of a DFT or FFT result (a
signal in the frequency domain)

**Kind**: static method of <code>[freq-domain](#module_freq-domain)</code>  
**Returns**: <code>Array</code> - the spectrum  

| Param | Type | Description |
| --- | --- | --- |
| freqDomain | <code>Object</code> | the frequency domain data |
| spectrum | <code>Array</code> | (Optional) a buffer to store the spectrum (a new one will be created if no one provided) |

