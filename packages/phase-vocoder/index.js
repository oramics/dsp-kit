/**
 * > Phase-vocoder timestretch algorithm
 *
 * Time stretching means altering the duration of a signal without changing its pitch
 *
 * [![npm install dsp-phase-vocoder](https://nodei.co/npm/dsp-phase-vocoder.png?mini=true)](https://npmjs.org/package/dsp-phase-vocoder/)
 *
 * A short-time Fourier transform (STFT) is performed on a windowed time-domain
 * real signal to obtain a succession of overlapped spectral frames with minimal
 * side-band effects (analysis stage). The time delay at which every spectral
 * frame is picked up from the signal is called the hop size.
 *
 * The timedomain signal may be rebuilt by performing an inverse FastFourier
 * transform on all frames followed by a successive accumulation of all frames
 * (an operation termed overlap-add)
 *
 * Knowing the modulus of every bin is not enough: the phase information is
 * necessary for a perfect recovery of a signal without modification.
 * Furthermore the phase information allows an evaluation of ’instantaneous
 * frequencies’ by the measure of phases between two frames
 *
 * The essential idea is to build two functions (analyze and
 * synthesize) which are intended to work as a tightly coupled set. Between
 * these two function calls, however, any number of manipulations can be
 * performed to obtain the desired effects
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

 *
 * ### References
 *
 * - https://www.spsc.tugraz.at/sites/default/files/Bachelor%20Thesis%20Gruenwald.pdf
 * - http://www.cs.princeton.edu/courses/archive/spr09/cos325/Bernardini.pdf
 *
 * @example
 * var dsp = require('dsp-kit')
 *
 *
 * @module phase-vocoder
 */
import { fft, ifft } from 'dsp-fft'
import { hanning } from 'dsp-window'
import { fftshift, ifftshift } from 'dsp-fftshift'
import { generate, add, zeros, window } from 'dsp-buffer'
import { polar, rectangular, bandFrequency } from 'dsp-spectrum'
const { PI } = Math
const PI2 = 2 * PI

/**
 *
 */
export function analysis (signal, params = {}) {
  const { size = 1024, hop = size / 5 } = params
  const forward = fft(size)
  const numFrames = Math.floor((signal.length - size) / hop)
  // create the window buffer
  const win = generate(size, params.window || hanning())

  // create an array to store all frames
  const frames = new Array(numFrames)

  // create some intermediate buffers (and reuse it for performance)
  const windowed = zeros(size)
  const freqDomain = { real: zeros(size), imag: zeros(size) }
  for (let i = 0; i < numFrames; i++) {
    // 1. place a window into the signal
    window(win, signal, i * hop, windowed) // => windowed
    // 3. Cyclic shift to phase zero windowing
    fftshift(windowed) // => centered
    // 4. Perform the forward fft
    forward(windowed, freqDomain)
    // 5. Convert to polar form in a new frame
    frames[i] = polar(freqDomain)
  }
  return frames
}

/**
 * Synthesize a signal from a collection of frames
 */
export function synthesis (frames, { hop, sampleRate }, output) {
  if (!frames || !frames.length) throw Error('"frames" parameter is required in synthesis')

  const len = frames.length
  const size = frames[0].magnitudes.length
  if (!output) output = zeros((len - 1) * hop + len)
  const inverse = ifft(size)

  // create some intermediate buffers (and reuse it for performance)
  const rectFD = { real: zeros(size), imag: zeros(size) }
  const timeDomain = { real: zeros(size), imag: zeros(size) }
  for (let i = 0; i < len; i++) {
    // 1. Convert freq-domain from polar to rectangular
    rectangular(frames[i], rectFD)
    // 2. Convert from freq-domain in rectangular to time-domain
    let signal = inverse(rectFD, timeDomain).real
    // 3. Unshift the previous cycling shift
    ifftshift(signal)
    // 4. Overlap add
    add(signal, output, output, 0, i * hop, i * hop)
  }
  return output
}

/**
 * Recalculate the phases of each frame when stretched
 */
function phaseCalculation (frames, { size, hop, factor, sampleRate }) {
  const original = hop / sampleRate
  const modified = (hop * factor) / sampleRate

  const numFrames = frames.length
  for (let i = 2; i < numFrames; i++) {
    const prev = frames[i - 1]
    const current = frames[i]
    // for each frame, update each bin
    for (let bin = 0; bin < size; bin++) {
      // calculate the difference between phases
      const deltaPhi = current.phases[bin] - prev.phases[bin]
      // get the current band frequency
      const freq = bandFrequency(bin, size, sampleRate)
      // calculate the frequency deviation with the given hop size
      const deltaFreq = (deltaPhi / original) - freq
      // wrap the deviation
      var wrappedDeltaFreq = ((deltaFreq + PI) % PI2) - PI
      // and calculate the real frequency
      var realFreq = freq + wrappedDeltaFreq
      // update the phase
      current.phases[bin] = prev.phases[bin] + modified * realFreq
    }
  }
}
