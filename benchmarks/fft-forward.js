const Benchmark = require('Benchmark')
var dspjs = require('./dspjs')
var dsp = require('../packages/dsp')
var FFT = require('fft')

console.log('FFT forward benchmark')
const signal = dsp.generate(1024, (x, N) => Math.sin(2 * Math.PI * x / (N - 1)))
const legacyFFT = new dspjs.FFT(1024, 44100)
const forward = dsp.fft(1024)
const output64 = { real: new Float64Array(1024), imag: new Float64Array(1024) }
const fftjs = new FFT.complex(1024)

new Benchmark.Suite()
.add('dspjs FFT', function () {
  legacyFFT.forward(signal)
})
.add('dsp-kit FFT', function () {
  forward(signal)
})
.add('dsp-kit FFT reuse buffer 64 bits', function () {
  forward(signal, output64)
})
.add('dsp-kit FFT with spectrum', function () {
  dsp.spectrum(forward(signal))
})
.add('fft FFT', function () {
  const out = new Float64Array(1024)
  fftjs.simple(out, signal, 'real')
})
.on('cycle', function (event) {
  console.log(String(event.target))
})
.on('complete', function () {
  console.log('Fastest is ', this.filter('fastest').map('name'))
})
.on('error', function (e) {
  console.error('ERROR', e)
})
.run({ 'async': true })
