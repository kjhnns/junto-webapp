import { getIdToken, axios } from '@auth'

const callName = 'uncheck'

const updateApi = async ({ id, timestamp }) => {
  try {
    const idToken = await getIdToken()
    await axios({
      method: 'delete',
      url: `${process.env.GATSBY_API_URL}/action/${id}/event/${timestamp}`,
      headers: {
        Bearer: idToken,
      },
    })
    return true
  } catch (error) {
    return false
  }
}

const updateModel = (model, { id, timestamp }) => {
  const updatedHabits = model.map(habit => {
    if (habit.id === id) {
      // eslint-disable-next-line no-param-reassign
      habit.checked = habit.checked.filter(tsp => timestamp !== tsp)
      const result = { ...habit }
      return result
    }
    return habit
  })
  return updatedHabits.sort((a, b) => b.streakDays - a.streakDays)
}

export { updateModel, updateApi, callName }
