const nextJest = require("next/jest");

function makeModuleNameMapper(srcPath, tsconfigPath) {
  // Get paths from tsconfig
  const { paths } = require(tsconfigPath).compilerOptions;

  const aliases = {};

  // Iterate over paths and convert them into moduleNameMapper format
  Object.keys(paths).forEach((item) => {
    const key = item.replace("/*", "/(.*)");
    const path = paths[item][0].replace("/*", "/$1");
    aliases[key] = srcPath + "/" + path;
  });
  return aliases;
}

const createJestConfig = nextJest({
  dir: ".",
});

const TS_CONFIG_PATH = "./tsconfig.json";
const SRC_PATH = "<rootDir>/src";

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: makeModuleNameMapper(SRC_PATH, TS_CONFIG_PATH),
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(customJestConfig);
