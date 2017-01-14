var test = require('tst')
var assert = require('assert')
var buffer = require('dsp-array')
var dspjs = require('dspjs')
var dsp = require('..')

test.skip('rfft', function () {
  var signal = buffer.generate(1024, (n, N) => Math.sin(2 * Math.PI * n / (N - 1)))
  var rfft = new dspjs.RFFT(1024, 44100)
  var fft = new dspjs.FFT(1024, 44100)
  var forward = dsp.rfft(1024)
  rfft.forward(signal)
  fft.forward(signal)
  assert.deepEqual(buffer.round(rfft.spectrum), buffer.round(fft.spectrum))
  assert.deepEqual(dsp.rfftSpectrum(forward(signal)), rfft.spectrum)
  // var result = { real: buffer.zeros(1024), imag: buffer.zeros(1024) }
})
