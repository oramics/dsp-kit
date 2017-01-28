/* eslint-disable comma-spacing */
const test = require('tst')
const assert = require('assert')
const _ = require('..')
const { fill, roundTo } = require('dsp-array')
const $ = require('genish.js')

const gen = $.gen.createCallback.bind($.gen)
const round = roundTo(4)

test('integrator', () => {
  test('accum', () => {
    var signal = _.accum(0.4)
    assert.deepEqual(fill(10, signal), [0,0.4,0.8,0,0.4,0.8,0,0.4,0.8,0])
  })

  test('accum min max', () => {
    var sig = _.accum(1, 0, { min: -2, max: 2 })
    assert.deepEqual(fill(10, sig), [0,1,2,-2,-1,0,1,2,-2,-1])
  })

  test('accum genish', () => {
    var sig = _.accum(0.2, 0, { max: 0.9999 })
    var sigRef = gen($.accum(0.2))
    assert.deepEqual(round(fill(10, sig)), round(fill(10, sigRef)))
  })

  test('clamp', () => {
    var signal = _.clamp(_.accum(0.5, false, { min: -2, max: 2 }))
    assert.deepEqual(fill(10, signal), [0,0.5,1,1,1,-1,-1,-1,-0.5,0])
  })
})
