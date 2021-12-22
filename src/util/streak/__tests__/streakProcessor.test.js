import moment from 'moment'
import { streakProcessor } from '..'

describe('StreakProcessor', () => {
  test('Last streak is more than {maxfreezedays} so it should not be a streak', async () => {
    const days = [
      moment('2000-10-07').unix(),
      moment('2000-10-06').unix(),
      moment('2000-10-05').unix(),
      moment('2000-10-04').unix(),
      moment('2000-10-03').unix(),
      moment('2000-10-02').unix(),
      moment('2000-10-01').unix(),
    ]

    const daysConverted = days.map(moment.unix).map(d => +d.format('YYYYMMDD'))
    console.log(daysConverted)
    const {
      streak,
      streakIncToday,
      streakDays,
      streakFrozen,
      streakFreezes,
    } = streakProcessor(daysConverted)

    expect(streakFreezes).toBe(0)
    expect(streakDays).toBe(0)
    expect(streakIncToday).toBe(false)
    expect(streakFrozen).toBe(false)
    expect(streak).toBe(false)
  })

  test('After 8 continious days it should count an 8 day streak', async () => {
    const days = [
      moment().unix(),
      moment()
        .subtract(1, 'day')
        .unix(),
      moment()
        .subtract(2, 'day')
        .unix(),
      moment()
        .subtract(3, 'day')
        .unix(),
      moment()
        .subtract(4, 'day')
        .unix(),
      moment()
        .subtract(5, 'day')
        .unix(),
      moment()
        .subtract(6, 'day')
        .unix(),
      moment()
        .subtract(7, 'day')
        .unix(),
    ]

    const daysConverted = days.map(moment.unix).map(d => +d.format('YYYYMMDD'))
    const {
      streak,
      streakIncToday,
      streakDays,
      streakFrozen,
      streakFreezes,
    } = streakProcessor(daysConverted)

    expect(streakDays).toBe(8)
    expect(streakFreezes).toBe(2)
    expect(streakIncToday).toBe(true)
    expect(streakFrozen).toBe(false)
    expect(streak).toBe(true)
  })

  test('After 12 continious days it should have a 2 freezes', async () => {
    const days = [
      moment().unix(),
      moment()
        .subtract(1, 'day')
        .unix(),
      moment()
        .subtract(2, 'day')
        .unix(),
      moment()
        .subtract(3, 'day')
        .unix(),
      moment()
        .subtract(4, 'day')
        .unix(),
      moment()
        .subtract(5, 'day')
        .unix(),
      moment()
        .subtract(6, 'day')
        .unix(),
      moment()
        .subtract(7, 'day')
        .unix(),
      moment()
        .subtract(8, 'day')
        .unix(),
      moment()
        .subtract(9, 'day')
        .unix(),
      moment()
        .subtract(10, 'day')
        .unix(),
      moment()
        .subtract(11, 'day')
        .unix(),
    ]

    const daysConverted = days.map(moment.unix).map(d => +d.format('YYYYMMDD'))
    const {
      streak,
      streakIncToday,
      streakDays,
      streakFrozen,
      streakFreezes,
    } = streakProcessor(daysConverted)

    expect(streakDays).toBe(12)
    expect(streakFreezes).toBe(2)
    expect(streakIncToday).toBe(true)
    expect(streakFrozen).toBe(false)
    expect(streak).toBe(true)
  })

  test('When not checking today, the today flag should be off', async () => {
    const days = [
      moment()
        .subtract(1, 'day')
        .unix(),
      moment()
        .subtract(2, 'day')
        .unix(),
      moment()
        .subtract(3, 'day')
        .unix(),
      moment()
        .subtract(4, 'day')
        .unix(),
      moment()
        .subtract(5, 'day')
        .unix(),
      moment()
        .subtract(6, 'day')
        .unix(),
      moment()
        .subtract(7, 'day')
        .unix(),
      moment()
        .subtract(8, 'day')
        .unix(),
      moment()
        .subtract(9, 'day')
        .unix(),
      moment()
        .subtract(10, 'day')
        .unix(),
      moment()
        .subtract(11, 'day')
        .unix(),
    ]

    const daysConverted = days.map(moment.unix).map(d => +d.format('YYYYMMDD'))
    const {
      streak,
      streakIncToday,
      streakDays,
      streakFrozen,
      streakFreezes,
    } = streakProcessor(daysConverted)

    expect(streakDays).toBe(11)
    expect(streakFreezes).toBe(2)
    expect(streakIncToday).toBe(false)
    expect(streakFrozen).toBe(false)
    expect(streak).toBe(true)
  })

  test('When not checking for 2 days, today flag should be false and streakflag should be true and freezes should be minus 1', async () => {
    const days = [
      // moment().subtract(1,'day').unix(),
      moment()
        .subtract(2, 'day')
        .unix(),
      moment()
        .subtract(3, 'day')
        .unix(),
      moment()
        .subtract(4, 'day')
        .unix(),
      moment()
        .subtract(5, 'day')
        .unix(),
      moment()
        .subtract(6, 'day')
        .unix(),
      moment()
        .subtract(7, 'day')
        .unix(),
      moment()
        .subtract(8, 'day')
        .unix(),
      moment()
        .subtract(9, 'day')
        .unix(),
      moment()
        .subtract(10, 'day')
        .unix(),
      moment()
        .subtract(11, 'day')
        .unix(),
    ]

    const daysConverted = days.map(moment.unix).map(d => +d.format('YYYYMMDD'))
    const {
      streak,
      streakIncToday,
      streakDays,
      streakFrozen,
      streakFreezes,
    } = streakProcessor(daysConverted)

    expect(streakDays).toBe(10)
    expect(streakFreezes).toBe(1)
    expect(streakIncToday).toBe(false)
    expect(streakFrozen).toBe(true)
    expect(streak).toBe(true)
  })

  test('When 3 days not checked, today flag=false, and streakflag=true, and freezes=0', async () => {
    const days = [
      // moment().unix(),
      // moment().subtract(1,'day').unix(),
      // moment().subtract(2,'day').unix(),
      moment()
        .subtract(3, 'day')
        .unix(),
      moment()
        .subtract(4, 'day')
        .unix(),
      moment()
        .subtract(5, 'day')
        .unix(),
      moment()
        .subtract(6, 'day')
        .unix(),
      moment()
        .subtract(7, 'day')
        .unix(),
      moment()
        .subtract(8, 'day')
        .unix(),
      moment()
        .subtract(9, 'day')
        .unix(),
      moment()
        .subtract(10, 'day')
        .unix(),
      moment()
        .subtract(11, 'day')
        .unix(),
      moment()
        .subtract(12, 'day')
        .unix(),
    ]

    const daysConverted = days.map(moment.unix).map(d => +d.format('YYYYMMDD'))
    const {
      streak,
      streakIncToday,
      streakDays,
      streakFrozen,
      streakFreezes,
    } = streakProcessor(daysConverted)

    expect(streak).toBe(true)
    expect(streakDays).toBe(10)
    expect(streakIncToday).toBe(false)
    expect(streakFrozen).toBe(true)
    expect(streakFreezes).toBe(0)
  })

  test('When not checking for 4 days, today flag should be false and streakflag should be false and freezes should be 0', async () => {
    const days = [
      // moment().unix(),
      // moment().subtract(1,'day').unix(),
      // moment().subtract(2,'day').unix(),
      // moment().subtract(3,'day').unix(),
      moment()
        .subtract(4, 'day')
        .unix(),
      moment()
        .subtract(5, 'day')
        .unix(),
      moment()
        .subtract(6, 'day')
        .unix(),
      moment()
        .subtract(7, 'day')
        .unix(),
      moment()
        .subtract(8, 'day')
        .unix(),
      moment()
        .subtract(9, 'day')
        .unix(),
      moment()
        .subtract(10, 'day')
        .unix(),
      moment()
        .subtract(11, 'day')
        .unix(),
      moment()
        .subtract(12, 'day')
        .unix(),
    ]

    const daysConverted = days.map(moment.unix).map(d => +d.format('YYYYMMDD'))
    const {
      streak,
      streakIncToday,
      streakDays,
      streakFrozen,
      streakFreezes,
    } = streakProcessor(daysConverted)

    expect(streak).toBe(false)
    expect(streakDays).toBe(0)
    expect(streakIncToday).toBe(false)
    expect(streakFrozen).toBe(false)
    expect(streakFreezes).toBe(0)
  })

  test('Streakfreeze should be 0 when you used one', async () => {
    const days = [
      // moment().unix(),
      // moment().subtract(1,'day').unix(),
      moment()
        .subtract(2, 'day')
        .unix(),
      moment()
        .subtract(3, 'day')
        .unix(),
      moment()
        .subtract(4, 'day')
        .unix(),
      moment()
        .subtract(5, 'day')
        .unix(),
      // moment().subtract(6,'day').unix(),
      moment()
        .subtract(7, 'day')
        .unix(),
      // moment().subtract(8,'day').unix(),
      moment()
        .subtract(9, 'day')
        .unix(),
      moment()
        .subtract(10, 'day')
        .unix(),
      moment()
        .subtract(11, 'day')
        .unix(),
      moment()
        .subtract(12, 'day')
        .unix(),
      moment()
        .subtract(13, 'day')
        .unix(),
      moment()
        .subtract(14, 'day')
        .unix(),
    ]

    const daysConverted = days.map(moment.unix).map(d => +d.format('YYYYMMDD'))
    const {
      streak,
      streakIncToday,
      streakDays,
      streakFrozen,
      streakFreezes,
    } = streakProcessor(daysConverted)

    expect(streak).toBe(true)
    expect(streakDays).toBe(4)
    expect(streakIncToday).toBe(false)
    expect(streakFrozen).toBe(true)
    expect(streakFreezes).toBe(0)
  })
})
