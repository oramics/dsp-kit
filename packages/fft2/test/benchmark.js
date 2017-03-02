var benchmark = require('easy-benchmark')
var dspjs = require('dspjs')
var fft = require('..')
var arr = require('dsp-array')

var m = 10
var SIZE = Math.pow(2, m)
var signal = arr.fill(SIZE, () => Math.random() * 2 - 0.5)
var imaginary = arr.zeros(SIZE)
var fftjs = new dspjs.FFT(signal.length, 44100)
var output = { real: arr.zeros(SIZE), imag: arr.zeros(SIZE) }

benchmark('FORWARD: dsp-fft vs dsp.js FFT', {
  'dsp-kit fft2': () => fft(1, m, signal, imaginary),
  'dsp.js fft': () => fftjs.forward(signal)
})

benchmark('INVERSE: dsp-fft vs dsp.js FFT', {
  'dsp-kit fft2': () => fft(-1, m, signal, imaginary),
  'dsp.js fft': () => fftjs.inverse(output.real, output.imag)
})
