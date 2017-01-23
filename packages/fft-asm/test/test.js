var test = require('tst')
var assert = require('assert')
var almost = require('almost-equal')
var arr = require('dsp-array')
var fft = require('..')
var dspjs = require('dspjs')

var SIZE = 1024
test('fft asm', function () {
  var signal = arr.fill(SIZE, () => Math.random() * 2 - 0.5)
  // dsp.js
  var offt = new dspjs.FFT(SIZE, 44100)
  offt.forward(signal)

  var real = signal.slice()
  var imag = arr.zeros(SIZE)
  fft.fft(real, imag)
  assert.almost(real, offt.real)
})

assert.almost = function (x, y, message) {
  if (x.length && y.length) return x.every(function (x, i) {
    return assert.almost(x, y[i], (message || '') + i)
  })

	var EPSILON = 10e-8
	if (!almost(x, y, EPSILON)) assert.fail(x, y, `${x} ≈ ${y}`, '≈')
	return true
};
