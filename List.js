// https://gist.github.com/gvergnaud/6e9de8e06ef65e65f18dbd05523c7ca9

class List {
  constructor(generator) {
    this[Symbol.iterator] = generator
  }

  // fromArray :: Array a -> List a
  static fromArray(iterable) {
    return new List(function*() {
      yield* iterable
    })
  }

  // range :: (Number, Number, Number) -> List Number
  static range(start, end, step = 1) {
    return new List(function*() {
      let i = start
      while (i <= end) {
        yield i
        i += step
      }
    })
  }

  // empty :: List
  static get empty() {
    return new List(function*() {})
  }

  concat(iterable) {
    const generator = this[Symbol.iterator]
    return new List(function*() {
      yield* generator()
      yield* iterable
    })
  }

  // filter (a -> Boolean) -> List a
  filter(predicate) {
    const generator = this[Symbol.iterator]
    return new List(function*() {
      for (const value of generator()) {
        if (predicate(value)) yield value
      }
    })
  }

  // I think a scan is like a reduce but returns an array of accumulants
  scan(scanner, seed) {
    const generator = this[Symbol.iterator]
    return new List(function*() {
      let acc = seed
      for (const value of generator()) {
        yield (acc = scanner(acc, value))
      }
    })
  }

  // map :: (a -> b) -> List b
  map(mapper) {
    const generator = this[Symbol.iterator]
    return new List(function*() {
      for (const value of generator()) {
        yield mapper(value)
      }
    })
  }

  // reduce :: ((a, b) -> a), a) -> a
  reduce(reducer, seed) {
    const generator = this[Symbol.iterator]
    let acc = seed
    for (const value of generator()) {
      acc = reducer(acc, value)
    }
    return acc
  }

  ap(list) {
    const generator = this[Symbol.iterator]
    return new List(function*() {
      for (const f of generator()) {
        yield* list.map(f)
      }
    })
  }

  // take :: Number -> List a
  take(n) {
    const generator = this[Symbol.iterator]
    return new List(function*() {
      let i = 0
      for (const value of generator()) {
        if (i <= n) {
          yield value
          i += 1
        } else {
          break
        }
      }
    })
  }

  // drop :: Number -> List a
  drop(n) {
    const generator = this[Symbol.iterator]
    return new List(function*() {
      let i = 0
      for (const value of generator()) {
        if (i < n) {
          i += 1
        } else {
          yield value
        }
      }
    })
  }

  // this could probably be less dreadful
  // zipWith :: (List b, (a, b) -> c) -> List c
  zipWith(lazyList, zipper) {
    const generator1 = this[Symbol.iterator]
    const generator2 = lazyList[Symbol.iterator]
    return new List(function*() {
      const iterator1 = generator1()
      const iterator2 = generator2()
      let next1 = iterator1.next()
      let next2 = iterator2.next()

      while (!next1.done && !next2.done) {
        yield zipper(next1.value, next2.value)
        next1 = iterator1.next()
        next2 = iterator2.next()
      }
    })
  }

  // head :: a
  get head() {
    return this.take(1)
  }

  // tail :: a
  get tail() {
    return this.drop(1)
  }

  // toArray :: Array
  get toArray() {
    return [...this]
  }
}

// const slo = x => {
//   console.log("_")
//   const _ = y => y < 2 ? 1 : _(y - 1) + _(y - 2)
//   return _(x)
// }

// console.log(List.range(0, 100, 1).drop(90).reduce((a, b) => {
//   slo(30)
//   return a + b
// }, 0))

module.exports = List
