import { getIdToken, axios } from '@auth'

const getAll = async () => {
  try {
    const idToken = await getIdToken()
    const habits = await axios.get(`${process.env.GATSBY_API_URL}/action`, {
      headers: {
        Bearer: idToken,
      },
    })
    if (habits.status !== 200) {
      return false
    }
    return habits.data.data === null ? [] : habits.data.data
  } catch (error) {
    return false
  }
}

export { getAll }
