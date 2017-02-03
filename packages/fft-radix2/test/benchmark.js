var benchmark = require('easy-benchmark')
var dspjs = require('dspjs')
var fftRadix2 = require('..').fftRadix2
var arr = require('dsp-array')

var SIZE = 1024
var signal = arr.fill(SIZE, () => Math.random() * 2 - 0.5)
var fftjs = new dspjs.FFT(signal.length, 44100)
var fftkit = fftRadix2(SIZE)
var output = { real: arr.zeros(SIZE), imag: arr.zeros(SIZE) }
var output2 = { real: arr.zeros(SIZE), imag: arr.zeros(SIZE) }

benchmark('FORWARD: dsp-fft vs dsp.js FFT', {
  'dsp-kit fft': () => fftkit.forward(signal, output),
  'dsp.js fft': () => fftjs.forward(signal)
})

benchmark('INVERSE: dsp-fft vs dsp.js FFT', {
  'dsp-kit fft': () => fftkit.inverse(output, output2),
  'dsp.js fft': () => fftjs.inverse(output.real, output.imag)
})
