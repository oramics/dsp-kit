/**
 * > Windowing functions for digital signal processing
 *
 * [![npm install dsp-window](https://nodei.co/npm/dsp-window.png?mini=true)](https://npmjs.org/package/dsp-window/)
 *
 *
 * All window functions have some extra properties:
 *
 * - rov: recommended overlap
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * ### References
 * https://www.dsprelated.com/freebooks/sasp/Spectrum_Analysis_Windows.html
 *
 * @example
 * const dsp = require('dsp-kit')
 * dsp.generate(1024, dsp.window.hanning())
 *
 * @module window
 */
const { PI, sin, cos } = Math
const PI2 = PI * 2

/**
 * The rectangular window, also sometimes called ‘uniform window’, is given by
 * w = 1, equivalent to using no window at all.
 *
 * Although there are some special applications where the rectangular
 * window is advantageous, it is probably not useful for any of our applications
 *
 * - Abrupt transition from 1 to 0 at the window endpoints
 * - Roll-off is asymptotically -6dB per octave
 * - First side lobe is -13dB relative to main-lobe peak
 */
export const rectangular = () => (n, N) => { return 1 }
rectangular.rov = 0.5
export const none = rectangular

/**
 * The Hanning window (one of a family of ‘raised cosine’ windows) is also known
 * as ‘Hann window’. Do not confuse it with the ‘Hamming’ window.
 *
 * - Smooth transition to zero at window endpoints
 * - Roll-off is asymptotically -18 dB per octave
 * - First side lobe is -31dB relative to main-lobe peak
 */
export const hanning = () => (n, N) => {
  const z = (PI2 * n) / (N - 1)
  return 0.5 * (1 - cos(z))
}

/*
 * The Hamming window is the simplest example of a family of windows that are
 * constructed as a weighted sum of a constant term and some cosine terms. Do
 * not confuse it with the ‘Hanning’ window.
 *
 * - Discontinuous ``slam to zero'' at endpoints
 * - Roll-off is asymptotically -6 dB per octave
 * - Side lobes are closer to ``equal ripple''
 * - First side lobe is 41dB down = 10dB better than Hann
*/
export const hamming = () => (n, N) => {
  const z = (PI2 * n) / (N - 1)
  return 0.54 - 0.46 * cos(z)
}

export const blackman = (a) => (n, N) => {
  const z = (PI2 * n) / (N - 1)
  return (1 - a) / 2 - 0.5 * cos(z) + a * cos(2 * z) / 2
}

/**
 * The Blackman-Harris window is one of a family of window functions given by a
 * sum of cosine terms. By varying the number and coefficients of the terms
 * different characteristics can be optimized.
*/
export const blackmanHarris = () => (n, N) => {
  var z = (PI2 * n) / (N - 1)
  return 0.35875 - 0.48829 * cos(z) + 0.14128 * cos(2 * z) - 0.01168 * cos(3 * z)
}
