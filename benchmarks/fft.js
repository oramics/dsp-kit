const Benchmark = require('Benchmark')
var suite = new Benchmark.Suite()
var dspjs = require('./dspjs')
var dsp = require('../packages/dsp')
var FFT = require('fft')

console.log('FFT benchmark')
const signal = dsp.generate(1024, (x, N) => Math.sin(2 * Math.PI * x / (N - 1)))

suite.add('dsp-kit FFT', function () {
  dsp.spectrum(dsp.fft(signal))
})
.add('dspjs FFT', function () {
  const fft = new dspjs.FFT(1024, 44100)
  fft.forward(signal)
})
.add('fft FFT', function () {
  const fft = new FFT.complex(1024)
  const out = new Float64Array(1024)
  fft.simple(out, signal, 'real')
})
.on('cycle', function (event) {
  console.log(String(event.target))
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})
.on('error', function (e) {
  console.error('ERROR', e)
})
.run({ 'async': true })
