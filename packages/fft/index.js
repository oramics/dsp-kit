/**
 * This is the default (and fastest) fourier implementation. An alias of `fft-radix2`
 *
 * This module is not published into npm (mostly because the name is taken)
 * You can require one of the existing implementations: `fft-radix2`
 *
 * `dsp-kit` contains several fourier transform algorithms. This is the one
 * you can use by default.
 *
 * @name fft
 * @function
 * @memberof module:dsp
 */
export { fftRadix2 as fft } from 'dsp-fft-radix2'
