/* eslint-disable comma-spacing */
const test = require('tst')
const assert = require('assert')
const _ = require('..')

test('logic', () => {
  test('and', () => {
    assert.equal(_.and(1, 1)(), 1)
    assert.equal(_.and(1, 0)(), 0)
    assert.equal(_.and(0, 1)(), 0)
    assert.equal(_.and(0, 0)(), 0)
  })

  test('or', () => {
    assert.equal(_.or(1, 1)(), 1)
    assert.equal(_.or(1, 0)(), 1)
    assert.equal(_.or(0, 1)(), 1)
    assert.equal(_.or(0, 0)(), 0)
  })
})
