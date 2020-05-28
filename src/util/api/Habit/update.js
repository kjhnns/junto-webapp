import { axios, getIdToken } from '@auth'

const update = async ({ habitId, title }) => {
  try {
    const idToken = await getIdToken()
    const result = await axios.put(
      `${process.env.GATSBY_API_URL}/action/${habitId}`,
      {
        title,
      },
      {
        headers: {
          Bearer: idToken,
        },
      }
    )
    if (result.status !== 200) {
      return {
        error: true,
        message: result.data.message,
      }
    }
    return {
      success: true,
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
    }
  }
}

export { update }
