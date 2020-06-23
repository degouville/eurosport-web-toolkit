module.exports = {
  collectCoverage: true,
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/testSetup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  coveragePathIgnorePatterns: ['node_modules', '.stories.js', 'src/assets', '.mock.js'],
};
