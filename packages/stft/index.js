/**
 * > Short-Time Fourier Transform: a time-varying method of spectral analysis
 *
 * [![npm install dsp-stft](https://nodei.co/npm/dsp-stft.png?mini=true)](https://npmjs.org/package/dsp-stft/)
 *
 * @example
 * import { stft, istft } from 'dsp-sftf'
 *
 * @module stft
 */
import FFT from 'fft.js'

export function stft (input, window, output, inputSize, fftSize, hopSize) {
  const fft = new FFT(fftSize)
  const fftOut = fft.createComplexArray()
  const frame = new Array(fftSize)

  for (let pIn = 0, pOut = 0; pIn < inputSize; pIn += hopSize) {
    // Create a new windowed frame
    for (let i = 0; i < fftSize; i++) {
      frame[i] = pIn + i < inputSize ? input[pIn + 1] * window[i] : 0
    }
    // Transform it
    fft.realTransform(fftOut, frame)
  }
}
