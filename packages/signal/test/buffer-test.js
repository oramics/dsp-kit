/* eslint-disable comma-spacing */
const test = require('tst')
const assert = require('assert')
const _ = require('..')
const { fill } = require('dsp-array')

test('buffer', () => {
  test('loop', () => {
    var signal = _.loop([0, 1, 3])
    assert.deepEqual(fill(10, signal), [0,1,3,0,1,3,0,1,3,0])
  })
})
