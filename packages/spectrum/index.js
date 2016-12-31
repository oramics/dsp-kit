/**
 * > Transformations of frequency domain information
 *
 * > In virtually all cases, the result from the DFT has to be converted into polar coordinates in
 * order to permit the desired modifications in an appropriate way as magnitudes and phases:
 *
 * [![npm install dsp-spectrum](https://nodei.co/npm/dsp-spectrum.png?mini=true)](https://npmjs.org/package/dsp-spectrum/)
 *
 * This module contains function to work with the result of a DFT (or FFT),
 * the signal in the frequency domain.
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * @example
 * const dsp = require('dsp-kit')
 * dsp.spectrum(dft.fft(signal))
 *
 * @module spectrum
 */
const { sqrt } = Math
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
 * Calculate the spectrum of a DFT or FFT result (a
 * signal in the frequency domain)
 *
 * @param {Object} freqDomain - the frequency domain data
 * @param {Object} spectrum - (Optional) the buffers to store the spectrum
 * (with the form { `magnitudes`: Array, `phases`: Array })
 * @return {Array} the spectrum
 *
 * @example
 * const dsp = require('dsp-kit')
 * dsp.spectrum(dsp.fft(signal)).magnitudes
 */
export function spectrum (result, spectrum) {
  const { real, imag } = result
  const size = real.length
  const N = size / 2
  if (!spectrum) spectrum = { magnitudes: zeros(N), phases: zeros(N) }
  const { magnitudes, phases } = spectrum
  const bSi = 2 / size
  for (let i = 0; i < N; i++) {
    const rval = real[i]
    const ival = imag[i]
    if (magnitudes) magnitudes[i] = bSi * sqrt(rval * rval + ival * ival)
    if (phases) phases[i] = Math.atan2(ival, rval)
  }
  return spectrum
}
