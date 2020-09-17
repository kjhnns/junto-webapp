module.exports = {
  pathPrefix: `/`,
  url: `https://junto-pwa.netlify.app/`,
  title: `junto – simple habit tracking`,
  titleTemplate: `%s — junto`,
  description: `Build healthy habits and break bad habits.`,
  image: `/images/meta-image-default.png`, // Path to the default meta image in `static` folder
  siteLanguage: `en`, // Language tag on <html> element

  // Web App Manifest
  favicon: `src/images/favicon.png`, // Used for manifest favicon generation
  shortName: `junto`, // shortname for manifest. *Must* be shorter than 12 characters
  themeColor: `#ffffff`,
  backgroundColor: `#ffffff`,

  // schema.org JSONLD
  headline: `Build healthy habits and break bad habits.`,
  author: `Johannes Klumpe`,

  // Twitter
  twitter: `@kjhnns`, // Twitter username
}
