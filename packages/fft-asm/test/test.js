var test = require('tst')
var assert = require('assert')
var almost = require('almost-equal')
var arr = require('dsp-array')
var asm = require('..')
var dspjs = require('dspjs')
var dft = require('dsp-dft')

var SIZE = 1024
var signal = arr.fill(SIZE, () => Math.random() * 2 - 0.5)

function calcDFT (signal) {
  return dft.dft('forward', signal)
}

function calcFFT (signal) {
  var fft = new dspjs.FFT(signal.length, 44100)
  fft.forward(signal)
  return { real: fft.real, imag: fft.imag }
}

function calcASM (signal) {
  var len = signal.length
  var fft = asm.fft(len)
  return fft(signal, { real: arr.zeros(SIZE), imag: arr.zeros(SIZE) }, 'forward')
}

test.skip('test inverse', function () {
  var fft = new dspjs.FFT(SIZE, 44100)
  fft.forward(signal)
  var result = fft.inverse(fft.real, fft.imag)
  assert.almost(result, signal)

  var asmFFT = asm.fft(SIZE)
  var output = { real: arr.zeros(SIZE), imag: arr.zeros(SIZE) }
  var inverse = { real: arr.zeros(SIZE), imag: arr.zeros(SIZE) }
  asmFFT(signal, output, 'forward')
  asmFFT(output, inverse, 'inverse')
  assert.almost(inverse.real, signal)
})

test.skip('test forward', function () {
  var dft = calcDFT(signal)
  var fft = calcFFT(signal)
  var asm = calcASM(signal)
  assert.almost(fft.real, dft.real, 'fft real')
  assert.almost(fft.imag, dft.imag, 'fft imag')
  assert.almost(asm.real, fft.real, 'asm real')
  assert.almost(asm.imag, fft.imag, 'asm imag')
})

assert.almost = function (x, y, message) {
  if (x.length && y.length) {
    return x.every(function (x, i) {
      return assert.almost(x, y[i], (message || ' : ') + i)
    })
  }

  var EPSILON = 10e-8
  if (!almost(x, y, EPSILON)) assert.fail(x, y, `${x} ≈ ${y}`, '≈ ' + message)
  return true
}
