// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/tests/**/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  collectCoverageFrom: [
    '**/*.{js}',
    '!**/node_modules/**',
    '!migrations/**',
    '!seeds/**',
    '!tests/**/**',
    '!coverage/**',
    '!jest.config.js',
    '!wallaby.js',
  ],
};
