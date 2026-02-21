const config = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ["./jest.setup.js"],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-expo|@react-native|@react-native-community|@react-navigation|react-native|expo)/)',
  ],
};

module.exports = config;