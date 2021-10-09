import moment from 'moment'
import getMax from './getMax'

const longestStreak = checkedTimeStamps => {
  if (checkedTimeStamps === null || checkedTimeStamps.length === 0) {
    return 0
  }

  const sortedTsps = checkedTimeStamps.sort((a, b) => a - b)
  const checkedObjsAscending = sortedTsps.map(moment.unix)

  return getMax(checkedObjsAscending, 0)
}

export default longestStreak