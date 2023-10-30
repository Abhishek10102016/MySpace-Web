/* eslint-disable */
import '@testing-library/jest-dom/extend-expect';
export default {
  displayName: 'myspace',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/myspace',
  setupFilesAfterEnv: ['<rootDir>/support/setupTests.js'],
};
