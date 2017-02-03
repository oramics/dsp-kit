/**
 * > Fast fourier transform using radix-2 Cooley-Tukey algorithm
 *
 * [![npm install dsp-fft-radix2](https://nodei.co/npm/dsp-fft-radix2.png?mini=true)](https://npmjs.org/package/dsp-fft-radix2/)
 *
 * This module have functions to compute a Fast Fourier transform either
 * in forward and inverse versions. The code is adapted from the unmaintained
 * [dsp.js](https://github.com/corbanbrook/dsp.js) library.
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * @example
 * var fftRadix2 = require('dsp-fft-radix2')
 * var ft = fftRadix2(1024)
 * ft.forward(signal)
 * ft.inverse(signal)
 *
 * @module fft-radix2
 */
// Checks if a number is a power of two
// https://github.com/mikolalysenko/bit-twiddle/blob/master/twiddle.js#L41
function isPow2 (v) { return !(v & (v - 1)) && (!!v) }

/**
 * Create a Fast Fourier Transform functions
 *
 * It returns an object with two funtions: forward and inverse.
 * Both accepts a signal and (optionally) an output buffer to store the
 * results (to reduce memory allocation).
 *
 * @param {Integer} size - the FFT size
 * @return {Object<forward, inverse>} fourier transform functions
 *
 * @example
 * var fftRadix2 = require('dsp-fft-radix2')
 * var ft = fftRadix2(1024)
 * // Given a signal (a Float32Array) ...
 * output = { real: new Float32Array(1024), imag: new Float32Array(1024) }
 * ft.forward(signal, output)
 * // it's invertible
 * ft.inverse(output).real === signal
 */
export function fftRadix2 (size) {
  var cached = tables(size)
  return {
    forward: (input, output) => process(1, cached, input, output),
    inverse: (input, output) => process(-1, cached, input, output)
  }
}

function process (dir, tables, input, output) {
  const { size, cosTable, sinTable, reverseTable } = tables

  if (!input.real) input = { real: input, imag: new Float32Array(size) }
  const rs = input.real
  const is = input.imag
  if (rs.length !== size) throw Error('Real buffer length must be ' + size + ' but was ' + rs.length)
  if (is.length !== size) throw Error('Imag buffer length must be ' + size + ' but was ' + is.length)

  if (!output) output = { real: new Float32Array(size), imag: new Float32Array(size) }
  const { real, imag } = output

  let i
  for (i = 0; i < size; i++) {
    real[i] = rs[reverseTable[i]]
    imag[i] = dir * is[reverseTable[i]]
  }

  let phaseShiftStepReal, phaseShiftStepImag, currentPhaseShiftReal, currentPhaseShiftImag
  let off, tr, ti, tmpReal
  let halfSize = 1
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

  if (dir === -1) {
    // normalize
    for (i = 0; i < size; i++) {
      real[i] /= size
      imag[i] /= size
    }
  }

  return output
}

export function tables (size) {
  if (!isPow2(size)) throw Error('Size must be a power of 2, and was: ' + size)
  let reverseTable = new Uint32Array(size)
  let sinTable = new Float64Array(size)
  let cosTable = new Float64Array(size)
  let limit = 1
  let bit = size >> 1

  while (limit < size) {
    for (let i = 0; i < limit; i++) {
      reverseTable[i + limit] = reverseTable[i] + bit
    }
    limit = limit << 1
    bit = bit >> 1
  }

  for (let i = 0; i < size; i++) {
    sinTable[i] = Math.sin(-Math.PI / i)
    cosTable[i] = Math.cos(-Math.PI / i)
  }
  return { size, reverseTable, sinTable, cosTable }
}
