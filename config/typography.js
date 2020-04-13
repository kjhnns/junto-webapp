import Typography from 'typography'
import { theme } from '@style/theme'

const typography = new Typography({
  title: 'Default',
  baseFontSize: '16px',
  baseLineHeight: 1.45,
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['400', '400i', '700', '700i'],
    },
    {
      name: 'Karla',
      styles: ['400', '400i', '700', '700i'],
    },
  ],
  headerFontFamily: ['Karla'],
  bodyFontFamily: ['-apple-system', 'Montserrat'],
  scaleRatio: 3,
  headerWeight: 400,
  overrideStyles: () => ({
    h1: {
      textTransform: 'uppercase',
    },
    p: {
      color: theme.colors.grey[700],
    },
    a: {
      color: theme.colors.primary[500],
      textDecoration: 'none',
    },
    img: {
      marginBottom: 0,
    },
  }),
})

export default typography
