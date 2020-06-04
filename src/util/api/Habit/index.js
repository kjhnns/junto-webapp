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
    const habits = Model.update(check.callName, { id, timestamp })
    return habits
  },
  uncheck: async (id, timestamp) => {
    const habits = Model.update(uncheck.callName, { id, timestamp })
    return habits
  },
  create,
}

export { Habit }
