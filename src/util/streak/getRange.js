import { maximumStreakFreezes } from './common'

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
    // // console.log(selection[0].diff(all[0], 'days'),'<=', (maximumStreakFreezes + 1))
    const swapItem = all.shift()
    return getRange(all, [swapItem, ...selection])
  }

  return selection
}

export default getRange
