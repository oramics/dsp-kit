var almost = require('almost-equal')
const test = require('tst')
const assert = require('assert')
const kdft = require('dsp-dft')
const dspjs = require('dspjs')
const fftRadix2 = require('..').fftRadix2
const { PI, sin, cos } = Math
const arr = require('dsp-array')

test('small signal against dft', function () {
  const size = 8
  const signal = arr.fill(size, (n, N) => sin(n / N) + cos(0.5 * n / N))
  const dftFreqDomain = kdft.dft('forward', signal)
  const fftFreqDomain = fftRadix2(size).forward(signal)
  assert.almost(fftFreqDomain.real, dftFreqDomain.real)
  assert.almost(fftFreqDomain.imag, dftFreqDomain.imag)

  // inverse-able
  const dftTimeDomain = kdft.dft('inverse', dftFreqDomain)
  const fftTimeDomain = fftRadix2(size).inverse(fftFreqDomain)
  assert.almost(fftTimeDomain.real, signal)
  assert.almost(fftTimeDomain.real, dftTimeDomain.real)
  assert.almost(fftTimeDomain.imag, new Float32Array(size))
})

test('big random signal against dspjs', () => {
  var SIZE = 1024 * 8
  var ref = new dspjs.FFT(SIZE, 44100)
  var ft = fftRadix2(SIZE)
  var signal = arr.fill(SIZE, () => Math.random() * 2 - 1)
  var refFreqDomain, freqDomain
  var refTimeDomain, timeDomain

  test('forward', () => {
    test('dspjs', () => {
      ref.forward(signal)
      refFreqDomain = { real: ref.real, imag: ref.imag }
    })
    test('dsp-kit', () => {
      freqDomain = ft.forward(signal)
    })
    test('compare', () => assert.almost(freqDomain.real, refFreqDomain.real, 0.01))
  })

  test('inverse', () => {
    test('dspjs', () => {
      ref.inverse(refFreqDomain.real, refFreqDomain.imag)
      refTimeDomain = ref.real
    })
    test('dsp-kit', () => {
      timeDomain = ft.inverse(freqDomain).real
    })
    test('dsp-kit vs. signal', () => assert.almost(timeDomain, signal))
    test.skip('dspjs vs signal', () => assert.almost(refTimeDomain, signal))
    test.skip('dsp-kit vs. dspjs', () => assert.almost(timeDomain, refTimeDomain))
  })
})

test('common signal against ref dspjs', () => {
  const size = 1024

  // create signal
  var signal = arr.fill(size, (n, N) => sin(n / N) - cos(n / N + 0.75 * PI))
  assert.equal(Math.max(...signal), 1.8182117098462318)

  // forward
  var ref = new dspjs.FFT(size, 44100)
  ref.forward(signal)
  const refFreqDomain = { real: ref.real, imag: ref.imag }
  const fftFreqDomain = fftRadix2(size).forward(signal)
  const dftFreqDomain = kdft.dft('forward', signal)

  assert.almost(fftFreqDomain.real, refFreqDomain.real, 0, 'fft vs ref (real)')
  assert.almost(fftFreqDomain.imag, refFreqDomain.imag)
  assert.almost(fftFreqDomain.real, dftFreqDomain.real)
  assert.almost(fftFreqDomain.imag, dftFreqDomain.imag)

  // inverse
  const refTimeDomain = ref.inverse(refFreqDomain.real, refFreqDomain.imag)
  const fftTimeDomain = fftRadix2(size).inverse(fftFreqDomain)
  const dftTimeDomain = kdft.dft('inverse', dftFreqDomain)
  assert.almost(fftTimeDomain.real, refTimeDomain)
  assert.almost(fftTimeDomain.real, dftTimeDomain.real)
  assert.almost(fftTimeDomain.imag, dftTimeDomain.imag)
})

const isNum = (x) => typeof x === 'number' && !isNaN(x)

test('semi real example', function () {
  const SIZE = 1024
  const WINDOW = 128
  const HOP = 40
  const signal = arr.fill(SIZE, (n, N) => sin(2 * PI * (n / (N - 1))))
  const window = arr.fill(WINDOW, (n, N) => 0.5 * (1 - cos(2 * PI * n / (N - 1))))
  const buffer = arr.zeros(WINDOW)
  const win = arr.zeros(WINDOW)
  const complex = { real: arr.zeros(WINDOW), imag: arr.zeros(WINDOW) }
  const fft = fftRadix2(WINDOW)
  var ref = new dspjs.FFT(WINDOW, 44100)
  const result = []
  for (var i = 0; i < SIZE; i += HOP) {
    buffer.set(signal.subarray(i, i + WINDOW))
    assert(arr.testAll(WINDOW, isNum, buffer), 'subarray is numeric')
    arr.mult(buffer, window, win)
    assert(arr.testAll(WINDOW, isNum, win), 'window is numeric')
    fft.forward(buffer, complex)
    ref.forward(buffer)
    assert.almost(complex.real, ref.real)
    result.push(arr.testAll(WINDOW, isNum, complex.real))
  }
  const num = Math.floor(SIZE / HOP) + 1
  assert.equal(result.length, num)
  const expected = arr.fill(num, () => true)
  assert.almost(result, expected)
})

var EPSILON = 10e-4
assert.almost = function (x, y, epsilon, message) {
  epsilon = epsilon || EPSILON
  if (x.length && y.length) {
    return x.every(function (x, i) {
      return assert.almost(x, y[i], epsilon, (message || '') + ' - index: ' + i)
    })
  }

  if (!almost(x, y, epsilon)) assert.fail(x, y, `${x} ≈ ${y}`, '≈ ' + message + '(' + epsilon + ')')
  return true
}
