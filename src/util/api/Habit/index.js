import { getOne } from './getOne'
import { remove } from './remove'
import { update } from './update'
import * as Model from './Model'
import * as check from './check'
import * as uncheck from './uncheck'
import { create } from './create'

const Habit = {
  getAll: async () => {
    return Model.get()
  },
  getOne,
  remove,
  update,
  check: async (id, timestamp) => {
    return Model.update(check.callName, { id, timestamp })
  },
  uncheck: async (id, timestamp) => {
    return Model.update(uncheck.callName, { id, timestamp })
  },
  create,
}

export { Habit }
