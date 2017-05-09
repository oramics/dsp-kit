// # DFT model
const FFT = require("fft.js");
const { fftshift } = require("fftshift");
const winFn = require("scijs-window-functions/hamming");
const { sqrt, atan2 } = Math;
const fill = require("filled-array");
const unwrap = require("unwrap-phases");
const { sin, cos } = Math;

/**
 * Create a DFT model. A DFT model allows to perform dft analysis of a signal
 * using a fast fourier function. 
 * 
 * @param {number} size - the size of the signal
 * @param {window} [window] - the window to use (or a hamming window if not specified)
 * @return {Object} an object with two functions: analisys and synthesis
 * @example
 * import DFT from 'spectral-models'
 * const dft = DFT(512)
 * dft.analisys(signal)
 */
function DFT(size, window) {
  if (!window) window = fill(winFn, size);
  if (window.length !== size)
    throw Error(
      "Window size must be " + size + " length but is " + window.length
    );

  const fft = new FFT(size);
  const signal = new Array(size);
  const output = fft.createComplexArray();
  const inversed = fft.createComplexArray();
  const spectrumSize = size / 2 + 1;
  const magnitudes = new Array(spectrumSize);
  const phases = new Array(spectrumSize);

  /**
   * A DFT instance
   */
  return {
    /**
     * Given a real signal, create a { magnitudes, phases } object.
     * The size of the input must be the same as specified in the constructor.
     * 
     * @memberof DFT
     * @param {Array} input - the input signal 
     * @return {Object} a `{ magnitudes, phases }` object
     */
    analisys(input) {
      // apply the window to the signal
      for (let i = 0; i < size; i++) {
        signal[i] = input[i] * window[i];
      }
      // rotate the array to phase-zero
      fftshift(signal);
      // FFT forward
      fft.realTransform(output, signal);
      for (let i = 0, p = 0; i < spectrumSize; i++, (p += 2)) {
        const real = output[p];
        const imag = output[p + 1];
        magnitudes[i] = sqrt(real * real + imag * imag);
        phases[i] = atan2(imag, real);
      }
      unwrap(phases);
      return { magnitudes, phases };
    },

    /**
     * Given a { magnitudes, phases } object, return the initial signal.
     * Notice that the signal will have a window applied.
     * @memberof DFT
     * @param {Object} analisys - the analysis object
     * @return {Array} the signal
     */
    synthesis ({ magnitudes, phases } = {}) {
      for (let i = 0, p = 0; i < spectrumSize; i++, (p += 2)) {
        // real
        output[p] = magnitudes[i] * cos(phases[i]);
        // imaginary
        output[p + 1] = magnitudes[i] * sin(phases[i]);
      }
      fft.completeSpectrum(output);
      fft.inverseTransform(inversed, output);
      fft.fromComplexArray(inversed, signal)
      fftshift(signal)
      return signal
    }
  };
}

module.exports = DFT;
