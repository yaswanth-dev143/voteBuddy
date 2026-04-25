import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Path to your Next.js app — loads next.config.ts and .env.local
  dir: './',
});

const config: any = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/lib/**/*.ts',
    '!src/lib/firebase.ts',
    '!src/lib/firestore.ts',
    '!src/lib/google-maps.ts',
    '!src/lib/civic-api.ts',
    '!src/lib/claude-api.ts'
  ],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default createJestConfig(config);
