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
    * _static_
        * [.analysis()](#module_phase-vocoder.analysis)
        * [.synthesis()](#module_phase-vocoder.synthesis)
    * _inner_
        * [~phaseCalculation()](#module_phase-vocoder..phaseCalculation)

<a name="module_phase-vocoder.analysis"></a>

### phase-vocoder.analysis()
**Kind**: static method of <code>[phase-vocoder](#module_phase-vocoder)</code>  
<a name="module_phase-vocoder.synthesis"></a>

### phase-vocoder.synthesis()
Synthesize a signal from a collection of frames

**Kind**: static method of <code>[phase-vocoder](#module_phase-vocoder)</code>  
<a name="module_phase-vocoder..phaseCalculation"></a>

### phase-vocoder~phaseCalculation()
Recalculate the phases of each frame when stretched

**Kind**: inner method of <code>[phase-vocoder](#module_phase-vocoder)</code>  
