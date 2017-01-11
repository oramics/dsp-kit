const Benchmark = require('Benchmark')
var suite = new Benchmark.Suite()
var dspjs = require('./dspjs')
var dsp = require('../packages/dsp')
var FFT = require('fft')

console.log('FFT benchmark')
const signal = dsp.generate(1024, (x, N) => Math.sin(2 * Math.PI * x / (N - 1)))
const signal32 = dsp.generate(new Float32Array(1024), (x, N) => Math.sin(2 * Math.PI * x / (N - 1)))
const dspfft = new dspjs.FFT(1024, 44100)
const forward = dsp.fft(1024)
const forward32 = dsp.fft(1024, Float32Array)
const output64 = { real: new Float64Array(1024), imag: new Float64Array(1024) }
const output32 = { real: new Float32Array(1024), imag: new Float32Array(1024) }
const fftjs = new FFT.complex(1024)

suite
.add('dspjs FFT', function () {
  dspfft.forward(signal)
})
.add('dsp-kit FFT', function () {
  forward(signal)
})
.add('dsp-kit FFT reuse buffer 64 bits', function () {
  forward(signal, output64)
})
.add('dsp-kit FFT reuse buffer 32 bits', function () {
  forward32(signal32, output32)
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
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})
.on('error', function (e) {
  console.error('ERROR', e)
})
.run({ 'async': true })
