import moment from 'moment'

const streakProcessor = checkedTimeStamps => {
  const countDays = (curr, checks) => {
    if (checks.length > 0 && curr.isSame(checks[0], 'day')) {
      checks.shift()
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

export { streakProcessor }
