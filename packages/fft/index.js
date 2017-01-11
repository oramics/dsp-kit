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
 * const fft = new dsp.FFT(1024)
 * dsp.spectrum(fft.forward(signal))
 *
 * @example
 * const FFT = require('dsp-fft').FFT
 * const fft = new FFT(1024)
 * output = fft.forward(signal) // the signal must have 1024 samples length
 * fft.forward(signal, output) // reuse the output buffers
 * fft.inverse(output) // => signal
 *
 * @module fft
 */

// Checks if a number is a power of two
// https://github.com/mikolalysenko/bit-twiddle/blob/master/twiddle.js#L41
function isPow2 (v) { return !(v & (v - 1)) && (!!v) }

/**
* Performs a forward transform on the sample buffer.
* Converts a time domain signal to frequency domain complex signal.
*
* The result is an object with the form `{ real: <Array>, imag: <Array> }`
* representing a complex signal.
*
* @memberof FFT
* @name forward
* @param {Array} buffer The sample buffer. Buffer Length must be power of 2
* @param {Object} output - (Optional) pass a complex signal object to reuse
* buffers (instead of create new if no ones provided)
*
* @returns The frequency domain complex signal object
*/
export function fft (size, b, o) {
  if (arguments.length > 1) return fft(size)(b, o)
  const { cosTable, sinTable, reverseTable } = tables(size)

  return function forward (buffer, output) {
    if (buffer.length !== size) throw Error('Buffer length must be ' + size + ' but was ' + buffer.length)
    if (!output) output = { real: new Float64Array(size), imag: new Float64Array(size) }
    const { real, imag } = output

    let halfSize = 1
    let phaseShiftStepReal, phaseShiftStepImag, currentPhaseShiftReal, currentPhaseShiftImag
    let off, tr, ti, tmpReal, i

    for (i = 0; i < size; i++) {
      real[i] = buffer[reverseTable[i]]
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
* Performs a inverse FFT transformation
* Converts a frequency domain spectra to a time domain signal
*
* @param {Integer} size - the size of the FFT buffer
* @param {Object} signal - A complex signal object
* @param {Object} output - (Optional) a complex signal output buffers
* @returns The signal after the inverse process
*
* @example
* const freqDomain = dsp.fft(1024, timeDomain) // => { real: <Array>, imag: <Array> }
*/
export function ifft (size, c, o) {
  if (arguments.length > 1) return ifft(size)(c, o)

  const cache = tables(size)
  return function inverse (complex, output) {
    const { size, cosTable, sinTable, reverseTable } = cache
    const rs = complex.real
    const is = complex.imag
    if (rs.length !== size) throw Error('Real buffer length must be ' + size + ' but was ' + rs.length)
    if (is.length !== size) throw Error('Imag buffer length must be ' + size + ' but was ' + is.length)
    if (!output) output = { real: new Float64Array(size), imag: new Float64Array(size) }
    const { real, imag } = output

    let i
    for (i = 0; i < size; i++) {
      real[i] = rs[reverseTable[i]]
      imag[i] = -1 * is[reverseTable[i]]
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

    // normalize
    for (i = 0; i < size; i++) {
      real[i] /= size
      imag[i] /= size
    }

    return output
  }
}

function tables (size) {
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
