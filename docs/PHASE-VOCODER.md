# Phase Vocoder

This is a summary/remix of several papers. See references.

## 1. Analysis

The first stage of the phase vocoder is the “analysis” of a digital audio
signal. Analysis, here, is a general term, which describes the operations
undergone by the signal in order to reach a final result: A complete frequency
domain representation of the signal over time.

These operations include splitting the signal into smaller segments, smoothing
these segments using a windowing function, centering each segment with respect
to time, taking the Short-time (or Fast) Fourier Transform (STFT or FFT) of each
segment, and storing the magnitude and phase values of each segment.

### 1.1 Windowing

The first step is split the audio signal into segments and apply a window
function to it. To obtain a good audio resolution upon signal resynthesis it is
necessary for the signal to be split into more segments than simply the original
signal length divided by the window size. In order to avoid any distortion, the analysis hop size
must be, at most, half of the window size.

### 1.2 Cyclic shift (aka Zero phase windowing, aka Centering)

An important detail of phase vocoder implementation that can be easily overlooked is the
fact that each windowed segment must undergo a “cyclic shift” (or “circular shift”)
operation before its frequency representation is stored. If this operation is not performed, the DFT would introduce a phase shift.

There are two ways to achieve the cyclic shift, one in the time domain and one
in the frequency domain. In the time domain, each waveform sample must remain
within the window but is to be shifted in time by half of the window size.  The
cyclic shift can be achieved in the frequency domain (ie. after taking the FFT)
by multiplying the FFT result, X(k), by –1 to the power of k

### 1.3 Fast Fourier Transform

The final step towards obtaining the time-frequency representation of an audio signal is
taking the Fast Fourier Transform of each windowed and shifted segment.

This function gives us the “frequency domain” representation of the signal. For our
purposes, we wish to separate the magnitude (absolute value) and phase (angle) values of
the frequency spectrum before we store them.

Once the entire audio signal is processed (the for-loop index n is equal to the
length of the audio signal minus one window length) we have the complete
time-frequency representation of the signal and have thus completed the analysis
phase.

## 2. (Re)Synthesis

Synthesis describes the process involved in creating a new time domain signal
from the frequency domain segments obtained during the analysis stage.

Prior to returning to the time domain, however, there are a number of special
phase calculations that are necessary in order to execute two of the most common
phase vocoder effects: Time stretching and pitch shifting: phase unwrapping and principle argument.

Following the initial phase calculations, the remaining steps involved in resynthesizing
the signal include taking the inverse FFT (IFFT), “unshifting” the new time domain
segment, re-windowing the signal to remove artifacts, and performing “overlap-add” in
order to recombine each segment at its proper location in time.

### 2.1 Target Phase, Phase Unwrapping, and the Principle Argument

The main idea behind each phase operation is the concept of instantaneous frequency.

Mathematically speaking, the instantaneous frequency is the derivative of a signal’s
phase. Practically, the instantaneous frequency of each FFT bin determines which
frequency is contained in that bin (in the same way that the magnitude of each bin
determines its volume).

The calculation of a “target phase” for each bin of each FFT
segment (besides the first) allows us to represent these instantaneous frequencies through
time. Not only does this give us a more in-depth view of our signal’s frequency content, it
also allows us to alter the individual frequencies of each bin.

The target phase can be found by using the phase values of the previous frame (phase vocoder window). But phase windows must first undergo an “unwrapping” stage. This consists of two steps:

1. Finding the difference between the current window’s measured phase and the
previous window’s target phase.
2. Obtaining a “principle argument” vector that brings each phase value within the
range [-π, π].

The first step is a simple subtraction:

```
const phaseDelta = phase(this_frame, bin) - phase(last_frame, bin)
```

Next, the principle argument calculation is done using the following formula:

```
phaseOut = mod(phaseDelta + π, -2π) + π
```

Once this vector is calculated we can get the instantaneous frequency values
with the following:

### 2.2 Inverse FFT, “Unshifting”, and a Second Windowing

The basic idea of the phase vocoder is to edit a signal both in time and frequency.
It uses a technique called STFT that divides a signal in frames, applies
an appropiate window function and the fourier transform to each frame. At
this point, modification of the spectrum can be made, before transforming
back to the time domain using the inverse fourier transform, and then overlapping and
adding the frames to create the final result.

### 3. Time Stretching and Pitch Shifting

Stretching a digital audio signal in time is a relatively simple task. Our phase
vocoder will be able to do this if we simply change the resynthesis hop size to
be different (higher or lower) than the analysis hop size.

The phase processing operations at the beginning of the phase vocoder’s
synthesis stage give us the ability to alter the instantaneous frequencies of
each FFT bin. By setting our target phase to be the values necessary for the
different-length signal we will alter the phase slope, and therefore alter the
frequency content to match the signal length.

