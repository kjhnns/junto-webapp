import { getIdToken, axios } from '@auth'

const remove = async ({ habitId, tagId }) => {
  try {
    const idToken = await getIdToken()
    const result = await axios.delete(
      `${process.env.GATSBY_API_URL}/action/${habitId}/tag/${tagId}`,
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

export { remove }
