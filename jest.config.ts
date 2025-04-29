// jest.config.js
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(css|scss)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules", "/e2e"],
};

module.exports = createJestConfig(customJestConfig);
