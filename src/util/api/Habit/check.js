import { getIdToken, axios } from '@auth'

const callName = 'check'

const updateApi = async ({ id, timestamp }) => {
  try {
    const idToken = await getIdToken()
    await axios({
      method: 'post',
      url: `${process.env.GATSBY_API_URL}/action/${id}/event`,
      data: {
        date: timestamp,
      },
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
      habit.checked = [...habit.checked, timestamp]
    }
    return habit
  })
  return updatedHabits
}

export { updateModel, updateApi, callName }
