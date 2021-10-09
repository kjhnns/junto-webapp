import moment from 'moment'
import { count, getMax, getRange } from './count'

const streakProcessor = checkedTimeStamps => {
  if (checkedTimeStamps === null || checkedTimeStamps.length === 0) {
    return {
      streak: false,
      streakIncToday: false,
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

  const checkedObjsAscending = getRange(checkedObjsDescending, [])
  const streakDayCount = getMax(checkedObjsAscending, 0)

  const isThereAStreak = streakDayCount > 0 && (isToday || isYesterday)

  return {
    streak: isThereAStreak,
    streakIncToday: isToday,
    streakDays: streakDayCount,
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

export { streakProcessor, longestStreak, count }
