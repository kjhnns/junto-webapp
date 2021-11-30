import { getIdToken, axios } from '@auth'

const create = async ({ title, description, templateId }) => {
  try {
    const idToken = await getIdToken()
    const result = await axios.post(
      `${process.env.GATSBY_API_URL}/action`,
      {
        title,
        description,
        templateId,
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

export { create }
