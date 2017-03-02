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
import { fft } from 'dsp-fast-fourier-transform'

export function stft (size, hopSize, input, win, output) {
  var fft = fftRadix2(size)
  var frame = new Float32Array(size)
}
