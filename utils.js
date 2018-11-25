const isPrime = listOfprimes => candidate => {
  if (candidate === 1) return false
  for (let i = 0; i <= listOfprimes.length; i++)
    if (candidate % listOfprimes[i] === 0) return false
  return true
}

module.exports = { isPrime }
