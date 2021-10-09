import count from './count'

const getMax = (checks, max, stopDate) => {
  const sStopDate = stopDate || checks[checks.length - 1]
  if (checks.length > 0) {
    const [currCount, _] = count(sStopDate, checks[0], checks, 0, 0)
    if (max > currCount) {
      return getMax(checks, max)
    } else {
      return getMax(checks, currCount)
    }
  }
  return max
}

export default getMax
