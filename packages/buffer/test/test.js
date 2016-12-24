'use strict'
const test = require('tst')
const assert = require('assert')
const buffer = require('..')

const from = (x) => Float64Array.from(x || [])

test('zeros', () => {
  const zeros = buffer.zeros(10)
  assert.equal(zeros.length, 10)
  assert.deepEqual(zeros, from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))
})

test('generate', function () {
  const zeros = buffer.generate(100, (x) => 0)
  assert.deepStrictEqual(zeros, buffer.zeros(100))
  const ones = buffer.generate(10, (x) => 1)
  assert.deepEqual(ones, from([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]))
  const values = buffer.generate(10, (x) => x)
  assert.deepEqual(values, from([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]))
  const indices = buffer.generate(10, (x, i) => i)
  assert.deepEqual(indices, from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
  const lens = buffer.generate(10, (x, i, s) => s)
  assert.deepEqual(lens, from([10, 10, 10, 10, 10, 10, 10, 10, 10, 10]))
})
