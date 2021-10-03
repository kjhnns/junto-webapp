import moment from 'moment'

const streakProcessor = checkedTimeStamps => {
  const countDays = (curr, checks) => {
    if (checks.length > 0 && curr.isSame(checks[0], 'day')) {
      checks.shift()
      if (curr.isSame(checks[0], 'day')) {
        return 0 + countDays(curr, checks)
      }
      return 1 + countDays(curr.subtract(1, 'days'), checks)
    }
    return 0
  }
  if (checkedTimeStamps === null || checkedTimeStamps.length === 0) {
    return {
      streak: false,
      streakIncToday: false,
      streakDays: 0,
    }
  }
  const yesterday = moment().subtract(1, 'days')
  const today = moment()

  const sortedTsps = checkedTimeStamps.sort((a, b) => b - a)
  const checkedObjs = sortedTsps.map(moment.unix)
  const streakIncToday = countDays(today, checkedObjs)
  const streakExcToday = countDays(yesterday, checkedObjs)

  const isThereAStreak = streakIncToday > 1 || streakExcToday > 1
  const isTodayIncluded = streakIncToday > streakExcToday
  const streak = isTodayIncluded ? streakIncToday : streakExcToday

  return {
    streak: isThereAStreak,
    streakIncToday: isTodayIncluded,
    streakDays: streak,
  }
}

const longestStreak = checkedTimeStamps => {
  if (checkedTimeStamps === null || checkedTimeStamps.length === 0) {
    return 0
  }
  const today = moment()
  const sortedTsps = checkedTimeStamps.sort((a, b) => b - a)
  const checkedObjs = sortedTsps.map(moment.unix)

  let previous = today.clone()
  let counter = 0
  let longest = 0
  let tstpNo = 0
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (tstpNo in checkedObjs) {
    const tstp = checkedObjs[tstpNo]
    if (!tstp.isSame(previous.subtract(1, 'days'), 'day')) {
      counter = 0
    }
    counter += 1
    longest = Math.max(longest, counter)
    previous = tstp.clone()
  }

  return longest
}

export { streakProcessor, longestStreak }
