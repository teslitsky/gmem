module.exports = () => ({
  files: ['src/**/*.js', 'knexfile.js', '.env'],
  tests: ['tests/**/**/*.spec.js'],
  env: {
    type: 'node',
    runner: 'node',
  },
  testFramework: 'jest',
});
