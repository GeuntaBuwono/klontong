/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	roots: ['<rootDir>/src'],
	moduleNameMapper: {
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
	},
	modulePathIgnorePatterns: ['node_modules', './src/pages'],
	testEnvironment: 'jest-environment-jsdom',
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
