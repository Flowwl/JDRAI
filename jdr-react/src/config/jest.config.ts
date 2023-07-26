// jest.config.ts
import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,

  // coverage
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!node_modules/"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  coverageReporters: ["text"],

  //https://www.pluralsight.com/guides/how-to-test-react-components-in-typescript

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // Module file extensions for importing
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  roots: ["src"],
  rootDir: "../../",

  moduleNameMapper: {
    "\\.svg": "<rootDir>/src/tests/mocks/svg.ts",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/tests/mocks/assets.ts",
    "\\.(css|less|scss)$": "<rootDir>/src/tests/mocks/styles.ts",
    "^@assets(.*)$": "<rootDir>/src/assets$1",
    "^@atoms(.*)$": "<rootDir>/src/components/atoms$1",
    "^@layout(.*)$": "<rootDir>/src/components/layout$1",
    "^@molecules(.*)$": "<rootDir>/src/components/molecules$1",
    "^@routes(.*)$": "<rootDir>/src/components/routes$1",
    "^@templates(.*)$": "<rootDir>/src/components/templates$1",
    "^@config(.*)$": "<rootDir>/src/config$1",
    "^@constants(.*)$": "<rootDir>/src/constants$1",
    "^@contexts(.*)$": "<rootDir>/src/contexts$1",
    "^@hooks(.*)$": "<rootDir>/src/hooks$1",
    "^@services(.*)$": "<rootDir>/src/services$1",
    "^@styles(.*)$": "<rootDir>/src/styles$1",
    "^@custom-types(.*)$": "<rootDir>/src/types$1",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
    "^@tests(.*)$": "<rootDir>/src/tests$1",
    "^@views(.*)$": "<rootDir>/src/views/$1",
    "^@src(.*)$": "<rootDir>/src$1"
  },
  globals: { "ts-jest": { tsconfig: "<rootDir>/tsconfig.json" } },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
};

export default config;
