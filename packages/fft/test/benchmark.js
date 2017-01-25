var Benchmark = require('Benchmark')
var suite = new Benchmark.Suite()
var dspjs = require('dspjs')
var FFT = require('..')
var arr = require('dsp-array')

var SIZE = 1024
var signal = arr.fill(SIZE, () => Math.random() * 2 - 0.5)
var fftjs = new dspjs.FFT(signal.length, 44100)
var fftkit = FFT.fft(SIZE)
var output = { real: signal.slice(), imag: arr.zeros(signal.length) }

suite
.add('dsp.js', function () {
  fftjs.forward(signal)
})
.add('dsp-kit', function () {
  fftkit('forward', signal, output)
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
