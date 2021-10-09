const maximumStreakFreezes = 3
const streakFreezeSpeed = [1 / 3, 1 / 7, 1 / 14]

const getRange = (all, selection) => {
  // initialization
  if (all.length > 0 && selection.length === 0) {
    const newCheck = all.shift()
    return getRange(all, [newCheck, ...selection])
  }
  if (
    all.length > 0 &&
    selection[0].diff(all[0], 'days') <= maximumStreakFreezes + 1
  ) {
    // console.log(selection[0].diff(all[0], 'days'),'<=', (maximumStreakFreezes + 1))
    const swapItem = all.shift()
    return getRange(all, [swapItem, ...selection])
  }

  return selection
}

const count = (curr, checks, freezes) => {
  const incrementFreezes = freeze =>
    Math.min(
      freeze + streakFreezeSpeed[Math.floor(freezes)],
      maximumStreakFreezes
    )

  if (checks.length == 0) {
    return 0
  }
  console.log(curr, checks, freezes)

  // Day matches the current day
  if (curr.isSame(checks[0], 'day')) {
    checks.shift()
    if (checks.length > 0 && curr.isSame(checks[0], 'day')) {
      // This avoids double counting the same day
      // Add zero so it skips until the next day that it looks at is not the same
      console.log('+0 no double count')
      return 0 + count(curr, checks, freezes)
    }
    console.log('+1')
    return 1 + count(curr.add(1, 'days'), checks, incrementFreezes(freezes))
  }

  // Streak freezes
  if (Math.floor(freezes) > 0) {
    console.log('+0 freeze')
    return 0 + count(curr.add(1, 'days'), checks, Math.floor(freezes) - 1)
  }

  // no more days
  console.log('no more days')
  return 0
}

const getMax = (checks, max) => {
  if (checks.length > 0) {
    const countedDays = count(checks[0], checks, 0)
    return getMax(checks, Math.max(max, countedDays))
  }
  return max
}

export { count, getRange, getMax }
