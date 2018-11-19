const List = require('./List')
const assert = require('assert')

test('range', () => {
  assert.deepStrictEqual(List.range(0, 1, 1).toArray, [
    0,
    1,
  ])
})
