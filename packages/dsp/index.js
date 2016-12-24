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
 * const signal = dft.buffer.generate(1024, (x) => Math.sin(x))
 * dsp.fft.forward(signal)
 *
 * @module dsp-kit
 */
module.exports = {
  buffer: require('dsp-buffer'),
  dft: require('dsp-dft'),
  fft: require('dsp-fft')
}
