import moment from 'moment'
import count from '../count'
import getMax from '../getMax'
import getLatest from '../getLatest'
import getRange from '../getRange'

describe('StreakProcessor - count', () => {
  test('After 7 continious days it should count a seven day streak', async () => {
    const days = [
      moment('2021-10-07').unix(),
      moment('2021-10-06').unix(),
      moment('2021-10-05').unix(),
      moment('2021-10-04').unix(),
      moment('2021-10-03').unix(),
      moment('2021-10-02').unix(),
      moment('2021-10-01').unix(),
    ]

    const sortedTsps = days.sort((a, b) => b - a)
    const checkedObjs = sortedTsps.map(moment.unix)
    const stopdate = checkedObjs[0]
    const selectedTimeFrame = getRange(checkedObjs, [])
    const startDate = selectedTimeFrame[0]
    const countedDays = count(stopdate, startDate, selectedTimeFrame, 0, 0)

    expect(countedDays[0]).toBe(7)
  })

  test('After 3 days of checking you should get a one day streak freeze', async () => {
    const streakChecks = [
      moment('2021-10-07').unix(),
      moment('2021-10-06').unix(),
      moment('2021-10-05').unix(),
      // moment('2021-10-04').unix(),
      moment('2021-10-03').unix(),
      moment('2021-10-02').unix(),
      moment('2021-10-01').unix(),
    ]

    const sortedTsps = streakChecks.sort((a, b) => b - a)
    const checkedObjs = sortedTsps.map(moment.unix)
    const stopdate = checkedObjs[0]
    const selectedTimeFrame = getRange(checkedObjs, [])
    const startDate = selectedTimeFrame[0]
    const countedDays = count(stopdate, startDate, selectedTimeFrame, 0, 0)
    expect(countedDays[0]).toBe(6)
  })

  test('should recharge and not count as days. 19 days with two missed days should give you a 17 day streak', async () => {
    const streakChecks = [
      moment('2021-10-19').unix(),
      moment('2021-10-18').unix(),
      moment('2021-10-17').unix(),
      // moment('2021-10-16').unix(),
      moment('2021-10-15').unix(),
      moment('2021-10-14').unix(),
      moment('2021-10-13').unix(),
      // moment('2021-10-12').unix(),
      moment('2021-10-11').unix(),
      moment('2021-10-10').unix(),
      moment('2021-10-09').unix(),
      // moment('2021-10-08').unix(),
      moment('2021-10-07').unix(),
      moment('2021-10-06').unix(),
      moment('2021-10-05').unix(),
      // moment('2021-10-04').unix(),
      moment('2021-10-03').unix(),
      moment('2021-10-02').unix(),
      moment('2021-10-01').unix(),
    ]

    const sortedTsps = streakChecks.sort((a, b) => b - a)
    const checkedObjs = sortedTsps.map(moment.unix)
    const stopdate = checkedObjs[0]
    const selectedTimeFrame = getRange(checkedObjs, [])
    const startDate = selectedTimeFrame[0]
    const countedDays = count(stopdate, startDate, selectedTimeFrame, 0, 0)
    expect(countedDays[0]).toBe(15)
  })

  test('After 3 days of checking you should get a one day streak freeze, but you need three days to recharge before you get to use it again.', async () => {
    const streakChecks = [
      moment('2021-10-05').unix(),
      // moment('2021-10-04').unix(),
      moment('2021-10-03').unix(),
      moment('2021-10-02').unix(),
      moment('2021-10-01').unix(),
    ]

    const sortedTsps = streakChecks.sort((a, b) => b - a)
    const checkedObjs = sortedTsps.map(moment.unix)
    const stopdate = checkedObjs[0]
    const selectedTimeFrame = getRange(checkedObjs, [])
    const startDate = selectedTimeFrame[0]
    const countedDays = count(stopdate, startDate, selectedTimeFrame, 0, 0)
    expect(countedDays[0]).toBe(4)
  })

  test('You need three days to charge a streakfreeze.', async () => {
    const streakChecks = [
      moment('2021-10-07').unix(),
      moment('2021-10-06').unix(),
      moment('2021-10-04').unix(),
      moment('2021-10-03').unix(),
    ]

    const sortedTsps = streakChecks.sort((a, b) => b - a)
    const checkedObjs = sortedTsps.map(moment.unix)
    const stopdate = checkedObjs[0]
    const selectedTimeFrame = getRange(checkedObjs, [])
    const startDate = selectedTimeFrame[0]
    const countedDays = count(stopdate, startDate, selectedTimeFrame, 0, 0)
    expect(countedDays[0]).toBe(2)
  })

  test('After 10 days you have 2 streak freezes', async () => {
    const streakChecks = [
      moment('2021-10-20').unix(),
      // moment('2021-10-19').unix(),
      // moment('2021-10-18').unix(),
      moment('2021-10-17').unix(),
      moment('2021-10-16').unix(),
      moment('2021-10-15').unix(),
      moment('2021-10-14').unix(),
      moment('2021-10-13').unix(),
      moment('2021-10-12').unix(),
      moment('2021-10-11').unix(),
      moment('2021-10-10').unix(),
      moment('2021-10-09').unix(),
      moment('2021-10-08').unix(),
      moment('2021-10-07').unix(),
      moment('2021-10-06').unix(),
      moment('2021-10-05').unix(),
      moment('2021-10-04').unix(),
      moment('2021-10-03').unix(),
      moment('2021-10-02').unix(),
      moment('2021-10-01').unix(),
    ]

    const sortedTsps = streakChecks.sort((a, b) => b - a)
    const checkedObjs = sortedTsps.map(moment.unix)
    const stopdate = checkedObjs[0]
    const selectedTimeFrame = getRange(checkedObjs, [])
    const startDate = selectedTimeFrame[0]
    const countedDays = count(stopdate, startDate, selectedTimeFrame, 0, 0)
    expect(countedDays[0]).toBe(18)
  })

  test('After 10 days you have 2 streak freezes - you should find the longest streak after two times counting', async () => {
    const streakChecks = [
      moment('2021-10-20').unix(),
      // moment('2021-10-19').unix(),
      // moment('2021-10-18').unix(),
      moment('2021-10-17').unix(),
      moment('2021-10-16').unix(),
      moment('2021-10-15').unix(),
      moment('2021-10-14').unix(),
      moment('2021-10-13').unix(),
      moment('2021-10-12').unix(),
      moment('2021-10-11').unix(),
      moment('2021-10-10').unix(),
      moment('2021-10-09').unix(),
      moment('2021-10-08').unix(),
      moment('2021-10-07').unix(),
      moment('2021-10-06').unix(),
      moment('2021-10-05').unix(),
      // moment('2021-10-04').unix(),
      // moment('2021-10-03').unix(),
      moment('2021-10-02').unix(),
      moment('2021-10-01').unix(),
    ]

    const sortedTsps = streakChecks.sort((a, b) => b - a)
    const checkedObjs = sortedTsps.map(moment.unix)
    const stopdate = checkedObjs[0]
    const selectedTimeFrame = getRange(checkedObjs, [])

    const countedDays01 = count(
      stopdate,
      selectedTimeFrame[0],
      selectedTimeFrame,
      0,
      0
    )
    expect(countedDays01[0]).toBe(2)
    const countedDays02 = count(
      stopdate,
      selectedTimeFrame[0],
      selectedTimeFrame,
      0,
      0
    )
    expect(countedDays02[0]).toBe(14)
  })

  test('After 10 days you have 2 streak freezes - you should find the longest streak in a given range with getMax', async () => {
    const streakChecks = [
      moment('2021-10-20').unix(),
      // moment('2021-10-19').unix(),
      moment('2021-10-04').unix(),
      // moment('2021-10-03').unix(),
      moment('2021-10-01').unix(),
    ]

    const sortedTsps = streakChecks.sort((a, b) => b - a)
    const checkedObjs = sortedTsps.map(moment.unix)
    const selectedTimeFrame = getRange(checkedObjs, [])

    const countedMax = getMax(selectedTimeFrame, 0)
    expect(countedMax).toBe(1)
  })

  test('After 10 days you have 2 streak freezes - you should find the longest streak in a given range with getMax', async () => {
    const streakChecks = [
      moment('2021-10-20').unix(),
      // moment('2021-10-19').unix(),
      // moment('2021-10-18').unix(),
      moment('2021-10-17').unix(),
      moment('2021-10-16').unix(),
      moment('2021-10-15').unix(),
      moment('2021-10-14').unix(),
      moment('2021-10-13').unix(),
      moment('2021-10-12').unix(),
      moment('2021-10-11').unix(),
      moment('2021-10-10').unix(),
      moment('2021-10-09').unix(),
      moment('2021-10-08').unix(),
      moment('2021-10-07').unix(),
      moment('2021-10-06').unix(),
      moment('2021-10-05').unix(),
      // moment('2021-10-04').unix(),
      // moment('2021-10-03').unix(),
      moment('2021-10-02').unix(),
      moment('2021-10-01').unix(),
    ]

    const sortedTsps = streakChecks.sort((a, b) => b - a)
    const checkedObjs = sortedTsps.map(moment.unix)
    const selectedTimeFrame = getRange(checkedObjs, [])

    const countedMax = getMax(selectedTimeFrame, 0)
    expect(countedMax).toBe(14)
  })

  test('getMax should always return the longest streak not the most recent', async () => {
    const streakChecks = [
      moment('2021-10-09').unix(),
      moment('2021-10-08').unix(),
      moment('2021-10-07').unix(),
      moment('2021-10-06').unix(),
      moment('2021-10-05').unix(),
      // moment('2021-10-19').unix(),
      // moment('2021-10-18').unix(),
      moment('2021-09-17').unix(),
      moment('2021-09-16').unix(),
      moment('2021-09-15').unix(),
      moment('2021-09-14').unix(),
      moment('2021-09-13').unix(),
      moment('2021-09-12').unix(),
      moment('2021-09-11').unix(),
      moment('2021-09-10').unix(),
      moment('2021-09-09').unix(),
      moment('2021-09-08').unix(),
      moment('2021-09-07').unix(),
      moment('2021-09-06').unix(),
      moment('2021-09-05').unix(),
      // moment('2021-10-04').unix(),
      // moment('2021-10-03').unix(),
      moment('2021-08-02').unix(),
      moment('2021-08-01').unix(),
    ]

    const sortedTsps = streakChecks.sort((a, b) => a - b)
    const selectedTimeFrame = sortedTsps.map(moment.unix)

    const countedMax = getMax(selectedTimeFrame, 0)
    expect(countedMax).toBe(13)
  })

  test('getLatest should always return the latest streak', async () => {
    const streakChecks = [
      moment('2021-10-09').unix(),
      moment('2021-10-08').unix(),
      moment('2021-10-07').unix(),
      moment('2021-10-06').unix(),
      moment('2021-10-05').unix(),
      // moment('2021-10-19').unix(),
      // moment('2021-10-18').unix(),
      moment('2021-09-17').unix(),
      moment('2021-09-16').unix(),
      moment('2021-09-15').unix(),
      moment('2021-09-14').unix(),
      moment('2021-09-13').unix(),
      moment('2021-09-12').unix(),
      moment('2021-09-11').unix(),
      moment('2021-09-10').unix(),
      moment('2021-09-09').unix(),
      moment('2021-09-08').unix(),
      moment('2021-09-07').unix(),
      moment('2021-09-06').unix(),
      moment('2021-09-05').unix(),
      // moment('2021-10-04').unix(),
      // moment('2021-10-03').unix(),
      moment('2021-08-02').unix(),
      moment('2021-08-01').unix(),
    ]

    const sortedTsps = streakChecks.sort((a, b) => b - a)
    const checkedObjs = sortedTsps.map(moment.unix)
    const selectedTimeFrame = getRange(checkedObjs, [])

    const countedMax = getLatest(selectedTimeFrame, 0)
    expect(countedMax[0]).toBe(5)
  })
})
