const List = require('../List')
const { range, compose } = require('./testhelpers')
const assert = require('assert')

describe('map', () => {
  it('should work for an array of integers', () => {
    const mapper = x => x * 2
    assert.deepStrictEqual(
      List.range(0, 20).map(mapper).toArray,
      range(0, 20).map(mapper)
    )
  })
  it('should work when we compose some maps', () => {
    const m1 = x => x * 2
    const m2 = x => x + 1
    const m3 = x => x * x
    assert.deepStrictEqual(
      List.range(0, 1, 20)
        .map(m1)
        .map(m2)
        .map(m3).toArray,
      range(0, 1, 20)
        .map(m1)
        .map(m2)
        .map(m3)
    )
    const f = compose(
      m1,
      m2,
      m3
    )
    assert.deepStrictEqual(
      List.range(0, 20).map(f).toArray,
      range(0, 20).map(f)
    )
  })
})

describe('take', () => {
  it('should work for an array of integers', () => {
    assert.deepStrictEqual(
      List.range(0, 20).take(2).toArray,
      range(0, 2)
    )
  })
})

describe('drop', () => {
  it('should work for an array of integers', () => {
    assert.deepStrictEqual(
      List.range(0, 20).drop(2).toArray,
      range(2, 20)
    )
  })
})
