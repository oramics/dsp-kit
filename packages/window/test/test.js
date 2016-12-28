const test = require('tst')
const assert = require('assert')
const windows = require('..')

test('rectangular', function () {
  assert(windows.rectangular)
  assert(windows.none === windows.rectangular)
})

test('hanning', function () {
  assert(windows.hanning)
})
