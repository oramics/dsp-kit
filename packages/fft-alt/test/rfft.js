var test = require('tst')
var assert = require('assert')
var buffer = require('dsp-buffer')
var dspjs = require('dspjs')
var rfft = require('../rfft.js')

test('rfft', function () {
  var signal = buffer.generate(1024, (n, N) => Math.sin(2 * Math.PI * n / (N - 1)))
  var fft = new dspjs.FFT(1024, 44100)
  fft.forward(signal)
  var result = { real: buffer.zeros(1024), imag: buffer.zeros(1024) }
  assert.deepEqual(result.real, fft.real)
  assert.deepEqual(result.imag, fft.imag)
})
