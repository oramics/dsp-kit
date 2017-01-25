var almost = require('almost-equal')
const test = require('tst')
const assert = require('assert')
var dft = require('..')
var arr = require('dsp-array')

const { PI, sin } = Math
const PI2 = 2 * PI
function round (a, n = 6) { return arr.round(a, n) }

test('Lyons example 1', () => {
  const signal = arr.fill(8, (n, N) =>
    sin(PI2 * n / N) + 0.5 * sin(2 * PI2 * n / N + 3 * PI / 4))

  // signal
  assert.deepEqual(signal.length, 8)
  assert.almost(round(signal, 4), [0.3536, 0.3536, 0.6464, 1.0607, 0.3536, -1.0607, -1.3536, -0.3536])

  // forward
  const freqDomain = dft.dft('forward', signal)
  assert.deepEqual(arr.round(freqDomain.real, 4), [0, 0, 1.4142, 0, 0, 0, 1.4142, 0])
  assert.deepEqual(arr.round(freqDomain.imag, 4), [0, -4, 1.4142, 0, 0, 0, -1.4142, 4])

  // inverse
  const timeDomain = dft.dft('inverse', freqDomain)
  assert.almost(round(timeDomain.real), round(signal))
})

test('forward', () => {
  const size = 8
  const signal = arr.fill(size, (n, N) => Math.sin(n / N))
  const result = dft.dft('forward', signal)
  assert.almost(result.real, [3.2520562955298242, -0.5212520123271656, -0.4496171806736543, -0.4375990648812408, -0.4351197797657045, -0.43759906488124195, -0.44961718067365586, -0.5212520123271627])
  assert.almost(result.imag, [0, 1.0435441269071244, 0.42404402499638455, 0.17507452536950258, -3.6977482267336003e-16, -0.1750745253695032, -0.42404402499638527, -1.0435441269071233])
})

test('inverse', () => {
  const size = 1024
  const signal = arr.fill(size, (n, N) => Math.sin(n / N))
  const forward = dft.dft('forward', signal)
  const inverse = dft.dft('inverse', forward)
  assert.almost(inverse.real, signal)
})

assert.almost = function (x, y, message) {
  if (x.length && y.length) {
    return x.every(function (x, i) {
      return assert.almost(x, y[i], (message || ' : ') + i)
    })
  }

  var EPSILON = 10e-8
  if (!almost(x, y, EPSILON)) assert.fail(x, y, `${x} ≈ ${y}`, '≈ ' + message)
  return true
}
