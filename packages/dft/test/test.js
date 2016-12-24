const test = require('tst')
const assert = require('assert')
var dft = require('..')

const { PI, sin } = Math
const PI2 = 2 * PI

function generate (size, fn) {
  const arr = new Array(size)
  for (let i = 0; i < size; i++) arr[i] = fn(i / size, i, size)
  return arr
}

function round (arr, n = 4) {
  const m = Math.pow(10, n)
  return arr.map(function (x) {
    const r = Math.round(x * m) / m
    return Object.is(r, -0) ? 0 : r
  })
}

test('Lyons example 1', () => {
  const signal = generate(8, (x) =>
    sin(PI2 * x) + 0.5 * sin(2 * PI2 * x + 3 * PI / 4))

  // signal
  assert.deepEqual(signal.length, 8)
  assert.deepEqual(round(signal), [0.3536, 0.3536, 0.6464, 1.0607, 0.3536, -1.0607, -1.3536, -0.3536])

  // forward
  const forward = dft.forward(signal)
  assert.deepEqual(round(forward.real), [0, 0, 1.4142, 0, 0, 0, 1.4142, 0])
  assert.deepEqual(round(forward.imag), [0, -4, 1.4142, 0, 0, 0, -1.4142, 4])

  // inverse
  const inverse = dft.inverse(forward)
  assert.deepEqual(round(inverse), round(signal))
})

test('forward', () => {
  const size = 8
  const signal = generate(size, (x) => Math.sin(x))
  const result = dft.forward(signal)
  assert.deepEqual(result.real, [3.2520562955298242, -0.5212520123271656, -0.4496171806736543, -0.4375990648812408, -0.4351197797657045, -0.43759906488124195, -0.44961718067365586, -0.5212520123271627])
  assert.deepEqual(result.imag, [0, 1.0435441269071244, 0.42404402499638455, 0.17507452536950258, -3.6977482267336003e-16, -0.1750745253695032, -0.42404402499638527, -1.0435441269071233])
})

test('inverse', () => {
  const size = 1024
  const signal = generate(size, (x) => Math.sin(x))
  const forward = dft.forward(signal)
  const inverse = dft.inverse(forward)
  assert.deepEqual(round(inverse, 8), round(signal, 8))
})
