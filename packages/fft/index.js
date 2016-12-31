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
 * const signal = ...
 * // invertible fft
 * fft.ifft(fft.fft(signal)) === signal
 *
 * @module fft
 */

// the tables are cached for better performance
const TABLES = {}

/**
 * Perform a forward Fast Fourier Transform over a real signal (represented
 * as an array of numbers)
 *
 * The length of the input array must be a power of 2.
 *
 * The result is a complex signal, represented with an object with two arrays
 * of same length: `{ real: Array<Number>, imag: Array<Number> }`
 *
 * This code is adapted from the unmaintained library dsp.js
 *
 * @param {Array} signal - The signal to perform the forward fft to. It's length
 * must be a power of 2
 * @param {Object} output - (Optional) the output buffers. If you want to recycle
 * some arrays for performance reason, you can given them here
 * @return {Object} the output buffers
 */
export function fft (buffer, output = {}) {
  if (!buffer) throw Error('Buffer is required.')
  const size = buffer.length
  const tables = getTables(size)
  output.real = asBuffer(size, output.real)
  output.imag = asBuffer(size, output.imag)
  return fftForward(size, tables, buffer, output)
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
export function ifft (input, buffer = null) {
  if (!input || !input.real || !input.imag) throw Error('The input must contain real and imag parts: ' + input)
  if (input.real.length !== input.imag.length) throw Error('Real and imaginary parts must have same size')
  const size = input.real.length
  const tables = getTables(size)
  return fftInverse(size, tables, input, asBuffer(size, buffer))
}

function asBuffer (size, source) {
  if (!source) return new Float64Array(size)
  else if (source.length !== size) throw Error('Buffer size must be ' + size + ' but was ' + source.length)
  return source
}

function getTables (size) {
  if (!isPow2(size)) throw Error('Size must be a power of 2, but was ' + size)
  if (!TABLES[size]) TABLES[size] = generateTables(size)
  return TABLES[size]
}

function isPow2 (num) {
  const k = Math.floor(Math.log(num) / Math.LN2)
  return Math.pow(2, k) === num
}

function generateTables (size) {
  const revTable = new Uint32Array(size)
  const sinTable = new Float64Array(size)
  const cosTable = new Float64Array(size)

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

/**
 * Performs a forward fast fourier forward transform
 * @private
 */
function fftForward (size, tables, buffer, output) {
  const { cosTable, sinTable, revTable } = tables
  const { real, imag } = output

  let halfSize = 1
  let phaseShiftStepReal,
    phaseShiftStepImag,
    currentPhaseShiftReal,
    currentPhaseShiftImag,
    off,
    tr,
    ti,
    tmpReal

  for (let i = 0; i < size; i++) {
    real[i] = buffer[revTable[i]]
    imag[i] = 0
  }

  while (halfSize < size) {
    phaseShiftStepReal = cosTable[halfSize]
    phaseShiftStepImag = sinTable[halfSize]

    currentPhaseShiftReal = 1
    currentPhaseShiftImag = 0

    for (let fftStep = 0; fftStep < halfSize; fftStep++) {
      let i = fftStep

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

/**
 * Performs an inverse fast fourier forward transform
 * @private
 */
function fftInverse (size, tables, input, output) {
  const { cosTable, sinTable, revTable } = tables
  const real = new Float64Array(size)
  const imag = new Float64Array(size)

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
    output[i] = real[i] / size
  }
  return output
}
