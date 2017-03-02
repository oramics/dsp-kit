const test = require('tst')
const assert = require('assert')
require('assert-almost')(assert)
const { analysis, synthesis, phaseVocoder } = require('..')
const { fft } = require('dsp-fft')
const { polar, rectangular } = require('dsp-spectrum')
const { fftshift, ifftshift } = require('dsp-fftshift')
const arr = require('dsp-array')

test.only('a->s', () => {
  var SIZE = 1024
  var ft = fft(SIZE)
  var signal = arr.fill(SIZE, (x) => Math.random() * 2 - 1)
  var shifted = fftshift(signal.slice())
  var freqDomain = ft.forward(shifted)
  var polarFD = polar(freqDomain)
  var rectFD = rectangular(polarFD)
  var timeDomain = ft.inverse(rectFD)
  var unshifted = ifftshift(timeDomain.real)
  assert.almost(unshifted, signal)
})

test('analysis', () => {
  var signal = arr.fill(320, (x) => x)
  var frames = analysis(signal, { size: 64, hop: 32 })
  assert.equal(frames.length, 8)
})

test('synthesis', () => {

})

test('phaseVocoder', function () {
  var signal = arr.fill(10000, (x) => 2 * Math.random() - 1)
  var stretch = phaseVocoder()
  var result = stretch(0.5, signal)
  assert.equal(result.length, 6144)
})
