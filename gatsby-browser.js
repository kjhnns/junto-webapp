/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

require('firebase/auth')

export const onServiceWorkerUpdateReady = () => {
  if (window && 'confirm' in window) {
    // eslint-disable-next-line no-alert
    const answer = window.confirm(
      `Junto has been updated. Reload to display the latest version?`
    )
    if (answer === true) {
      window.location.reload()
    }
  }
}
