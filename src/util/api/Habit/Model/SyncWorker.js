import * as UpdateQueue from './UpdateQueue'
import * as Updates from './Updates'
import * as Storage from './Storage'

const self = {
  syncWorkerProcessId: false,
  syncingApi: false,
  syncingModelUpdateQueues: [],
}

const syncApi = async () => {
  const applyModelUpdates = async model => {
    if (self.syncingModelUpdateQueues.length > 0) {
      const { call, payload } = self.syncingModelUpdateQueues[0]
      const result = await Updates.calls[`${call}`].updateModel(model, payload)
      self.syncingModelUpdateQueues.shift()
      return applyModelUpdates(result)
    }
    return model
  }

  if (UpdateQueue.length() === 0) {
    // sync starts and syncworker copies every change from the update queue
    // which was not yet pushed to the backend.
    // As the backend model will miss these updates, we need to apply them after we received it
    // to not revert the users changes that happen in the time we are waiting for the
    // model from the backend.
    self.syncingApi = true
    const model = await Updates.calls.getAll.loadApi()

    if (model === false) {
      // sync was not possible
      return Storage.read()
    }
    self.syncingApi = false
    const syncedModel = await applyModelUpdates(model)
    Storage.write(syncedModel)
    if (window && CustomEvent && 'dispatchEvent' in window) {
      const updateEvent = new CustomEvent('habitModelUpdated', {
        detail: { model },
      })
      window.dispatchEvent(updateEvent)
    }

    self.syncWorkerProcessId = false
  }

  return Storage.read()
}

const start = async processId => {
  const respawnSync = () => {
    if (self.syncWorkerProcessId === processId) {
      setTimeout(() => start(processId), 3000)
    }
    if (self.syncWorkerProcessId === false) {
      setTimeout(() => start(self.syncWorkerProcessId), 3000)
    }
  }

  if (self.syncingApi === true) {
    self.syncingModelUpdateQueues = UpdateQueue.copy()
  }

  if (!window.navigator.onLine) {
    respawnSync()
    return Storage.read()
  }

  // If there are pending updates for the API push them to the backend.
  // If API not reachable respawn a syncWorker to try again later
  // If API call was successfull stop syncWorker
  if (
    UpdateQueue.length() > 0 &&
    (self.syncWorkerProcessId === processId ||
      self.syncWorkerProcessId === false)
  ) {
    self.syncWorkerProcessId = +Date.now()
    const currentItem = UpdateQueue.first()
    const { call, payload } = currentItem
    const result = await Updates.calls[`${call}`].updateApi(payload)
    if (result) {
      UpdateQueue.dequeue()
      return start(self.syncWorkerProcessId)
    }
    return respawnSync(self.syncWorkerProcessId)
  }

  // after SyncWorker digested all updates it syncs with api
  if (self.syncingApi === false) {
    return syncApi()
  }

  return Storage.read()
}

export { start }
