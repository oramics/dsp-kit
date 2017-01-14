var test = require('tst')
var assert = require('assert')
var buffer = require('dsp-array')
var dspjs = require('dspjs')
var forward = require('../inplace.js')

test('in-place fft algorithm', function () {
  var fft = new dspjs.FFT(1024, 44100)
  var signal = buffer.generate(1024, (n, N) => Math.sin(2 * Math.PI * n / (N - 1)))
  fft.forward(signal)
  var result = { real: buffer.zeros(1024), imag: buffer.zeros(1024) }
  result.real.set(signal)
  forward(1024, result.real, result.imag)
  assert.deepEqual(result.real, fft.real)
  assert.deepEqual(result.imag, fft.imag)
})
