<a name="module_phase-vocoder"></a>

## phase-vocoder
> Phase-vocoder timestretch algorithm

Time stretching means altering the duration of a signal without changing its pitch

[![npm install dsp-phase-vocoder](https://nodei.co/npm/dsp-phase-vocoder.png?mini=true)](https://npmjs.org/package/dsp-phase-vocoder/)

> One representative of a time-discrete signal processing concept is the
digital phase vocoder, which permits to observe and manipulate digital signals
in both time and frequency domain simultaneously

The basic idea of the phase vocoder is to edit a signal both in time and frequency.
It uses a technique called STFT that divides a signal in frames, applies
an appropiate window function and the fourier transform to each frame. At
this point, modification of the spectrum can be made, before transforming
back to the time domain using the inverse fourier transform, and then overlapping and
adding the frames to create the final result.

The frames captures _instantaneous phase_ and _instantaneous frequency_.
Analogous to OLA algorithm, the frames are overlapped, but the phase has to
be changed to follow this stretch.
Since the relationship between phase and frequency and thus time is linear,
the phase advances by the same factor as the time changes.
It is an inherent property of the STFT that the phase values between synthesis
steps are linearly interpolated, amounting the real frequency of the sinusoid belonging to
the respective bin

> if the frequency of a complex exponential and the according bin
of the DFT don’t match exactly, the phase value will evolve over time, referring to the real
frequency (also called instantaneous frequency ) of the captured exponential.
One standard procedure that determines the instantaneous frequency is phase unwrapping
Since the phase values of each frame are implicitly wrapped around ±π, the correct
phase difference can not be estimated by simply subtracting two successive phase values;
an additional step must be incorporated – phase unwrapping

phase unwrapping algorithm for estimating the instantaneous frequency:
two different phases values (for two succesive SFTF instants) are passed
to the synthesis stage. The phase difference contributes to the _real_
frequency of the sinusoid.

There are several drawbacks of the standard time stretching algorithm which have to be
taken into account properly in order to maintain a result of decent quality
Vertical Phase Coherence: If the frequency components change over time, they switch the
channel they are associated with, leading to even more artifacts due to so-called phase
jumps.

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

### References

- https://www.spsc.tugraz.at/sites/default/files/Bachelor%20Thesis%20Gruenwald.pdf

**Example**  
```js
var dsp = require('dsp-kit')
```
