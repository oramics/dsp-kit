/* eslint-disable comma-spacing */
var test = require('tst')
var assert = require('assert')
var arr = require('dsp-array')
var dspjs = require('dspjs')
var dsp = require('..')

test('single delay', function () {
  var impulse = arr.gen(16, (x) => x ? 0 : 1)

  var legacy = new dspjs.SingleDelay(10, 5, 0.5)
  var reference = legacy.process(impulse)
  assert.deepEqual(reference, [0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0])

  var delay = dsp.delay({ delay: 5, delayGain: 0.5 })
  assert.deepEqual(delay(impulse), reference)
})

test('multi-delay', function () {
  var impulse = arr.gen(16, (x) => x % 2 ? 0 : 1)
  assert.deepEqual(impulse, [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0])

  var legacy = new dspjs.MultiDelay(10, 3, 1, 0.5)
  var reference = legacy.process(impulse)
  assert.deepEqual(reference, [1, 0, 1, 0.5, 1, 0.5, 1.25, 0.5, 1.25, 0.625, 1.25, 0.625, 1.3125, 0.625, 1.3125, 0.65625])
  var diff = arr.substr(16, reference, impulse)
  assert.deepEqual(diff, [0, 0, 0, 0.5, 0, 0.5, 0.25, 0.5, 0.25, 0.625, 0.25, 0.625, 0.3125, 0.625, 0.3125, 0.65625])

  var delay = dsp.delay({ delay: 3, delayGain: 0.5, feedback: 0.5 })
  // assert.deepEqual(arr.add(impulse, delay(impulse)), null, 'JODER')
})
