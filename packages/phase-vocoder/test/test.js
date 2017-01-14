const test = require('tst')
const assert = require('assert')
const pv = require('..')
const buffer = require('dsp-array')

test('analysis', function () {
  const signal = buffer.generate(1024, (x) => Math.sin(2 * Math.PI * (x / (x - 1))))
  const frames = pv.analysis(signal, { size: 512, hop: 10 })
  assert.equal(frames.length, 51)
  assert.equal(frames[0].magnitudes.length, 512)
})

test('synthesis', function () {
  const signal = buffer.generate(1024, (x) => Math.sin(2 * Math.PI * (x / (x - 1))))
  const frames = pv.analysis(signal, { size: 512, hop: 10 })
  const synth = pv.synthesis(frames, { size: 512, hop: 10, factor: 1 })
  assert.equal(synth.length, 510)
})
