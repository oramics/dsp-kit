/* eslint-disable comma-spacing */
const test = require('tst')
const assert = require('assert')
const _ = require('..')
const array = require('dsp-array')
const fill = array.fill
const $ = require('genish.js')
const gen = $.gen.createCallback.bind($.gen)

const round = (sig) => array.round(sig, 4)

test('integrator', () => {
  test('accum', () => {
    var signal = _.accum(0.4)
    assert.deepEqual(fill(10, signal),
      [0,0.4,0.8,-1,-0.6,-0.19999999999999996,0.20000000000000007,0.6000000000000001,1,-1])
  })

  test('accum min max', () => {
    var sig = _.accum(1, { min: -2, max: 2 })
    assert.deepEqual(fill(10, sig), [0,1,2,-2,-1,0,1,2,-2,-1])
  })

  test.skip('accum genish', () => {
    var sig = _.accum(0.2)
    var sigRef = gen($.accum(0.2))
    assert.deepEqual(round(fill(10, sig)), round(fill(10, sigRef)))
  })
})
