module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
	moduleNameMapper: {
		"@entities/(.*)": "<rootDir>/src/domain/entities/$1",
		"@entities": "<rootDir>/src/domain/entities/index.ts",
		"@useCases/(.*)": "<rootDir>/src/application/useCase/$1",
		"@ports/(.*)": "<rootDir>/src/ports/$1",
		"@controllers/(.*)": "<rootDir>/src/controllers/$1",
		"@validation/(.*)": "<rootDir>/src/application/validation/$1",
		"@database/(.*)": "<rootDir>/src/adapter/database/$1",
		"@http/(.*)": "<rootDir>/src/adapter/http/$1"
	},
};
