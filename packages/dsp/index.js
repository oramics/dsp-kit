/**
 * > Digital Signal Processing
 *
 * [![npm install dsp-kit](https://nodei.co/npm/dsp-kit.png?mini=true)](https://npmjs.org/package/dsp-kit/)
 *
 * This module is a facade of some of the `dsp-kit` modules. Currently
 * it exposes:
 *
 * - `array`: create and manipulate arrays
 * - `fft`: fast fourier transform functions
 * - `spectrum`: manipulate the result of the fourier transform
 * - `fftshift`: perform zero phase fft shifting
 * - `noise`: generate noise signals
 * - `window`: several windowing functions
 *
 * @module dsp-kit
 */
export { add, mult, zeros, fill, concat, round, testAll } from 'dsp-array'
export { dft } from 'dsp-dft'
export { fft } from 'dsp-fft'
export { white, pink, brown } from 'dsp-noise'
export { fftshift, ifftshift } from 'dsp-fftshift'
export { bandWidth, bandFrequency, polar, rectangular, unwrap } from 'dsp-spectrum'

// window is exported into it's own namespace
import * as win from 'dsp-window'
export const window = win
