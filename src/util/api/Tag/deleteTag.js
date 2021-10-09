import { getIdToken, axios } from '@auth'

const deleteTag = async tagId => {
  try {
    const idToken = await getIdToken()
    const result = await axios.delete(
      `${process.env.GATSBY_API_URL}/tag/${tagId}`,
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

export { deleteTag }
