const Benchmark = require('Benchmark')
var suite = new Benchmark.Suite()
var dspjs = require('./dspjs')
var dsp = require('../packages/dsp')

console.log('FFT benchmark')

const signal = dsp.generate(1024, (x, N) => Math.sin(2 * Math.PI * x / (N - 1)))

suite.add('dsp-kit FFT', function () {
  dsp.spectrum(dsp.fft(signal))
})
.add('dspjs FFT', function () {
  const fft = new dspjs.FFT(1024, 44100)
  fft.forward(signal)
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
