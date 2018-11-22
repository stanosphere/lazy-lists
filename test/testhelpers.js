const range = (start, end, step = 1) =>
  Array.from(
    new Array(1 + Math.floor((end - start) / step)),
    (_, i) => start + i * step
  )

const round = dp => x => {
  const y = 10 ** dp
  return Math.round(x * y) / y
}

const compose = (...fs) => x =>
  fs
    .slice()
    .reverse()
    .reduce((res, f) => f(res), x)

module.exports = { compose, range, round }
