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

test('concat', () => {
  const ones = buffer.generate(5, (x) => 1)
  const twos = buffer.generate(5, (x) => 2)
  assert.deepEqual(buffer.concat(ones, twos), buffer.from([1, 1, 1, 1, 1, 2, 2, 2, 2, 2]))
})

test('generate', function () {
  const zeros = buffer.generate(100, (x) => 0)
  assert.deepStrictEqual(zeros, buffer.zeros(100))
  const ones = buffer.generate(10, (x) => 1)
  assert.deepEqual(ones, from([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]))
  const indices = buffer.generate(10, (n, N) => n)
  assert.deepEqual(indices, from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
  const lens = buffer.generate(10, (n, N) => N)
  assert.deepEqual(lens, from([10, 10, 10, 10, 10, 10, 10, 10, 10, 10]))
})

test('generate sine', function () {
  const PI = Math.PI
  const sine = buffer.generate(10, (n, N) => Math.sin(2 * PI * n / (N - 1)))
  assert.deepEqual(sine, from([0, 0.6427876096865393, 0.984807753012208, 0.8660254037844387, 0.3420201433256689, -0.34202014332566866, -0.8660254037844385, -0.9848077530122081, -0.6427876096865396, -2.4492935982947064e-16]))
})

test('copy', function () {
  const ones = buffer.generate(100, (x) => 1)
  assert.deepEqual(buffer.copy(ones), ones)
})

test('copy to buffer', function () {
  const ones = buffer.generate(100, (x) => 1)
  const result = buffer.zeros(100)
  buffer.copy(ones, result)
  assert.deepEqual(result, ones)
})

test('copy with offsets', function () {
  const ones = buffer.generate(50, (x) => 1)
  const twos = buffer.add(ones, ones)
  const source = buffer.concat(ones, twos)
  const result = buffer.copy(source, 100, 50, 50)
  assert.equal(result.length, 100)
  const check = buffer.concat(buffer.zeros(50), twos)
  assert.deepEqual(result, check)
})

test('add', function () {
  const ones = buffer.generate(100, (x) => 1)
  const sum = buffer.add(ones, ones)
  assert.deepEqual(sum, buffer.generate(100, (x) => 2))
})

test('add to a buffer', function () {
  const ones = buffer.generate(100, (x) => 1)
  const result = buffer.zeros(100)
  buffer.add(ones, ones, result)
  assert.deepEqual(result, buffer.generate(100, (x) => 2))
})
