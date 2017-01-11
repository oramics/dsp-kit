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
 * - Testing: test more complex algorithms against this to check results
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * @example
 * // using dsp-kit
 * var dsp = require('dsp-kit')
 * dsp.dft(signal)
 *
 * @example
 * // requiring only this module
 * var dft = require('dsp-dft')
 * dft.dft(signal)
 *
 * @module dft
 */
const { sin, cos, PI } = Math

/**
 * Perform the actual DFT correlation
 * @private
 * @param {Object} src - The source source buffers. The imaginary part can be null.
 * @param {Object} dest - The destation bufers. Both `real` and `imag` buffers must
 * be present.
 * @param {Boolean} inverse - Perform inverse DFT
 * @return {Object} the resulted dft as an object `{ real, imag }`
 */
function perform (signal, result, inverse) {
  let r, i, theta
  const { real, imag } = signal
  // we take the size of the result. It can be smaller than the source
  const size = result.real.length
  for (let k = 0; k < size; k++) {
    r = i = 0.0
    for (let n = 0; n < size; n++) {
      theta = 2 * PI * k * n / size
      r += real[n] * cos(theta) - (imag ? imag[n] * sin(theta) : 0)
      i -= real[n] * sin(theta) + (imag ? imag[n] * cos(theta) : 0)
    }
    result.real[k] = inverse ? r / size : r
    result.imag[k] = inverse ? i / size : i
  }
}

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
 * @param {Array|Object} signal - The (real) signal array, or the complex signal
 * object `{ imag, real }`
 * @param {Object} result - (Optional) the pair of buffers `{ imag, real }` to
 * store the result (or new buffers are created if not provided)
 * @return {Object} the DFT result
 */
export function dft (signal, result) {
  signal = toComplex(signal)
  result = toComplex(result, signal.real.length)
  perform(signal, result)
  return result
}

/**
 * Perform a __inverse__ DFT using a _brute force_ correlation algorithm
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
 * @param {Object} signal The complex signal as an object with two arrays
 * @param {Array|Object} result - (Optional) the result buffer(s). If is an array
 * or is not provided
 * @return {Object} the
 */
export function idft (signal, result) {
  signal = toComplex(signal)
  result = toComplex(result, signal.real.length)
  perform(signal, result, true)
  return result
}

/**
 * Given a signal, create a complex signal.
 * @private
 */
function toComplex (signal, size) {
  if (!signal) {
    if (!size) throw Error('A signal is required')
    return { real: new Array(size), imag: new Array(size) }
  } else if (signal.length) {
    return { real: signal }
  } else if (!signal.real || !signal.imag || signal.real.length !== signal.imag.length) {
    throw Error('Not valid signal: ' + signal + ' (must be an object { real: Array, imag: Array })')
  } else {
    return signal
  }
}
