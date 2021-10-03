import { getIdToken, axios } from '@auth'

const getAll = async () => {
  try {
    const idToken = await getIdToken()
    const tags = await axios.get(`${process.env.GATSBY_API_URL}/tag`, {
      headers: {
        Bearer: idToken,
      },
    })
    if (tags.status !== 200) {
      return false
    }
    if (tags.data.data === null) {
      return []
    }
    return tags.data.data
  } catch (error) {
    return false
  }
}

export { getAll }
