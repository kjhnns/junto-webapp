import moment from 'moment'
import { count, getRange } from '../count'

describe('StreakProcessor - getRange', () => {
  test('getRange empty array should be robust', async () => {
    const streakChecks = []
    const range = getRange(streakChecks, [])
    expect(range.length).toBe(0)
  })

  test('getRange expect it to skip {maximumStreakFreeze} days (good case)', async () => {
    const streakChecks = [
      moment('2021-10-19').unix(),
      moment('2021-10-18').unix(),
      moment('2021-10-17').unix(),
      // moment('2021-10-16').unix(),
      moment('2021-10-15').unix(),
      moment('2021-10-14').unix(),
      moment('2021-10-13').unix(),
      // moment('2021-10-12').unix(),
      // moment('2021-10-11').unix(),
      // moment('2021-10-10').unix(),
      moment('2021-10-09').unix(),
      moment('2021-10-08').unix(),
      moment('2021-10-07').unix(), // << should be the start date
    ]

    const sortedTsps = streakChecks.sort((a, b) => b - a)
    const checkedObjs = sortedTsps.map(moment.unix)
    const range = getRange(checkedObjs, [])
    expect(range.length).toBe(9)
  })

  test('getRange expect it to skip {maximumStreakFreeze} days (skip dates that are out of range)', async () => {
    const streakChecks = [
      moment('2021-10-19').unix(),
      moment('2021-10-18').unix(),
      moment('2021-10-17').unix(),
      // moment('2021-10-16').unix(),
      moment('2021-10-15').unix(),
      moment('2021-10-14').unix(),
      moment('2021-10-13').unix(), // << should be the start date
      // moment('2021-10-12').unix(),
      // moment('2021-10-11').unix(),
      // moment('2021-10-10').unix(),
      // moment('2021-10-09').unix(),
      moment('2021-10-08').unix(),
      moment('2021-10-07').unix(),
    ]

    const sortedTsps = streakChecks.sort((a, b) => b - a)
    const checkedObjs = sortedTsps.map(moment.unix)
    const range = getRange(checkedObjs, [])
    expect(range.length).toBe(6)
  })
})
