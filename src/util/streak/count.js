import { maximumStreakFreezes, streakFreezeSpeed } from './common'

const isDebugMode = false
const printLog = (...msg) => isDebugMode && console.log(...msg)

const incrementFreezeDays = freeze =>
  Math.min(
    /// Shady hack because javascript is so bad with floating point numbers
    Math.round(
      freeze * 100000 +
        Math.round(streakFreezeSpeed[Math.floor(freeze)] * 100000) +
        1
    ) / 100000,
    maximumStreakFreezes
  )

const isStopCriteriaMet = (currDate, stopDate) =>
  currDate.isSameOrAfter(stopDate, 'day')

const count = (stopDate, currDate, checkDates, freezeDays, counter) => {
  const failSafeCounter = counter || 0

  printLog(
    stopDate.format('MMDD'),
    currDate.format('MMDD'),
    checkDates.map(x => x.format('MMDD')),
    freezeDays,
    failSafeCounter,
    currDate.diff(stopDate, 'days')
  )

  // Do you still have checks?
  if (checkDates.length > 0) {
    // Check day matches current day
    if (currDate.isSame(checkDates[0], 'day')) {
      checkDates.shift()
      if (checkDates.length > 0 && currDate.isSame(checkDates[0], 'day')) {
        // This avoids double counting the same day
        // Add zero so it skips until the next day that it looks at is not the same
        printLog('1 return +0 double counting')
        return count(
          stopDate,
          currDate,
          checkDates,
          freezeDays,
          failSafeCounter
        )
      }
      printLog('+1')

      // Stop criteria is met ,
      if (isStopCriteriaMet(currDate, stopDate)) {
        printLog('2 return +1 stop criteria')
        return [
          failSafeCounter + 1,
          Math.floor(incrementFreezeDays(freezeDays)),
        ]
      }

      // Stop criteria is not met, continue counting
      printLog('3 return +1 continue')
      return count(
        stopDate,
        currDate.add(1, 'days'),
        checkDates,
        incrementFreezeDays(freezeDays),
        failSafeCounter + 1
      )
    }

    // Check Day does not match the current day --> Freeze if you can
    if (Math.floor(freezeDays) > 0) {
      printLog('+0 freeze')

      // Stop criteria is met ,
      if (isStopCriteriaMet(currDate, stopDate)) {
        printLog('4 return +0 stop criteria')
        return [failSafeCounter, Math.floor(freezeDays) - 1]
      }

      // Stop criteria is not met, continue counting
      printLog('5 return +0 continue')
      return count(
        stopDate,
        currDate.add(1, 'days'),
        checkDates,
        Math.floor(freezeDays) - 1,
        failSafeCounter
      )
    }

    // Reset the counter and continue counting with the next day
    printLog('6 return +0 done')
    return [failSafeCounter, freezeDays]
    // return count(
    //   stopDate,
    //   currDate.add(1, 'days'),
    //   checkDates,
    //   0,
    //   0
    // )
  } else {
    // no more days
    printLog(
      'no more checks',
      currDate,
      stopDate,
      currDate.isSameOrAfter(stopDate, 'day')
    )

    // Stop Date criteria is met
    if (isStopCriteriaMet(currDate, stopDate)) {
      printLog('stopDate trigger', currDate.diff(stopDate, 'days'), [
        failSafeCounter,
        freezeDays,
      ])

      if (Math.floor(freezeDays) > 0) {
        return [failSafeCounter, Math.floor(freezeDays) - 1]
      }

      // No streak, if you have no freezes and no checks, so close yet so far.
      printLog('7 return no streak')
      return [0, 0]
    }

    // Stop criteria is not met but you still have freezes then good luck!
    if (Math.floor(freezeDays) > 0) {
      printLog('+0 crunch freeze days till stopDate')
      printLog('8 return +0 crunch freeze days')
      return count(
        stopDate,
        currDate.add(1, 'days'),
        checkDates,
        Math.floor(freezeDays) - 1,
        failSafeCounter
      )
    }

    // no more checks, no more freezes, not stop date, you are out.
    printLog(
      '9 return no more checks, no more freezes, not stop date, you are out.'
    )
    return [0, 0]
  }
}

export default count
