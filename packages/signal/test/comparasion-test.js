/* eslint-disable comma-spacing */
const test = require('tst')
const assert = require('assert')
const _ = require('..')
const { fill } = require('dsp-array')

test('comparasion', () => {
  test('eq', () => {
    var eq = _.eq(() => 10, () => 10)
    assert.deepEqual(fill(10, eq), [1,1,1,1,1,1,1,1,1,1])
    var neq = _.eq(() => 10, () => 9)
    assert.deepEqual(fill(10, neq), [0,0,0,0,0,0,0,0,0,0])
  })
})
