import "jest-config";

const ignoredPaths = [
  '<rootDir>/node_modules/',
  '<rootDir>/dist/',
];

module.exports = {
  name: 'app',
  displayName: 'app',
  testEnvironment: "node",
  testPathIgnorePatterns: ignoredPaths,
  setupFilesAfterEnv: ['reflect-metadata', 'jest-extended'],
  testMatch: [
    "<rootDir>/spec/unit/**/*.ts",
    "<rootDir>/spec/integration/**/*.ts"
  ],
  moduleFileExtensions: ['ts', 'js']
};
