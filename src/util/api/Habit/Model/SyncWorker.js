import * as UpdateQueue from './UpdateQueue'
import * as Updates from './Updates'
import * as Storage from './Storage'

const self = {
  syncWorkerProcessId: false,
  lastSyncTimestamp: 0,
  syncingApi: false,
  pendingModelUpdates: [],
}

const delay = (t, v) => {
  // eslint-disable-next-line compat/compat
  return new Promise(resolve => {
    setTimeout(resolve.bind(null, v), t)
  })
}

const sendHabitUpdateModelEvent = async model => {
  if (window && CustomEvent && 'dispatchEvent' in window) {
    const updateEvent = new CustomEvent('habitModelUpdated', {
      detail: {
        model,
      },
    })
    window.dispatchEvent(updateEvent)
  }
}

const applyPendingModelUpdates = async model => {
  if (self.pendingModelUpdates.length > 0) {
    const { call, payload } = self.pendingModelUpdates[0]
    // console.log('Applies Update ', call)
    const result = await Updates.calls[`${call}`].updateModel(model, payload)
    self.pendingModelUpdates.shift()
    return applyPendingModelUpdates(result)
  }
  return model
}

const syncApi = async () => {
  const lastSyncDelta = Date.now() - self.lastSyncTimestamp
  if (lastSyncDelta <= 30000) {
    console.log(
      self.pendingModelUpdates.length,
      lastSyncDelta,
      self.lastSyncTimestamp
    )
  }
  if (UpdateQueue.length() === 0 && lastSyncDelta > 30000) {
    // sync starts and syncworker copies every change from the update queue
    // which was not yet pushed to the backend.
    // As the backend model will miss these updates, we need to apply them after we received it
    // to not revert the users changes that happen in the time we are waiting for the
    // model from the backend.
    self.syncingApi = true
    console.log(
      '[START] sync w/ api – syncModelUpdates: ',
      self.pendingModelUpdates.length
    )
    const model = await Updates.calls.getAll.loadApi()
    // await delay(3000)
    console.log(
      '[STOP] sync w/ api – syncModelUpdates: ',
      self.pendingModelUpdates.length
    )
    self.syncingApi = false

    if (model === false) {
      // sync was not possible
      return respawnSyncWorker()
    }
    self.lastSyncTimestamp = Date.now() // This last sync mechanism prevents the system from being to just in time
    // But it criples the system.
    const syncedModel = await applyPendingModelUpdates(model)
    Storage.write(syncedModel)
    sendHabitUpdateModelEvent(model)

    self.syncWorkerProcessId = false
  }

  return Storage.read()
}

const respawnSyncWorker = async processId => {
  if (
    self.syncWorkerProcessId === processId ||
    self.syncWorkerProcessId === false
  ) {
    await delay(3000)
    return start(processId)
  }
  return Storage.read()
}

const start = async processId => {
  // console.log('api is currently syncing? ', self.syncingApi, "processId", processId)

  if (self.syncingApi === true) {
    self.pendingModelUpdates = UpdateQueue.copy()
    return respawnSyncWorker(processId)
  }

  if (!window.navigator.onLine) {
    return respawnSyncWorker(processId)
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
      UpdateQueue.dequeue() // Dequeue is the problem as it always kills the updates that should be apllied to the model
      return start(self.syncWorkerProcessId)
    }
    return respawnSyncWorker(self.syncWorkerProcessId)
  }

  // after SyncWorker digested all updates it syncs with api
  if (self.syncingApi === false) {
    return syncApi()
  }

  return Storage.read()
}

export { start }
