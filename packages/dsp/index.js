/**
 * > Digital Signal Processing
 *
 * [![npm install dsp-kit](https://nodei.co/npm/dsp-kit.png?mini=true)](https://npmjs.org/package/dsp-kit/)
 *
 * This module is a facade of the rest of the `dsp-kit` modules. Currently
 * it exposes:
 *
 * - `dft`: discrete fourier transform functions
 * - `fft`: fast fourier transform functions
 * - `buffer`: create and manipulate buffers
 *
 * @example
 * const dsp = require('dsp-kit')
 * const signal = dsp.generate(1024, (x) => Math.sin(x))
 * dsp.fft.forward(signal)
 *
 * @example
 * // apply a window to a new buffer
 * const signal = dsp.generate(1024, (x) => Math.sin(x))
 * const windowed = dsp.map(signal, dsp.window.hanning())
 * // apply a window to the same buffer
 * dsp.map(signal, dsp.window.hanning(), signal)
 *
 *
 * @module dsp-kit
 */
export { zeros, generate, map, copy } from 'dsp-buffer'
export { dft, idft } from 'dsp-dft'
export { fft, ifft } from 'dsp-fft'

// window is exported into it's own namespace
import win from 'dsp-window'
export const window = win
