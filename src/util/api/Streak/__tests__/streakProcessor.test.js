import moment from 'moment'
import { streakProcessor } from '..'

describe('StreakProcessor', () => {
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

    const { streak, streakIncToday, streakDays } = streakProcessor(days)

    expect(streakDays).toBe(7)
    expect(streakIncToday).toBe(false)
    expect(streak).toBe(true)
  })
})
