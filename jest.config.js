/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/src/app/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: [
    "src/app/**/*.{ts,tsx}",
    "!src/app/**/*.d.ts",
    "!src/app/**/_*.{ts,tsx}",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
