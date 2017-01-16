const test = require('tst')
const assert = require('assert')
const pv = require('..')
const buffer = require('dsp-array')

test('phaseVocoder', function () {
  const signal = buffer.gen(1024, (n, N) => Math.sin(2 * Math.PI * (n / (N - 1))))
  const stretch = pv.phaseVocoder(signal, { size: 512, hop: 10 })
  const resynth = stretch(1, signal)
  assert.equal(resynth.length, 1012)
})
