const test = require('tst')
const assert = require('assert')
const buffer = require('dsp-array')
const overlapAdd = require('..').overlapAdd

const average = (arr) => arr.reduce((a, b) => a + b) / arr.length

test.skip('micro overlap', function () {
  const size = 10
  const length = 20
  const stretch = overlapAdd({ size: size })
  const source = buffer.generate(length, (x) => 1)
  const result = stretch(2, source)
  assert.equal(result.length, 50)
  assert.deepEqual(result)
})

test.skip('overlap and add', function () {
  const len = 10000
  const win = 1024
  var signal = buffer.generate(len, (x) => 1)
  var stretch = overlapAdd()
  var result = stretch(0.5, signal)
  assert.equal(result.length, 4608)
  // remove the extremes (window fade in and fadout)
  var stable = result.slice(win, len - win)
  var deviation = Math.abs(1 - average(stable))
  assert.equal(deviation)
})
