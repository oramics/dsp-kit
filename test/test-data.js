var test = require('tst')
var assert = require('assert')
var almost = require('almost-equal')
var dsp = require('../packages/dsp')

var data = {
  signal: require('./data/noise4096.json'),
  fft: {
    real: require('./data/noise4096fft-real.json'),
    imag: require('./data/noise4096fft-imag.json')
  },
  ifft: {
    real: require('./data/noise4096ifft-real.json'),
    imag: require('./data/noise4096ifft-imag.json')
  },
  polar: {
    magnitudes: require('./data/noise4096fft-abs.json'),
    phases: require('./data/noise4096fft-angle.json')
  },
  unwrap: require('./data/noise4096fft-unwrap.json')
}

test('fft', () => {
  test('fft forward', () => {
    var result = dsp.fft(4096).forward(data.signal)
    assert.almost(result.real, data.fft.real)
    assert.almost(result.imag, data.fft.imag)
  })

  test('fft inverse', () => {
    var result = dsp.fft(4096).inverse(data.fft)
    assert.almost(result.real, data.ifft.real)
    assert.almost(result.imag, data.ifft.imag)
  })
})

test('spectrum', () => {
  test('magnitudes and phases', () => {
    var result = dsp.polar(data.fft)
    assert.almost(result.magnitudes, data.polar.magnitudes)
    assert.almost(result.phases, data.polar.phases)
  })

  test('phase unwrap', () => {
    var result = dsp.unwrap(data.polar.phases)
    assert.almost(result, data.unwrap)
  })
})

var EPSILON = 10e-6
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
