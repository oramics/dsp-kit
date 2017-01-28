/* eslint-disable comma-spacing */
const test = require('tst')
const assert = require('assert')
const _ = require('..')
const { fill } = require('dsp-array')

test('control', () => {
  test('bang', () => {
    var bang = _.bang()
    assert.deepEqual(fill(10, bang), [0,0,0,0,0,0,0,0,0,0])
    bang.trigger()
    assert.deepEqual(fill(10, bang), [1,0,0,0,0,0,0,0,0,0])
  })

  test('ifelse', () => {
    var signal = _.ifelse(_.loop([1, 0, 0]), 10, 20)
    assert.deepEqual(fill(10, signal), [10,20,20,10,20,20,10,20,20,10])
  })
})
