import { getIdToken, axios } from '@auth'

const callName = 'getAll'

const loadApi = async () => {
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
    const result = habits.data.data === null ? [] : habits.data.data

    return result
  } catch (error) {
    return false
  }
}

export { loadApi, callName }
