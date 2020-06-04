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

const get = async () => {
  const local = Storage.read()
  if (!local) {
    const model = await Updates.calls.getAll.loadApi()
    Storage.write(model)
    return model
  }
  SyncWorker.start(false)
  return local
}

export { update, get }
