/**
 * > Transformations of frequency domain information
 *
 * [![npm install dsp-freq-domain](https://nodei.co/npm/dsp-freq-domain.png?mini=true)](https://npmjs.org/package/dsp-freq-domain/)
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
 * @module freq-domain
 */
const { sqrt } = Math

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
 * Calculate the spectrum (amplitude magnitudes) of a DFT or FFT result (a
 * signal in the frequency domain)
 *
 * @param {Object} freqDomain - the frequency domain data
 * @param {Array} spectrum - (Optional) a buffer to store the spectrum (a
 * new one will be created if no one provided)
 * @return {Array} the spectrum
 */
export function spectrum (result, spectrum) {
  let rval, ival
  const { real, imag } = result
  const size = real.size
  const N = size / 2
  const bSi = 2 / size
  spectrum = spectrum || new Float64Array(size)
  for (let i = 0; i < N; i++) {
    rval = real[i]
    ival = imag[i]
    spectrum[i] = bSi * sqrt(rval * rval + ival * ival)
  }
  return spectrum
}
