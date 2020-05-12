/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require('react')

require('firebase/auth')

module.exports.onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const appleTouchStartupImages = [
    {
      key: 'apple-touch-startup-image-640',
      rel: 'apple-touch-startup-image',
      href: '/images/splash/splash640.png',
      media:
        '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      key: 'apple-touch-startup-image-750',
      rel: 'apple-touch-startup-image',
      href: '/images/splash/splash750.png',
      media:
        '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      key: 'apple-touch-startup-image-1242',
      rel: 'apple-touch-startup-image',
      href: '/images/splash/splash1242.png',
      media:
        '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      key: 'apple-touch-startup-image-1125',
      rel: 'apple-touch-startup-image',
      href: '/images/splash/splash1125.png',
      media:
        '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    },
    {
      key: 'apple-touch-startup-image-1536',
      rel: 'apple-touch-startup-image',
      href: '/images/splash/splash1536.png',
      media:
        '(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      key: 'apple-touch-startup-image-1668',
      rel: 'apple-touch-startup-image',
      href: '/images/splash/splash1668.png',
      media:
        '(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)',
    },
    {
      key: 'apple-touch-startup-image-2048',
      rel: 'apple-touch-startup-image',
      href: '/images/splash/splash2048.png',
      media:
        '(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)',
    },
  ]

  const appleTouchStartupImageComponents = appleTouchStartupImages.map(v =>
    React.createElement('link', v)
  )
  const headComponents = getHeadComponents()
  replaceHeadComponents([
    ...headComponents,
    ...appleTouchStartupImageComponents,
  ])
}
