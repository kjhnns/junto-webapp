const localStorageHabitsModelKey = 'habits'

const read = () => {
  const model = JSON.parse(
    window.localStorage.getItem(localStorageHabitsModelKey)
  )
  return model
}

const write = input => {
  window.localStorage.setItem(localStorageHabitsModelKey, JSON.stringify(input))
  return input
}

const update = exec => {
  const currentModel = read() || []
  const updatedModel = exec(currentModel)
  write(updatedModel)
  return updatedModel
}

export { update, write, read }
