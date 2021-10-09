import { getIdToken, axios } from '@auth'

const create = async ({ label }) => {
  try {
    const idToken = await getIdToken()
    const result = await axios.post(
      `${process.env.GATSBY_API_URL}/tag`,
      {
        label,
      },
      {
        headers: {
          Bearer: idToken,
        },
      }
    )

    if (result.status !== 200 && result.status !== 201) {
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

export { create }
