import moment from 'moment'
import { maximumStreakFreezes } from './common'

import getLatest from './getLatest'
import getRange from './getRange'

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
  const checkedObjsDescending = sortedTsps
    .map(d => moment(`${d}`, 'YYYYMMDD'))
    .filter(x => x.isValid())

  const today = moment()
  const yesterday = moment().subtract(1, 'day')

  const isTodayChecked =
    checkedObjsDescending.length > 0 &&
    checkedObjsDescending[0].isSame(today, 'day')

  const isYesterdayChecked =
    checkedObjsDescending.length > 0 &&
    checkedObjsDescending[0].isSame(yesterday, 'day')

  const daysFromTodayGTMaxFreeze =
    checkedObjsDescending.length > 0 &&
    today.diff(checkedObjsDescending[0], 'day') > maximumStreakFreezes

  // Easy termination to prevent unnecessary comuputing
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
    isTodayChecked ? today : yesterday
  )
  // console.log(streakDayCount, streakFreezes)

  // TODO ADD STREAKFREEZE CONSIDERATIONS
  const isThereAStreak = streakDayCount > 0

  return {
    streak: isThereAStreak,
    streakIncToday: isTodayChecked,
    streakFrozen: isThereAStreak && !isTodayChecked && !isYesterdayChecked,
    streakFreezes,
    streakDays: streakDayCount,
  }
}

export default streakProcessor
