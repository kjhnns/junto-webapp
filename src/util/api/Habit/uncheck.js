import { getIdToken, axios } from '@auth'

const uncheck = async (id, timestamp) => {
  try {
    const idToken = await getIdToken()
    const result = await axios.delete(
      `${process.env.GATSBY_API_URL}/action/${id}/event/${timestamp}`,
      {
        headers: {
          Bearer: idToken,
        },
      }
    )
    return result.status === 200
  } catch (error) {
    return false
  }
}

export { uncheck }
