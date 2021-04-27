import { axios, getIdToken } from '@auth'

const callName = 'remove'

const updateApi = async ({ id }) => {
  try {
    const idToken = await getIdToken()
    const habit = await axios.delete(
      `${process.env.GATSBY_API_URL}/action/${id}`,
      {
        headers: {
          Bearer: idToken,
        },
      }
    )
    if (habit.status !== 200 && habit.data.status === 'success') {
      return {
        success: false,
      }
    }
    return {
      success: true,
      data: habit.data.data,
    }
  } catch (error) {
    return {
      success: false,
    }
  }
}

const updateModel = (model, { id }) => {
  const updatedHabits = model.filter(habit => habit.id !== id)
  return updatedHabits
}

export { updateModel, updateApi, callName }
