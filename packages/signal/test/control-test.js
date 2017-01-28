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
})
