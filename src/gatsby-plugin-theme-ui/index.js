/* eslint-disable prefer-destructuring */
/**
 * This is our custom theme where we define global styles.
 * It should serve as a guideline for styling, but not all styles *have* to be taken from here.
 */
const breakpoints = ['576px', '768px', '992px', '1200px']

//  Breakpoint aliases
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

/**
 * Primary: Colors to use for actionable items, such as links, buttons etc.
 * Grey: Colors for items that are not that important
 */
const colors = {
  text: 'hsl(0, 0%, 0%)',
  background: '#0f0',
  primary: 'hsl(0, 0%, 0%)',
  secondary: 'hsl(10, 2%, 30%)',
  accent: 'pink',
  highlight: 'yellow',
  muted: 'hsl(10, 2%, 83%)',
  pageBackground: 'hsl(0, 0%, 100%)',
  white: 'hsl(0, 0%, 100%)',
  black: 'hsl(0, 0%, 0%)',
  gray: {
    100: 'hsl(10, 2%, 98%)',
    200: 'hsl(10, 2%, 90%)',
    300: 'hsl(10, 2%, 87%)',
    400: 'hsl(10, 2%, 83%)',
    500: 'hsl(10, 2%, 74%)',
    600: 'hsl(10, 2%, 63%)',
    700: 'hsl(10, 2%, 49%)',
    800: 'hsl(10, 2%, 30%)',
    900: 'hsl(10, 2%, 16%)',
  },
  red: {
    100: 'hsl(360, 77%, 95%)',
    200: 'hsl(360, 79%, 81%)',
    300: 'hsl(360, 71%, 73%)',
    400: 'hsl(360, 70%, 64%)',
    500: 'hsl(360, 71%, 53%)',
    600: 'hsl(360, 65%, 45%)',
    700: 'hsl(360, 61%, 38%)',
    800: 'hsl(360, 63%, 31%)',
    900: 'hsl(360, 60%, 24%)',
  },
  yellow: {
    100: 'hsl(44, 100%, 98%)',
    200: 'hsl(44, 90%, 92%)',
    300: 'hsl(45, 86%, 86%)',
    400: 'hsl(44, 90%, 80%)',
    500: 'hsl(43, 87%, 67%)',
    600: 'hsl(44, 57%, 52%)',
    700: 'hsl(43, 59%, 42%)',
    800: 'hsl(43, 64%, 34%)',
    900: 'hsl(44, 66%, 22%)',
  },
  green: {
    100: 'hsl(142, 81%, 94%)',
    200: 'hsl(141, 67%, 80%)',
    300: 'hsl(145, 65%, 68%)',
    400: 'hsl(146, 57%, 65%)',
    500: 'hsl(145, 55%, 49%)',
    600: 'hsl(145, 55%, 41%)',
    700: 'hsl(145, 59%, 33%)',
    800: 'hsl(155, 63%, 26%)',
    900: 'hsl(156, 61%, 20%)',
  },
}

/**
 * Space is used for margin and padding scales.
 * It's recommended to use powers of two to ensure alignment across the entire project
 */
const space = [0, 4, 8, 16, 32, 64, 128, 256]

/**
 * Border-radius
 */
const radii = [0, 2, 4, 8, 16]
radii.default = 4

const fonts = {
  body: '"Inter"',
  heading: 'inherit',
  monospace: 'Menlo, monospace',
}

const fontSizes = [11, 14, 16, 20, 24, 32, 48, 64, 72]

const fontWeights = {
  body: 400,
  heading: 700,
  display: 900,
}

const lineHeights = {
  body: 1.5,
  heading: 1.25,
}

const buttons = {
  primary: {
    fontFamily: 'body',
    fontSize: 2,
    fontWeight: '600',
    color: 'white',
    bg: 'black',
    px: 3,
    py: 3,
    borderRadius: 'default',
  },
  secondary: {
    variant: 'buttons.primary',
    color: 'black',
    bg: 'gray.300',
  },
  outline: {
    variant: 'buttons.primary',
    color: 'black',
    bg: 'transparent',
    boxShadow: 'inset 0 0 0 2px',
  },
  clear: {
    variant: 'buttons.outline',
    color: 'black',
    bg: 'transparent',
    boxShadow: 0,
  },
}

const shadows = {
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  medium:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  large:
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xlarge:
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xxlarge: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
}

const variants = {
  link: {
    fontFamily: 'body',
    color: 'black',
  },
}

const styles = {
  root: {
    color: 'black',
    background: 'white',
    fontFamily: 'body',
    fontWeight: 'body',
  },
}

const text = {
  heading: {
    fontFamily: 'heading',
    lineHeight: 'heading',
    fontWeight: 'heading',
  },
  text: {
    fontFamily: 'text',
    lineHeight: 'text',
    fontWeight: 'text',
  },
}

export default {
  name: 'Default',
  breakpoints,
  colors,
  space,
  radii,
  fonts,
  fontSizes,
  lineHeights,
  fontWeights,
  buttons,
  shadows,
  styles,
  variants,
  text,
}
