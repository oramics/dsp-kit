/**
 * > Fast Fourier Transform
 *
 * [![npm install dsp-fft](https://nodei.co/npm/dsp-fft.png?mini=true)](https://npmjs.org/package/dsp-fft/)
 *
 * This module have functions to compute a Fast Fourier transform either
 * in forward and inverse versions. The code is adapted from the unmaintained
 * [dsp.js](https://github.com/corbanbrook/dsp.js) library.
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * ### References
 *
 * - https://jakevdp.github.io/blog/2013/08/28/understanding-the-fft/
 *
 * @example
 * const dsp = require('dsp-kit')
 * dsp.spectrum(dsp.fft(signal))
 *
 * @example
 * const fft = require('dsp-fft')
 * const forward = fft.fft(1024)
 * output = forward(signal) // the signal must have 1024 samples length
 * forward(signal, output) // reuse the output buffers
 * const inverse = fft.ifft(1024)
 * inverse(output) // => signal
 *
 * @module fft
 */

// https://github.com/mikolalysenko/bit-twiddle/blob/master/twiddle.js#L42
function isPow2 (v) { return !(v & (v - 1)) && (!!v) }

/**
 * Create a forward Fast Fourier Transform function
 *
 * This code is adapted from the unmaintained library dsp.js
 *
 * @param {Integer} size - must be a power of 2
 * @return {Function} the forward function.
 */
export function fft (size, FloatArray) {
  if (!isPow2(size)) throw Error('Size must be a power of 2, but was ' + size)
  FloatArray = FloatArray || Float64Array
  const tables = generateTables(size, FloatArray)

  return function forward (buffer, output) {
    output = output || { real: new FloatArray(size), imag: new FloatArray(size) }
    const { cosTable, sinTable, revTable } = tables
    const { real, imag } = output

    let halfSize = 1
    var phaseShiftStepReal,
      phaseShiftStepImag,
      currentPhaseShiftReal,
      currentPhaseShiftImag,
      off,
      tr,
      ti,
      tmpReal,
      i

    for (i = 0; i < size; i++) {
      real[i] = buffer[revTable[i]]
      imag[i] = 0
    }

    while (halfSize < size) {
      phaseShiftStepReal = cosTable[halfSize]
      phaseShiftStepImag = sinTable[halfSize]

      currentPhaseShiftReal = 1
      currentPhaseShiftImag = 0

      for (let fftStep = 0; fftStep < halfSize; fftStep++) {
        i = fftStep

        while (i < size) {
          off = i + halfSize
          tr = (currentPhaseShiftReal * real[off]) - (currentPhaseShiftImag * imag[off])
          ti = (currentPhaseShiftReal * imag[off]) + (currentPhaseShiftImag * real[off])

          real[off] = real[i] - tr
          imag[off] = imag[i] - ti
          real[i] += tr
          imag[i] += ti

          i += halfSize << 1
        }

        tmpReal = currentPhaseShiftReal
        currentPhaseShiftReal = (tmpReal * phaseShiftStepReal) - (currentPhaseShiftImag * phaseShiftStepImag)
        currentPhaseShiftImag = (tmpReal * phaseShiftStepImag) + (currentPhaseShiftImag * phaseShiftStepReal)
      }

      halfSize = halfSize << 1
    }
    return output
  }
}

/**
* Perform an inverse Fast Fourier Transform over a complex signal
*
* The complex signal is an object with the form `{ real: Array<Number>, imag: Array<Number> }`
* with the same length. Also the length must be a power of 2
*
* It returns a real signal (`Array<Number>`) with the same size.
*
* @param {Object} input - The complex signal
* @param {Array<Number>} output - (Optional) the output buffer (if you want
* to reuse a buffer for performance issues)
* @return {Array<Number>} the real signal
*/
export function ifft (size, FloatArray) {
  if (!isPow2(size)) throw Error('Size must be a power of 2, but was ' + size)
  FloatArray = FloatArray || Float64Array
  const tables = generateTables(size, FloatArray)
  const { cosTable, sinTable, revTable } = tables

  return function inverse (input, output) {
    output = output || { real: new FloatArray(size), imag: new FloatArray(size) }
    const { real, imag } = output

    for (let i = 0; i < size; i++) {
      real[i] = input.real[revTable[i]]
      imag[i] = -1 * input.imag[revTable[i]]
    }

    let halfSize = 1
    let phaseShiftStepReal, phaseShiftStepImag, currentPhaseShiftReal,
      currentPhaseShiftImag, off, tr, ti, tmpReal, i

    while (halfSize < size) {
      phaseShiftStepReal = cosTable[halfSize]
      phaseShiftStepImag = sinTable[halfSize]
      currentPhaseShiftReal = 1
      currentPhaseShiftImag = 0

      for (let fftStep = 0; fftStep < halfSize; fftStep++) {
        i = fftStep

        while (i < size) {
          off = i + halfSize
          tr = (currentPhaseShiftReal * real[off]) - (currentPhaseShiftImag * imag[off])
          ti = (currentPhaseShiftReal * imag[off]) + (currentPhaseShiftImag * real[off])

          real[off] = real[i] - tr
          imag[off] = imag[i] - ti
          real[i] += tr
          imag[i] += ti

          i += halfSize << 1
        }

        tmpReal = currentPhaseShiftReal
        currentPhaseShiftReal = (tmpReal * phaseShiftStepReal) - (currentPhaseShiftImag * phaseShiftStepImag)
        currentPhaseShiftImag = (tmpReal * phaseShiftStepImag) + (currentPhaseShiftImag * phaseShiftStepReal)
      }

      halfSize = halfSize << 1
    }

    for (i = 0; i < size; i++) {
      real[i] = real[i] / size
    }
    return output
  }
}

function generateTables (size, FloatArray) {
  const revTable = new Uint32Array(size)
  const sinTable = new FloatArray(size)
  const cosTable = new FloatArray(size)

  let bit = size >> 1
  let limit = 1
  while (limit < size) {
    for (let i = 0; i < limit; i++) {
      revTable[i + limit] = revTable[i] + bit
    }

    limit = limit << 1
    bit = bit >> 1
  }

  for (let i = 0; i < size; i++) {
    sinTable[i] = Math.sin(-Math.PI / i)
    cosTable[i] = Math.cos(-Math.PI / i)
  }
  return { sinTable, cosTable, revTable }
}
