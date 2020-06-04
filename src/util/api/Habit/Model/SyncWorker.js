import * as UpdateQueue from './UpdateQueue'
import * as Updates from './Updates'
import * as Storage from './Storage'

const self = {
  syncWorkerProcessId: false,
}

const start = async processId => {
  const postPoneSync = () => {
    if (self.syncWorkerProcessId === processId) {
      setTimeout(() => start(processId), 3000)
    }
    if (self.syncWorkerProcessId === false) {
      self.syncWorkerProcessId = +Date.now()
      setTimeout(() => start(self.syncWorkerProcessId), 3000)
    }
  }

  if (!window.navigator.onLine) {
    postPoneSync()
    return
  }

  if (UpdateQueue.length() > 0) {
    const currentItem = UpdateQueue.first()
    const { call, payload } = currentItem
    const result = await Updates.calls[`${call}`].updateApi(payload)
    if (result) {
      UpdateQueue.dequeue()
      await start(false)
    } else {
      postPoneSync()
    }
    return
  }

  // after SyncWorker digested all updates, sync with api
  const model = await Updates.calls.getAll.loadApi()
  if (UpdateQueue.length() === 0) {
    Storage.write(model)
    if (window && CustomEvent && 'dispatchEvent' in window) {
      const updateEvent = new CustomEvent('habitModelUpdated', {
        detail: { model },
      })
      window.dispatchEvent(updateEvent)
    }
  }
  self.syncWorkerProcessId = false
}

export { start }