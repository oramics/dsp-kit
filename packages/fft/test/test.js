var test = require('tst')
var assert = require('assert')
var fft = require('..')

test('export fft', () => {
  assert(typeof fft.fft === 'function')
  var ft = fft.fft(1024)
  assert(typeof ft.forward === 'function')
  assert(typeof ft.inverse === 'function')
})
