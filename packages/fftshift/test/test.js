/* eslint-disable comma-spacing */
const test = require('tst')
const assert = require('assert')
const arr = require('dsp-array')
const shift = require('..')

const from = (x) => Float64Array.from(x || [])

test('fftshift', () => {
  const even = shift.fftshift([1, 2, 3, 4, 5, 6])
  assert.deepEqual(even, from([4, 5, 6, 1, 2, 3]))
  const odd = shift.fftshift([1, 2, 3, 4, 5])
  assert.deepEqual(odd, from([4, 5, 1, 2, 3]))

  const N = 1000
  const signal = arr.fill(N + 1, x => x)
  const shifted = arr.fill(N + 1, x => x < N / 2 ? N / 2 + x + 1 : x - N / 2)
  assert.deepEqual(shift.fftshift(signal.slice()), shifted)
  assert.deepEqual(shift.ifftshift(shifted.slice()), signal)
})

test('inverse fftshift', () => {
  const even = arr.fill(100, x => x)
  assert.deepEqual(shift.ifftshift(shift.fftshift(even)), even)
  const odd = arr.fill(101, x => x)
  assert.deepEqual(shift.ifftshift(shift.fftshift(odd)), odd)
})
