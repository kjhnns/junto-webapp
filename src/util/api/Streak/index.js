import moment from 'moment'
import {
  count,
  getMax,
  getLatest,
  getRange,
  maximumStreakFreezes,
} from './count'

const streakProcessor = checkedTimeStamps => {
  if (checkedTimeStamps === null || checkedTimeStamps.length === 0) {
    return {
      streak: false,
      streakIncToday: false,
      streakFrozen: false,
      streakFreezes: 0,
      streakDays: 0,
    }
  }

  const sortedTsps = checkedTimeStamps.sort((a, b) => b - a)
  const checkedObjsDescending = sortedTsps.map(moment.unix)

  const today = moment()
  const yesterday = moment().subtract(1, 'day')
  const isToday =
    checkedObjsDescending.length > 0 &&
    checkedObjsDescending[0].isSame(today, 'day')
  const isYesterday =
    checkedObjsDescending.length > 0 &&
    checkedObjsDescending[0].isSame(yesterday, 'day')

  const daysFromTodayGTMaxFreeze =
    checkedObjsDescending.length > 0 &&
    today.diff(checkedObjsDescending[0], 'day') > maximumStreakFreezes

  // console.log(today.diff(checkedObjsDescending[0], 'day'), maximumStreakFreezes + 1)
  if (daysFromTodayGTMaxFreeze) {
    return {
      streak: false,
      streakIncToday: false,
      streakFrozen: false,
      streakFreezes: 0,
      streakDays: 0,
    }
  }

  const checkedObjsAscending = getRange(checkedObjsDescending, [])
  const [streakDayCount, streakFreezes] = getLatest(
    checkedObjsAscending,
    0,
    yesterday
  )
  // TODO ADD STREAKFREEZE CONSIDERATIONS
  const isThereAStreak = streakDayCount > 0

  return {
    streak: isThereAStreak,
    streakIncToday: isToday,
    streakFrozen: !isToday && !isYesterday,
    streakFreezes: streakFreezes,
    streakDays: streakDayCount,
  }
}

const longestStreak = checkedTimeStamps => {
  if (checkedTimeStamps === null || checkedTimeStamps.length === 0) {
    return 0
  }

  const sortedTsps = checkedTimeStamps.sort((a, b) => a - b)
  const checkedObjsAscending = sortedTsps.map(moment.unix)

  const longestStreak = getMax(checkedObjsAscending, 0)

  return longestStreak
}

export { streakProcessor, longestStreak, count }
