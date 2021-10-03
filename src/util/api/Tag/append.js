import { getIdToken, axios } from '@auth'

const append = async ({ habitId, tagId }) => {
  try {
    const idToken = await getIdToken()
    await axios({
      method: 'post',
      url: `${process.env.GATSBY_API_URL}/action/${habitId}/tag/${tagId}`,
      headers: {
        Bearer: idToken,
      },
    })
    return true
  } catch (error) {
    return false
  }
}

export { append }
