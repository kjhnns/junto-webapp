import { axios, getIdToken } from '@auth'

const remove = async habitId => {
  try {
    const idToken = await getIdToken()
    const habit = await axios.delete(
      `${process.env.GATSBY_API_URL}/action/${habitId}`,
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

export { remove }
