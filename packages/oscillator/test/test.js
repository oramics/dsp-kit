var test = require('tst')
var assert = require('assert')
var dspjs = require('dspjs')
var osc = require('..')

test('simple sin oscillator', function () {
  var sinejs = new dspjs.Oscillator(dspjs.SINE, 440, 1, 256, 44100)
  var sine = osc.oscillator({ type: 'sine', sampleRate: 44100, defaultSize: 256 })
  assert.deepEqual(sinejs.generate(), sine({ frequency: 440 }))
  assert.deepEqual(sinejs.generate(), sine({ frequency: 440 }))
  assert.deepEqual(sinejs.generate(), sine({ frequency: 440 }))
})
