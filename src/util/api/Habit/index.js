import { update } from './update'
import * as Model from './Model'
import * as check from './check'
import * as remove from './remove'
import * as uncheck from './uncheck'
import { create } from './create'

const Habit = {
  getAll: async () => {
    return Model.get()
  },
  getOne: async habitId => {
    const allHabits = await Model.get()
    return allHabits.filter(habit => habitId === habit.id)[0] || null
  },
  remove: async id => {
    return Model.update(remove.callName, { id })
  },
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
