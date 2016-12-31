const test = require('tst')
const assert = require('assert')
const pv = require('..')
const buffer = require('dsp-buffer')

test('analysis', function () {
  const signal = buffer.generate(1024, (x) => Math.sin(2 * Math.PI * (x / (x - 1))))
  const analysis = pv.analysis(signal, { size: 512, hop: 10 })
  assert.equal(analysis.length, 51)
  assert.equal(analysis[0].magnitudes.length, 256)
  assert.equal(analysis[0].phases.length, 256)
})

test('synthesis', function () {
})
