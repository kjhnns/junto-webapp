import * as check from '../check'
import * as uncheck from '../uncheck'
import * as getAll from '../getAll'
import * as remove from '../remove'

const calls = {
  [`${check.callName}`]: check,
  [`${uncheck.callName}`]: uncheck,
  [`${getAll.callName}`]: getAll,
  [`${remove.callName}`]: remove,
}

export { calls }
