const { isPrime } = require('../utils')
const assert = require('assert')

// require knowledge of previous primes to work
describe('isPrime', () => {
  it('should return false for 1', () => {
    assert.deepStrictEqual(isPrime([])(1), false)
  })
  it('should return true for 2', () => {
    assert.deepStrictEqual(isPrime([])(2), true)
  })
  it('should be correct for a larger number', () => {
    assert.deepStrictEqual(isPrime([2, 3, 5, 7])(10), false)
    assert.deepStrictEqual(isPrime([2, 3, 5, 7])(11), true)
  })
})
