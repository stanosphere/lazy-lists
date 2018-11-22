const List = require('../List')
const { range, round } = require('./testhelpers')
const assert = require('assert')

describe('range', () => {
  it('should work for a simple array of integers', () => {
    assert.deepStrictEqual(
      List.range(0, 1, 1).toArray,
      range(0, 1, 1)
    )
  })
  it('should work for a larger array of integers', () => {
    assert.deepStrictEqual(
      List.range(0, 20).toArray,
      range(0, 20)
    )
  })
  it('should work for an array of floats', () => {
    assert.deepStrictEqual(
      List.range(0, 10, 0.1).toArray.map(round(5)),
      range(0, 10, 0.1).map(round(5))
    )
  })
})

describe('fromArray', () => {
  it('should work for an array that has an object in it', () => {
    const arr = [0, 1, 'foo', { paul: { isGreat: true } }]
    assert.deepStrictEqual(List.fromArray(arr).toArray, arr)
  })
})

describe('empty', () => {
  it('should work return th empty list', () => {
    assert.deepStrictEqual(List.empty.toArray, [])
  })
})
