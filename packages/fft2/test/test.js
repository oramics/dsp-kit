var almost = require('almost-equal')
const test = require('tst')
const assert = require('assert')
const fft = require('..')
const arr = require('dsp-array')
const noise = require('dsp-noise')
var dspjs = require('dspjs')

var m = 10
var size = Math.pow(2, m)
var FFT = new dspjs.FFT(size, 44100)

test('simple', () => {
  var signal = arr.fill(size, noise.white())
  var real = arr.zeros(size)
  real.set(signal)
  assert.deepEqual(real, signal)
  var imag = arr.zeros(size)
  fft(1, m, real, imag)
  FFT.forward(real)
  assert.deepEqual(real, FFT.real)
})
