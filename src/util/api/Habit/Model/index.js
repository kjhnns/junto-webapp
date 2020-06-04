import * as Storage from './Storage'
import * as Updates from './Updates'
import * as UpdateQueue from './UpdateQueue'
import * as SyncWorker from './SyncWorker'

const update = (call, payload) => {
  const result = Storage.update(model =>
    Updates.calls[`${call}`].updateModel(model, payload)
  )
  UpdateQueue.enqueue({
    call,
    payload,
  })
  SyncWorker.start()
  return result
}

const init = async () => {
  return Updates.calls.getAll.loadApi()
}

const get = async () => {
  const local = Storage.read()
  if (!local) {
    const model = await init()
    Storage.write(model)
    return model
  }
  SyncWorker.start()
  return local
}

export { update, get }
