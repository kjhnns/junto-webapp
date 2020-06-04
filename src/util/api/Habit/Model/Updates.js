import * as check from '../check'
import * as uncheck from '../uncheck'
import * as getAll from '../getAll'

const calls = {
  [`${check.callName}`]: check,
  [`${uncheck.callName}`]: uncheck,
  [`${getAll.callName}`]: getAll,
}

export { calls }
