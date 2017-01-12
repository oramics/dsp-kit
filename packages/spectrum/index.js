/**
 * > Transformations of frequency domain information
 *
 * This module is a collection of functions to work with spectrum of a signal
 *
 * Before we do anything in the field of spectral modeling, we must be able to
 * competently compute the spectrum of a signal. The spectrum is given by
 * the Fourier transform of a signal, but in virtually all cases, the result
 * from the DFT has to be converted into polar coordinates in order to permit
 * the desired modifications in an appropriate way as magnitudes and phases
 *
 * [![npm install dsp-spectrum](https://nodei.co/npm/dsp-spectrum.png?mini=true)](https://npmjs.org/package/dsp-spectrum/)
 *
 * This module contains function to work with the result of a DFT (or FFT),
 * the signal in the frequency domain.
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * ### References
 * - Polar notation: http://www.dspguide.com/ch8/8.htm
 *
 * @example
 * const dsp = require('dsp-kit')
 * dsp.spectrum(dft.fft(signal))
 *
 * @module spectrum
 */
const { sqrt, PI, cos, sin, atan2 } = Math
const PI2 = 2 * PI

// get a number modulo PI2 (taking care of negatives)
function phmod (ph) { return ph < 0 ? PI2 + (ph % PI2) : ph % PI2 }
// create a zero filled buffer
function zeros (l) { return new Float64Array(l) }

/**
 * Get band width of a result of a fourier transformation
 *
 * It calculates the size of each _bin_ of the spectrum in Hertzs.
 * @param {Integer} size - the DFT (or FFT) buffer size
 * @param {Integer} sampleRate - the sample rate of the original signal
 * @return {Number} the frequency width of each bin
 */
export function bandWidth (size, sampleRate) {
  return 2 / size * sampleRate / 2
}

/**
 * Calculates the center frequency of an DFT band (or bin)
 *
 * @param {Integer} index The index of the FFT band.
 * @param {Integer} size - the DFT (or FFT) buffer size
 * @param {Integer} sampleRate - the sample rate of the original signal
 * @return {Number} the center frequency of the DFT band
 *
 * @returns The middle frequency in Hz.
 */
export function bandFrequency (index, size, sampleRate) {
  const width = bandWidth(size, sampleRate)
  return width * index + width / 2
}

/**
 * Convert a signal in frequency domain from rectangular `{ real, imag }` to
 * polar form `{ magnitudes, phases }`
 *
 * It returns an object with two arrays: `{ magnitures: <Array>, phases: <Array> }`
 * If not provided, the magnitudes and phases lengths will be the same as the
 * real and imaginary parts (you can remove calculations by providing arrays
 * of `length = (N / 2) + 1` in real signals because the symetric properties)
 *
 * @param {Object} freqDomain - the frequency domain data in rectangular notation
 * @param {Object} output - (Optional) the buffers to store the data in polar form
 * if you want to reuse buffers for performance reasons
 * @return {Array} the frequency domain data in polar notation: an object
 * with the form: `{ magnitudes: <Array>, phases: <Array> }`
 *
 * @example
 * const dsp = require('dsp-kit')
 * dsp.polar(dsp.fft(signal)).magnitudes
 */
export function polar (result, output) {
  const { real, imag } = result
  const len = real.length
  if (!output) output = { magnitudes: zeros(len), phases: zeros(len) }
  const { magnitudes, phases } = output
  const limit = Math.min(len, magnitudes.length)
  let rval, ival
  for (let i = 0; i < limit; i++) {
    rval = real[i]
    ival = imag[i]
    if (magnitudes) magnitudes[i] = sqrt(rval * rval + ival * ival)
    if (phases) phases[i] = atan2(ival, rval)
  }
  return output
}

/**
 * Given a spectrum in rectangular form (`{ magnitudes, phases }`) convert
 * into a spectrum in polar form (`{ real, imag }`).
 *
 * This is the inverse operation of `polar` function
 * @see polar
 */
export function rectangular (spectrum, complex) {
  const { magnitudes, phases } = spectrum
  const size = magnitudes.length
  if (!complex) complex = { real: zeros(size), imag: zeros(size) }
  const { real, imag } = complex
  const limit = Math.min(size, real.length)
  for (let i = 0; i < limit; i++) {
    real[i] = magnitudes[i] * cos(phases[i])
    imag[i] = magnitudes[i] * sin(phases[i])
  }
  return complex
}

/**
 * Perfroms a phase-unwrapping of a phase data
 * @param {Array} data - phase data
 * @param {Array} output - (Optional) the output array to store the unrapped
 * phase data (or a new array will be created if not provided)
 * @return {Array} the unrapped phase data
 *
 * @example
 * // get the spectrum of a 1024 size signal fragment
 * const spectrum = dsp.spectrum(dsp.fft(1024, signal))
 * // unwrap the phases
 * const unwrapped = dsp.unwrap(spectrum.phases)
 */
export function unwrap (data, output) {
  const size = data.length
  if (!output) output = zeros(size)

  let shift = 0
  let prev = output[0] = phmod(data[0])
  for (let i = 1; i < size; i++) {
    const current = phmod(data[i])
    const diff = current - prev
    if (diff < -PI) shift += PI2
    else if (diff > PI) shift -= PI2
    output[i] = current + shift
    prev = current
  }
  return output
}

/**
 * Perform a cyclic shifting (rotation) to set the first sample at the middle
 * of the buffer (it reorder buffer samples from (0:N-1) to [(N/2:N-1) (0:(N/2-1))])
 *
 * This is useful to perform zero-phase windowing
 *
 * This is the same function as mathlab's `fftshift`
 *
 * @param {Array} source - the source buffer
 * @param {Array} result - (Optional) the result buffer
 */
export function fftshift (buffer, output) {
  const size = buffer.length
  const n = Math.floor((size / 2) + 1)
  if (!output) output = new Float64Array(size)
  for (let i = 0; i < size; i++) {
    output[i] = buffer[(i + n) % size]
  }
  return output
}

export function fftunshift (buffer, output) {
  return fftshift(buffer, output)
}