Here, rather than dividing by the analysis hop size, we multiply the unwrapped phase
values by the ratio of the resynthesis hop size to the analysis hop size.

One surprisingly robust algorithm for pitch shifting a signal while maintaining its original
length is to “resample” each segment in the frequency domain by simply altering the
length of the FFT window before taking the inverse transform during resynthesis (thus
changing the IFFT resolution). Because the “resampling” step is done during the IFFT we
don’t want to resample again during overlap-add (essentially “un-resampling” the
segment) so we have to change our overlap-add index to be our analysis hop size index (n
in our example) rather than the resynthesis index (m).

Notice that because our new output segment is a different length than the input segment
we will have to create a new cosine window variable that is the appropriate length, for
output windowing. It is also important to note that in this case, unlike previously, our len
variable is going to be different from the original window size, which makes it very
useful for indexing during the overlap-add stage (because we don’t know the correct
length ahead of time).

### 3.2 Transient and Stable Component Separation

Separating audio into stable (constant frequency) and transient (changing
frequency) components is a difficult audio effect to achieve. Using a phase
vocoder, we can attempt to determine which frequency bins of each FFT segment
are stable through time and which are transient by looking at the differences
between phase bins through time.

We are already calculating these difference vectors, so we simply need to
determine whether the value in each bin of the difference vector is within a
stable “threshold” or not. If it is outside the threshold we can assume that the
instantaneous frequency is changing very rapidly and is therefore not stable
(and vice versa).

### 3.3 Robotization and Whisperization

Robotization and whisperization are simple effects to implement. Both effects take the
phase vector of each FFT segment and replace all the values with different values.

In the case of robotization, all phase values are simply set to zero. This means that the
frequency content of the output signal is flat and is actually determined by the window
size itself (therefore changing the window size will give a different robotization
frequency). By effectively removing any harmonic information, we make an audio signal (especially
a vocal signal) sound “robotic”.

For whisperization, we set all of the phase values to random values within the range [0
2π]. This completely removes all useful frequency information, so that only the
magnitude values remain. Because of this, we still hear the amplitude envelope of the
waveform, but there are no distinct pitches so it sounds like whispers.

### 3.4 Wah-Wah Filter

Because the phase vocoder obtains the frequency domain representation of an
entire input signal, we have the ability to do simplified convolution of the
signal. Recall that convolution in the time domain is equivalent to
multiplication in the frequency domain – a much simpler operation – so any
convolution-based filter can be simplified by using a phase vocoder

### 3.5 Denoising and Audio Compression

Because noisy parts of signals will usually have low frequency magnitudes, we
can remove them by setting a threshold value and zeroing all FFT bins with
magnitude values below this threshold.

One side effect of removing this frequency content is that we are actually
making the output signal smaller. Expanding on this idea, we can start to think
of the phase vocoder as an audio compression tool. Perceptual coding theory
tells us that some frequency content, in the presence of louder frequencies in
the same range, is masked to the human ear. By removing this unperceived
frequency information we can create smaller audio signals without losing sound
quality. By modifying the phase vocoder to only retain the strongest N frequency
bins (based on magnitude) of each segment, we can build a rudimentary audio
compressor.

## 4. More about windowing

(http://www.cs.princeton.edu/courses/archive/spr09/cos325/Bernardini.pdf)

- the sum of hamming windows presents a discontinuity on both ends; these discontinuities may have a small impact on long signals but can be quite present on short ones;
- the blackman window modulates the signal when used with a hr ≥ 1/2 where hr is the hop/window size ratio
- the hamming and hanning windows modulate the signal when used with a hr > 1/2
- all windows require (as expected) a variable rescaling factor according to the
hop/window ratio; in this respect, the hanning and hamming windows seem to
behave more linearly, turning up to something like R = 1/hr where R is the
rescaling factor.

In an STFT, it is important to ensure that the periodicity of the framing window
is correct: the periodicity of the framing window should be equal to the
declared argument of its function definition. A hanning window, for example,
must begin by a zero-valued sample and end by a non-zero valued sample

---

The frames captures _instantaneous phase_ and _instantaneous frequency_.
Analogous to OLA algorithm, the frames are overlapped, but the phase has to
be changed to follow this stretch.
Since the relationship between phase and frequency and thus time is linear,
the phase advances by the same factor as the time changes.
It is an inherent property of the STFT that the phase values between synthesis
steps are linearly interpolated, amounting the real frequency of the sinusoid belonging to
the respective bin

if the frequency of a complex exponential and the according bin
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

### References

- https://www.spsc.tugraz.at/sites/default/files/Bachelor%20Thesis%20Gruenwald.pdf
- http://web.uvic.ca/~mpierce/elec484/final_project/Report/FinalReport.pdf
- http://www.cs.princeton.edu/courses/archive/spr09/cos325/Bernardini.pdf
