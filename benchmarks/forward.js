/* eslint-disable new-cap */
const Benchmark = require('Benchmark')
var dspjs = require('./dspjs')
var dsp = require('../packages/dsp')
var inplace = require('../packages/fft-alt/inplace')
var FFT = require('fft')
var FftModule = require('fft-asmjs')

console.log('FFT forward benchmark')
const SIZE = 1024
var fftasm = new FftModule(SIZE, true)
var fftnoasm = new FftModule(SIZE, false)
const signal = dsp.fill(SIZE, (x, N) => Math.sin(2 * Math.PI * x / (N - 1)))
const legacyFFT = new dspjs.FFT(SIZE, 44100)
const forward = dsp.fft(SIZE)
const rfftForward = dsp.rfft(SIZE)
const output = { real: new Float64Array(SIZE), imag: new Float64Array(SIZE) }
const fftjs = new FFT.complex(SIZE)

new Benchmark.Suite()
.add('fft ASM with asm.js enabled', function () {
  fftasm.fft(signal.slice(), output.imag, true)
})
.add('fft ASM with asm.js disabled', function () {
  fftnoasm.fft(signal.slice(), output.imag, true)
})
.add('dsp-kit FFT reuse buffer', function () {
  forward(signal, output)
})
.add('rfft forward', function () {
  rfftForward(signal)
})
.add('dspjs FFT', function () {
  legacyFFT.forward(signal)
})
.add('dsp-kit FFT', function () {
  forward(signal)
})
.add('dsp-kit FFT with spectrum', function () {
  dsp.polar(forward(signal))
})
.add('fft FFT', function () {
  const out = new Float64Array(SIZE)
  fftjs.simple(out, signal, 'real')
})
.add('fft inplace', function () {
  output.real.set(signal)
  inplace(SIZE, output.real, output.imag)
})
.on('cycle', function (event) {
  console.log(String(event.target))
})
.on('complete', function () {
  console.log('Fastest is ', this.filter('fastest').map('name'))
})
.on('error', function (e) {
  console.log('ERROR', e)
  throw e.error
})
.run({ 'async': true })
