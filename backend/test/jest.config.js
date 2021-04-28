const { resolve } = require('path');
const root = resolve(__dirname, '..');
const rootConfig = require(`${root}/jest.config.js`);

module.exports = {...rootConfig, ...{
  rootDir: root,
  displayName: "end2end-tests",
  testEnvironment: "node",
  verbose: true,
  testMatch: ["<rootDir>/test/**/*.test.ts"],
}}