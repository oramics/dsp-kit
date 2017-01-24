var Benchmark = require('Benchmark')
var suite = new Benchmark.Suite()
var dspjs = require('dspjs')
var asm = require('..')
var arr = require('dsp-array')

var SIZE = 1024
var signal = arr.fill(SIZE, () => Math.random() * 2 - 0.5)
var fft = new dspjs.FFT(signal.length, 44100)
var asmfft = asm.fft(SIZE)
var output = { real: signal.slice(), imag: arr.zeros(signal.length) }

suite
.add('fft', function () {
  fft.forward(signal)
})
.add('asm', function () {
  asmfft(signal, 'forward', output)
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
