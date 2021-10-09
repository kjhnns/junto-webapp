import count from './count'

const getLatest = (checks, max, stopDate) => {
  const sStopDate = stopDate || checks[checks.length - 1]
  if (checks.length > 0) {
    const currCount = count(sStopDate, checks[0], checks, 0, 0)
    return getLatest(checks, currCount, sStopDate)
  }
  return max
}

export default getLatest
