import { maximumStreakFreezes, streakFreezeSpeed } from './common'

const count = (stopDate, currDate, checkDates, freezeDays, counter) => {
  const failSafeCounter = counter || 0

  const incrementFreezeDays = freeze =>
    Math.min(
      freeze + streakFreezeSpeed[Math.floor(freezeDays)],
      maximumStreakFreezes
    )

  // console.log(stopDate, currDate, checkDates, freezeDays, failSafeCounter, currDate.diff(stopDate, 'days'))

  // Day matches the currDateent day
  if (checkDates.length > 0 && currDate.isSame(checkDates[0], 'day')) {
    checkDates.shift()
    if (checkDates.length > 0 && currDate.isSame(checkDates[0], 'day')) {
      // This avoids double counting the same day
      // Add zero so it skips until the next day that it looks at is not the same
      // console.log('+0 double counting')
      return count(stopDate, currDate, checkDates, freezeDays, failSafeCounter)
    }
    // console.log('+1')
    return count(
      stopDate,
      currDate.add(1, 'days'),
      checkDates,
      incrementFreezeDays(freezeDays),
      failSafeCounter + 1
    )
  }

  // Streak freezeDays
  if (checkDates.length > 0 && Math.floor(freezeDays) > 0) {
    // console.log('+0 freeze')
    return count(
      stopDate,
      currDate.add(1, 'days'),
      checkDates,
      Math.floor(freezeDays) - 1,
      failSafeCounter
    )
  }

  // CurrDate is younger than StopDate, stop
  if (currDate.diff(stopDate, 'days') >= 0) {
    // console.log('stopDate trigger', currDate.diff(stopDate, 'days'))
    return [failSafeCounter, Math.floor(freezeDays)]
  }

  // no more days
  // console.log('no more days',currDate,stopDate,currDate.isSame(stopDate, 'day'))

  // if currDate is not today then crunsh through the streak freezeDays
  if (
    checkDates.length === 0 &&
    !currDate.isSame(stopDate, 'day') &&
    freezeDays > 0
  ) {
    // console.log('crunch till stop date')
    return count(
      stopDate,
      currDate.add(1, 'days'),
      checkDates,
      Math.floor(freezeDays) - 1,
      failSafeCounter
    )
  }

  // console.log('else case return')
  return [failSafeCounter, Math.floor(freezeDays)]
}

export default count
