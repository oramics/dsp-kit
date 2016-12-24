/**
 * > Discrete Fourier Transformation
 *
 * [![npm install dsp-dft](https://nodei.co/npm/dsp-dft.png?mini=true)](https://npmjs.org/package/dsp-dft/)
 *
 * This module have functions to compute DFT using the correlation algorithm
 * (the simplest and easy to understand, also the slowest)
 *
 * > Various methods are used to obtain DFT for time domain samples including use
 * of Simultaneous Equations using Gaussian elimination, correlation, and using
 * the Fast Fourier Transform algorithm. The first option requires massive work
 * even for a comparitively small number of samples. In actual practice,
 * correlation is the preferred method if the DFT has less than about 32 points.
 *
 * The functions of this module are not intended to be used in production. It
 * has two objectives:
 *
 * - Educational: learn how to implement the DFT correlation algorithm
 * - Test: test more complex algorithms against this to check results
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * @example
 * var dft = require('dsp-dft')
 * dft.forward(signal)
 *
 * @module dft
 */
const { sin, cos, PI } = Math

/**
 * Perform a DFT using a _brute force_ correlation algorithm
 *
 * It accepts real and complex signals of any size.
 *
 * It implements the mathematical function as it, without any kind of optimization,
 * so it's the slowest algorithm possible.
 *
 * This algorithm is not intended to be used in production. It's main use
 * (apart from the educational purposes) is to check the output of more
 * complex algorithms
 *
 * @function
 * @param {Object} src - The source source buffers. The imaginary part can be null.
 * @param {Object} dest - The destation bufers. The imaginary part can be null.
 * @param {Boolean} inverse - Perform inverse DFT
 * @return {Object} the resulted dft as an object `{ real, imag }`
 */
function dft (src, dest, inverse) {
  let real, imag, theta
  const size = src.real.length
  // even if the dft simmetry, we compute the complete size
  for (let k = 0; k < size; k++) {
    real = imag = 0.0
    for (let n = 0; n < size; n++) {
      theta = 2 * PI * k * n / size
      real += src.real[n] * cos(theta) - (src.imag ? src.imag[n] * sin(theta) : 0)
      imag -= src.real[n] * sin(theta) + (src.imag ? src.imag[n] * cos(theta) : 0)
    }
    dest.real[k] = inverse ? real / size : real
    if (dest.imag) dest.imag[k] = inverse ? imag / size : imag
  }
  return dest
}

/**
 * A interface to perform forward DFT on a real signal
 *
 * @param {Array} signal The (real) signal array
 * @return {Object} the complex signal (an objects with the form:
 * `{ real: Array<Number>, im: Array<Number> }`)
 */
function forward (signal) {
  const size = signal.length
  const src = { real: signal }
  const result = { real: new Array(size), imag: new Array(size) }
  return dft(src, result)
}

/**
 * An interface to perform an inverse DFT on a complex signal with
 * a real signal as result
 *
 * @param {Object} signal The complex signal as an object with two arrays
 * @return {Array} the resulting real signal
 */
function inverse (source) {
  return dft(source, { real: new Array(source.real.length) }, true).real
}

module.exports = { dft, forward, inverse }
