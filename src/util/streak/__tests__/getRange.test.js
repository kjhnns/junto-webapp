import moment from 'moment'
import getRange from '../getRange'

describe('StreakProcessor - getRange', () => {
  test('getRange empty array should be robust', async () => {
    const streakChecks = []
    const range = getRange(streakChecks, [])
    expect(range.length).toBe(0)
  })

  test('getRange expect it to skip {maximumStreakFreeze} days (good case)', async () => {
    const streakChecks = [
      +moment('2021-10-19').format('YYYYMMDD'),
      +moment('2021-10-18').format('YYYYMMDD'),
      +moment('2021-10-17').format('YYYYMMDD'),
      // moment('2021-10-16').format("YYYYMMDD"),
      +moment('2021-10-15').format('YYYYMMDD'),
      +moment('2021-10-14').format('YYYYMMDD'),
      +moment('2021-10-13').format('YYYYMMDD'),
      // moment('2021-10-12').format("YYYYMMDD"),
      // moment('2021-10-11').format("YYYYMMDD"),
      // moment('2021-10-10').format("YYYYMMDD"),
      +moment('2021-10-09').format('YYYYMMDD'),
      +moment('2021-10-08').format('YYYYMMDD'),
      +moment('2021-10-07').format('YYYYMMDD'), // << should be the start date
    ]

    const sortedTsps = streakChecks.sort((a, b) => b - a)
    const checkedObjs = sortedTsps.map(d => moment(`${d}`, 'YYYYMMDD'))

    const range = getRange(checkedObjs, [])
    expect(range.length).toBe(9)
  })

  test('getRange expect it to skip {maximumStreakFreeze} days (skip dates that are out of range)', async () => {
    const streakChecks = [
      +moment('2021-10-19').format('YYYYMMDD'),
      +moment('2021-10-18').format('YYYYMMDD'),
      +moment('2021-10-17').format('YYYYMMDD'),
      // moment('2021-10-16').format("YYYYMMDD"),
      +moment('2021-10-15').format('YYYYMMDD'),
      +moment('2021-10-14').format('YYYYMMDD'),
      +moment('2021-10-13').format('YYYYMMDD'), // << should be the start date
      // moment('2021-10-12').format("YYYYMMDD"),
      // moment('2021-10-11').format("YYYYMMDD"),
      // moment('2021-10-10').format("YYYYMMDD"),
      // moment('2021-10-09').format("YYYYMMDD"),
      +moment('2021-10-08').format('YYYYMMDD'),
      +moment('2021-10-07').format('YYYYMMDD'),
    ]

    const sortedTsps = streakChecks.sort((a, b) => b - a)
    const checkedObjs = sortedTsps.map(d => moment(`${d}`, 'YYYYMMDD'))

    const range = getRange(checkedObjs, [])
    expect(range.length).toBe(6)
  })
})
