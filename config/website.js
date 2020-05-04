module.exports = {
<<<<<<< HEAD
  pathPrefix: `/`,
  url: `https://gatsby-starter-styled.netlify.com/`,
=======
  pathPrefix: `/dashboard`,
  url: `https://junto-pwa.netlify.app/`,
>>>>>>> fix: web app manifest adjustments
  title: `junto – social habit tracking`,
  titleTemplate: `%s — junto`,
  description: `Build healthy habits and break bad habits - together.`,
  image: `/images/meta-image-default.png`, // Path to the default meta image in `static` folder
  siteLanguage: `en`, // Language tag on <html> element

  // Web App Manifest
  favicon: `src/images/favicon.png`, // Used for manifest favicon generation
  shortName: `junto`, // shortname for manifest. *Must* be shorter than 12 characters
  themeColor: `#ffffff`,
  backgroundColor: `#ffffff`,

  // schema.org JSONLD
  headline: `Build healthy habits and break bad habits - together.`,
  author: ``,

  // Twitter
  twitter: `@kjhnns`, // Twitter username
}