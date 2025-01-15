module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './tests/globalSetup.ts',
  testMatch: ['**/tests/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageDirectory: 'coverage',
  forceExit: true,
};
