import { getIdToken, axios } from '@auth'

const check = async (id, timestamp) => {
  try {
    const idToken = await getIdToken()
    const result = await axios.post(
      `${process.env.GATSBY_API_URL}/action/${id}/event`,
      {
        date: timestamp,
      },
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

export { check }
