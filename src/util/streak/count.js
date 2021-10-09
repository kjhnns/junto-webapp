import { maximumStreakFreezes, streakFreezeSpeed } from './common'

const count = (stopDate, currDate, checkDates, freezeDays, counter) => {
  const failSafeCounter = counter || 0

  const incrementFreezeDays = freeze =>
    Math.min(
      /// Shady hack because javascript is so bad with floating point numbers
      Math.round(
        freeze * 100000 +
          Math.round(streakFreezeSpeed[Math.floor(freezeDays)] * 100000) +
          1
      ) / 100000,
      maximumStreakFreezes
    )

  console.log(
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
        console.log('+0 double counting')
        return count(
          stopDate,
          currDate,
          checkDates,
          freezeDays,
          failSafeCounter
        )
      }
      console.log('+1')

      // Stop criteria is met ,
      if (currDate.diff(stopDate, 'days') >= 0) {
        return [
          failSafeCounter + 1,
          Math.floor(incrementFreezeDays(freezeDays)),
        ]
      }

      // Stop criteria is not met, continue counting
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
      console.log('+0 freeze')

      // Stop criteria is met ,
      if (currDate.diff(stopDate, 'days') >= 0) {
        return [failSafeCounter, Math.floor(freezeDays) - 1]
      }

      // Stop criteria is not met, continue counting
      return count(
        stopDate,
        currDate.add(1, 'days'),
        checkDates,
        Math.floor(freezeDays) - 1,
        failSafeCounter
      )
    }

    // Reset the counter and continue counting with the next day
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
    console.log(
      'no more checks',
      currDate,
      stopDate,
      currDate.isSame(stopDate, 'day')
    )

    // Stop Date criteria is met
    if (currDate.diff(stopDate, 'days') >= 0) {
      console.log('stopDate trigger', currDate.diff(stopDate, 'days'), [
        failSafeCounter,
        freezeDays,
      ])

      if (Math.floor(freezeDays) > 0) {
        return [failSafeCounter, Math.floor(freezeDays) - 1]
      }

      // No streak, if you have no freezes and no checks, so close yet so far.
      return [0, 0]
    }

    // Stop criteria is not met but you still have freezes then good luck!
    if (Math.floor(freezeDays) > 0) {
      console.log('+0 crunch freeze days till stopDate')
      return count(
        stopDate,
        currDate.add(1, 'days'),
        checkDates,
        Math.floor(freezeDays) - 1,
        failSafeCounter
      )
    }

    // no more checks, no more freezes, not stop date, you are out.
    return [0, 0]
  }
}

export default count
