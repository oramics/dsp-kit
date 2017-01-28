/* eslint-disable comma-spacing */
const test = require('tst')
const assert = require('assert')
const _ = require('..')
const { fill } = require('dsp-array')

test('trigonometry', () => {
  test('sin', () => {
    var signal = _.round(_.sin(_.accum(0.1)), 3)
    assert.deepEqual(fill(10, signal), [0,0.1,0.199,0.296,0.389,0.479,0.565,0.644,0.717,0.783])
  })
})

test('number', () => {
  test('floor', () => {
    var sig = _.floor(_.accum(0.4, false, { min: -2, max: 2 }))
    assert.deepEqual(fill(14, sig), [0,0,0,1,1,2,-2,-2,-2,-1,-1,-1,0,0])
  })
})

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
    var sig = _.abs(_.accum(1, 0, { min: -2, max: 2 }))
    assert.deepEqual(fill(10, sig), [0,1,2,2,1,0,1,2,2,1])
  })
})
