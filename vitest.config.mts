import path from 'path'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'tests/*', 'cucumber.js', 'swagger.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov', 'html'],
      exclude: ['tests/**/*', 'cucumber.js', 'docker-compose.yml', 'Dockerfile', 'jest.config.js', 'package.json', 'tsconfig.json', 'src/index.ts', 'src/app.ts', 'src/adapter/**/*', 'swagger.ts']
    },
  }
})