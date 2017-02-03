const test = require('tst')
const assert = require('assert')
const { analysis, synthesis, phaseVocoder } = require('..')
const arr = require('dsp-array')

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
