const localStorageHabitsUpdateQueueKey = 'habitsUpdateQueue'

const read = () => {
  const queue =
    JSON.parse(window.localStorage.getItem(localStorageHabitsUpdateQueueKey)) ||
    []
  return queue
}

const write = updatedQueue => {
  window.localStorage.setItem(
    localStorageHabitsUpdateQueueKey,
    JSON.stringify(updatedQueue)
  )
  return updatedQueue
}

const enqueue = item => {
  const queue = read()
  queue.push(item)
  return write(queue)
}

const dequeue = () => {
  const queue = read()
  queue.shift()
  write(queue)
}

const first = () => {
  const queue = read()
  return queue[0]
}

const length = () => {
  const queue = read()
  return queue.length
}

export { enqueue, first, dequeue, length }
