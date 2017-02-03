/* eslint-disable comma-spacing */
const test = require('tst')
const assert = require('assert')
const array = require('..')

const from = (x) => Float64Array.from(x || [])

test('zeros', () => {
  const zeros = array.zeros(10)
  assert.equal(zeros.length, 10)
  assert.deepEqual(zeros, from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))
})

test('add', () => {
  const ones = array.fill(10, (x) => 1)
  var result = array.add(5, ones, ones)
  assert.deepEqual(result, [2,2,2,2,2])
  assert.deepEqual(ones, [1,1,1,1,1,1,1,1,1,1])
  array.add(5, ones, ones, ones)
  assert.deepEqual(ones, [2,2,2,2,2,1,1,1,1,1])
})

test('substr', () => {
  const a = array.fill(5, (x) => 5)
  const b = array.fill(5, (x) => x)
  assert.deepEqual(array.substr(5, a, b), [5,4,3,2,1])
  array.substr(3, a, b, a)
  assert.deepEqual(a, [5,4,3,5,5])
})

test('mult', () => {
  var signal = array.fill(10, (n) => 2)
  var result = array.mult(5, signal, signal)
  assert.deepEqual(result, [4, 4, 4, 4, 4])
  assert.deepEqual(signal, [2,2,2,2,2,2,2,2,2,2])
  array.mult(5, signal, signal, signal)
  assert.deepEqual(signal, [4,4,4,4,4,2,2,2,2,2])
})

test('concat', () => {
  const ones = array.fill(5, (x) => 1)
  const twos = array.fill(5, (x) => 2)
  assert.deepEqual(array.concat(ones, twos), from([1, 1, 1, 1, 1, 2, 2, 2, 2, 2]))
})

test('fill', function () {
  const zeros = array.fill(100, (x) => 0)
  assert.deepStrictEqual(zeros, array.zeros(100))
  const ones = array.fill(10, (x) => 1)
  assert.deepEqual(ones, from([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]))
  const indices = array.fill(10, (n, N) => n)
  assert.deepEqual(indices, from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
  const lens = array.fill(10, (n, N) => N)
  assert.deepEqual(lens, from([10, 10, 10, 10, 10, 10, 10, 10, 10, 10]))
})

test('generate in-place', function () {
  const PI = Math.PI
  const sine32 = new Float32Array(10)
  array.fill(10, (n, N) => Math.sin(2 * PI * n / (N - 1)), sine32)
  assert.deepEqual(sine32, [
    0, 0.6427876353263855, 0.9848077297210693, 0.8660253882408142, 0.3420201539993286, -0.3420201539993286, -0.8660253882408142, -0.9848077297210693, -0.6427876353263855, -2.4492937051703357e-16
  ])
  const sine64 = new Float64Array(10)
  array.fill(10, (n, N) => Math.sin(2 * PI * n / (N - 1)), sine64)
  assert.deepEqual(sine64, [
    0, 0.6427876096865393, 0.984807753012208, 0.8660254037844387, 0.3420201433256689, -0.34202014332566866, -0.8660254037844385, -0.9848077530122081, -0.6427876096865396, -2.4492935982947064e-16
  ])
})

test('round', function () {
  const signal = array.fill(10, (n, N) => Math.sin(2 * Math.PI * n / (N - 1)))
  assert.deepEqual(array.round(signal, 2), from([0,0.64,0.98,0.87,0.34,-0.34,-0.87,-0.98,-0.64,0]))
  assert.deepEqual(array.round(signal, 3), from([0,0.643,0.985,0.866,0.342,-0.342,-0.866,-0.985,-0.643,0]))
})

test('testAll', function () {
  const signal = [1, 1, 1, 2, 2, 2]
  assert(array.testAll(3, (x) => x === 1, signal))
  assert(!array.testAll(4, (x) => x === 1, signal))
})
