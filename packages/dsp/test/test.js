const test = require('tst')
const assert = require('assert')
const dsp = require('..')

test('export all', function () {
  assert.equal(Object.keys(dsp).length, 20)
})
