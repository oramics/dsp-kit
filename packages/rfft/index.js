/**
 * > real split radix FFT algorithm
 *
 * [![npm install dsp-rfft](https://nodei.co/npm/dsp-rfft.png?mini=true)](https://npmjs.org/package/dsp-rfft/)
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * Most of the code was adapted from [dsp.js](https://github.com/corbanbrook/dsp.js)
 * by @corbanbrook and some parts by @Spudd86
 *
 * ### References
 *
 * - Original C implementation at http://www.jjj.de/fxt/
 *
 * @example
 * const dsp = require('dsp-kit')
 * const forward = dsp.rfft(1024)
 * const { real, imag } = forward(signal)
 *
 * @module rfft
 */
import generateReverseTable from './lib/reverse-table'
import forward from './lib/forward'
import inverse from './lib/inverse'
const { sqrt } = Math

/**
 * Performs a forward transform on the sample buffer.
 * Converts a time domain signal to frequency domain spectra.
 *
 * @param {Array} buffer The sample buffer. Buffer Length must be power of 2
 *
 * @returns The frequency spectrum array
 */
export function rfft (bufferSize) {
  var trans = new Float64Array(bufferSize)
  var spectrum = new Float64Array(bufferSize / 2)
  var table = generateReverseTable(bufferSize)

  return function (buffer) {
    forward(bufferSize, buffer, trans, spectrum, table)
    return trans
  }
}

export function irfft (bufferSize) {
  return function (trans, output) {
    return inverse(bufferSize, trans, output)
  }
}

export function rfftSpectrum (x, spectrum) {
  var n = x.length
  var i = n / 2
  var bSi = 2 / n
  var rval, ival, mag
  if (!spectrum) spectrum = new Float64Array(i)
  while (--i) {
    rval = x[i]
    ival = x[n - i - 1]
    mag = bSi * sqrt(rval * rval + ival * ival)
    spectrum[i] = mag
  }
  spectrum[0] = bSi * x[0]
  return spectrum
}
