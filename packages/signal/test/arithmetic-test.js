/* eslint-disable comma-spacing */
const test = require('tst')
const assert = require('assert')
const _ = require('..')
const { fill } = require('dsp-array')

test('arithmetic', () => {
  test('add', () => {
    var s = _.add(() => 1, () => 2)
    assert.deepEqual(s(), 3)
  })

  test('sub', () => {
    var sig = _.sub(() => 10, () => 5)
    assert.deepEqual(fill(10, sig), [5,5,5,5,5,5,5,5,5,5])
  })

  test('abs', () => {
    var sig = _.abs(_.accum(1, { min: -2, max: 2 }))
    assert.deepEqual(fill(10, sig), [0,1,2,2,1,0,1,2,2,1])
  })
})
