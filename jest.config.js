module.exports = {
  transform: {
    '^.+\\.jsx?$': `<rootDir>/jest-preprocess.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testEnvironment: 'jsdom',
  testURL: `http://localhost`,
  setupFilesAfterEnv: [`<rootDir>/src/util/test/setupTests.js`],
  /**
   * Enable absolute imports from specific entry points.
   * @example: `import Button from '@components/Button'`
   * @see: https://bit.ly/2KgcOOY
   */
  moduleNameMapper: {
    // Mocks & stubs
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
    'typeface-inter': '<rootDir>/__mocks__/fontStub.js',
    // Import aliases
    '^@style$': '<rootDir>/src/util/style/',
    '^@auth$': '<rootDir>/src/util/auth/',
    '^@streak$': '<rootDir>/src/util/streak/',
    '^@api$': '<rootDir>/src/util/api/',
    '^@components(.*)$': '<rootDir>/src/components/$1',
    '^@test$': '<rootDir>/src/util/test/',
  },
}
