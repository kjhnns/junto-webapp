import moment from 'moment'
import { getIdToken, axios } from '@auth'
import { streakProcessor } from '@streak'

const callName = 'getAll'

const normalizeCheckTimeStamps = input => {
  const standardFormat = moment(`${input}`, 'YYYYMMDD')
  if (standardFormat.isValid()) {
    return +standardFormat.format('YYYYMMDD')
  }
  return null
}

const loadApi = async () => {
  try {
    const idToken = await getIdToken()
    const habits = await axios.get(`${process.env.GATSBY_API_URL}/action`, {
      headers: {
        Bearer: idToken,
      },
    })
    if (habits.status !== 200) {
      return false
    }
    const habitData = habits.data.data === null ? [] : habits.data.data
    const habitDataNormalized = habitData.map(habit => ({
      ...habit,
      checked: (habit.checked || [])
        .map(normalizeCheckTimeStamps)
        .filter(x => x !== null),
    }))
    const habitDataNormalizedEnriched = habitDataNormalized.map(habit => ({
      ...habit,
      cached: {
        ...streakProcessor(habit.checked),
      },
    }))
    const result = habitDataNormalizedEnriched.sort(
      (a, b) => b.cached.streakDays - a.cached.streakDays
    )

    return result
  } catch (error) {
    console.log(error)
    return false
  }
}

export { loadApi, callName }
