const test = require('tst')
const assert = require('assert')
const pv = require('..')
const buffer = require('dsp-buffer')

test('analysis', function () {
  const signal = buffer.generate(1024, (x) => Math.sin(2 * Math.PI * (x / (x - 1))))
  const analysis = pv.analysis(signal, { size: 512, hop: 10 })
  assert.equal(analysis.length, 51)
})

test('synthesis', function () {
})
