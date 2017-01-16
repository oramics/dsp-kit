var test = require('tst')
var assert = require('assert')
var arr = require('dsp-array')
var dspjs = require('dspjs')
var dsp = require('..')

test.skip('fft and rfft returns the same spectrum', function () {
  var signal = arr.gen(1024, (n, N) => Math.sin(2 * Math.PI * n / (N - 1)))
  var rfft = new dspjs.RFFT(1024, 44100)
  var fft = new dspjs.FFT(1024, 44100)
  rfft.forward(signal)
  fft.forward(signal)
  assert.deepEqual(arr.round(rfft.spectrum), arr.round(fft.spectrum))
  // var result = { real: arr.zeros(1024), imag: arr.zeros(1024) }
})

test('legacy rfft implementation and new one gives same result', function () {
  var signal = arr.gen(1024, (n, N) => Math.sin(2 * Math.PI * n / (N - 1)))
  var rfft = new dspjs.RFFT(1024, 44100)
  var forward = dsp.rfft(1024)
  rfft.forward(signal)
  assert.deepEqual(dsp.rfftSpectrum(forward(signal)), rfft.spectrum)
})

test.skip('inverse rfft restores the signal', function () {
  var signal = arr.gen(1024, (n, N) => Math.sin(2 * Math.PI * n / (N - 1)))
  var forward = dsp.rfft(1024)
  var inverse = dsp.irfft(1024)
  assert.deepEqual(inverse(forward(signal)), signal)
})
