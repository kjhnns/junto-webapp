self.addEventListener('activate', event => {
  console.log('[SERVICE WORKER] active event', JSON.stringify(event))
})

self.addEventListener('sync', event => {
  console.log('[SERVICE WORKER] sync event', JSON.stringify(event))
})
