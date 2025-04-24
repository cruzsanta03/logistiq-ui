module.exports = {
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
  },
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testMatch: ["**/__tests__/**/*.test.(ts|tsx|js|jsx)"],
  clearMocks: true,
  verbose: true
};
