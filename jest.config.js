/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js', 'jest-localstorage-mock'],
	moduleNameMapper: {
		// Handle module aliases (this will be automatically configured for you soon)
		'^@components/(.*)$': '<rootDir>/components/$1',
		'^@layouts/(.*)$': '<rootDir>/src/layouts/$1',
		'^@pages/(.*)$': '<rootDir>/src/pages/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
	},
	resetMocks: false,
	testEnvironment: 'jest-environment-jsdom',
	preset: 'ts-jest',
	roots: ['<rootDir>/src'],
	modulePathIgnorePatterns: [
		'node_modules',
		'./src/pages/dashboard',
		'./src/pages/_app.tsx',
	],
	coverageProvider: 'v8',
	collectCoverageFrom: [
		'src/**/*.{js,jsx,ts,tsx}',
		'!src/**/*.d.ts',
		'!<rootDir>/node_modules/',
	],
	coverageThreshold: {
		global: {
			branches: 90,
			functions: 90,
			lines: 90,
			statements: 90,
		},
	},
	coverageReporters: ['text'],
};

module.exports = createJestConfig(customJestConfig);
