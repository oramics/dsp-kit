var test = require('tst')
var assert = require('assert')
var noise = require('..')

test('white noise', () => {
  assert(typeof noise.white() === 'function')
})

test('pink noise', () => {
  assert(typeof noise.pink() === 'function')
})

test('brown noise', () => {
  assert(typeof noise.pink() === 'function')
})
