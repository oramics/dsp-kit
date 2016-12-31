const test = require('tst')
const assert = require('assert')
const dft = require('dsp-dft')
const FFT = require('dspjs').FFT
const fft = require('..')
const { PI, sin, cos } = Math

test('generate', function () {
  // we don't want generate to fail and break our tests
  const signal = generate(10, (x) => sin(x))
  assert.deepEqual(signal, Float64Array.from([0, 0.09983341664682815, 0.19866933079506122, 0.29552020666133955, 0.3894183423086505, 0.479425538604203, 0.5646424733950354, 0.644217687237691, 0.7173560908995228, 0.7833269096274834]))
  assert.equal(Math.max(...signal), 0.7833269096274834)
})

test('small signal against dft', function () {
  const size = 8
  const signal = generate(size, (x) => sin(x) + cos(0.5 * x))
  const dftForward = dft.dft(signal)
  const result = {
    real: [10.981576461657575, -0.5115049640867155, -0.40341004810465325, -0.3851709565429806, -0.3814045241888795, -0.3851709565429834, -0.40341004810465736, -0.5115049640867091],
    imag: [0, 0.89478152366568, 0.3627155627753045, 0.149692012762088, -8.107593852744347e-16, -0.14969201276208866, -0.36271556277530603, -0.8947815236656782]
  }
  assert.deepEqual(dftForward.real, Float64Array.from(result.real))
  assert.deepEqual(dftForward.imag, Float64Array.from(result.imag))
  const fftForward = fft.fft(signal)
  assert.deepEqual(round(fftForward.real), round(Float64Array.from(result.real)))
  assert.deepEqual(round(fftForward.imag), round(Float64Array.from(result.imag)))

  // inverse-able
  const dftInverse = dft.idft(dftForward).real
  assert.deepEqual(round(dftInverse), round(signal))
  const fftInverse = fft.ifft(dftForward)
  assert.deepEqual(round(fftInverse), round(signal))
})

test('common signal', () => {
  const size = 1024
  var legacy = new FFT(size, 44100)

  // create signal
  var signal = generate(size, (x) => sin(x) - cos(x + 0.75 * PI))
  assert.equal(Math.max(...signal), 1.8182117098462318)

  // forward
  legacy.forward(signal)
  const dspForward = { real: legacy.real, imag: legacy.imag }
  const fftForward = fft.fft(signal)
  const dftForward = dft.dft(signal)

  assert.deepEqual(round(fftForward.real), round(dspForward.real))
  assert.deepEqual(round(fftForward.imag), round(dspForward.imag))
  assert.deepEqual(round(fftForward.real), round(dftForward.real))
  assert.deepEqual(round(fftForward.imag), round(dftForward.imag))
  assert.equal(Math.max(...dspForward.real), 1412.3213748300154)
  assert.equal(Math.max(...fftForward.real), 1412.3213748300154)

  // inverse
  const dspInverse = legacy.inverse(dspForward.real, dspForward.imag)
  const fftInverse = fft.ifft(fftForward)
  const dftInverse = dft.idft(dftForward).real
  assert.deepEqual(round(fftInverse), round(dspInverse))
  assert.deepEqual(round(fftInverse), round(dftInverse))
})

// A handy signal generator
function generate (size, fn) {
  var arr = new Float64Array(size)
  for (let i = 0; i < size; i++) arr[i] = fn(i / size, i, size)
  return arr
}

// There are small differences of precission between algorithms. We round all
// the values to a default precision of 8 decimals to get comparable results
function round (arr, n = 8) {
  const m = Math.pow(10, n)
  return arr.map(function (x) {
    const r = Math.round(x * m) / m
    return Object.is(r, -0) ? 0 : r
  })
}
