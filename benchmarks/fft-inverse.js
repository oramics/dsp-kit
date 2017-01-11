const Benchmark = require('Benchmark')
var dspjs = require('./dspjs')
var dsp = require('../packages/dsp')

console.log('FFT inverse benchmark')
const signal = {
  real: dsp.generate(1024, (x, N) => Math.sin(2 * Math.PI * x / (N - 1))),
  imag: dsp.generate(1024, (x, N) => Math.sin(2 * Math.PI * x / (N - 1)))
}
const legacyFFT = new dspjs.FFT(1024, 44100)
const inverse = dsp.ifft(1024)
const output = { real: new Float64Array(1024), imag: new Float64Array(1024) }

new Benchmark.Suite()
.add('dspjs inverse FFT', function () {
  legacyFFT.inverse(signal.real, signal.imag)
})
.add('dsp-kit inverse FFT', function () {
  inverse(signal)
})
.add('dsp-kit inverse FFT reuse buffer', function () {
  inverse(signal, output)
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
