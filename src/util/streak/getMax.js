import count from './count'

const getMax = (checks, max) => {
  const sStopDate = checks[checks.length - 1]
  if (checks.length > 0) {
    const [currCount] = count(sStopDate, checks[0], checks, 0, 0)
    if (max > currCount) {
      return getMax(checks, max)
    }
    return getMax(checks, currCount)
  }
  return max
}

export default getMax
