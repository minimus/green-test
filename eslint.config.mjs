import js from '@eslint/js'
import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsEsLint from 'typescript-eslint'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import importPlugin from 'eslint-plugin-import'
import { defineConfig /*, globalIgnores*/ } from 'eslint/config'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
    // globalIgnores(['dist']),
    js.configs.recommended,
    {
        files: ['src/**/*.{ts,tsx}'],
        ignores: ["**/*.config.mjs"],
        extends: [
            tsEsLint.configs.recommended,
            tsEsLint.configs.recommendedTypeChecked,
            // reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            importPlugin.flatConfigs.recommended,
            importPlugin.flatConfigs.typescript,
            prettierRecommended,
            reactX.configs['recommended-typescript'],
            reactDom.configs.recommended,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parser: tsEsLint.parser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                // projectService: true,
                ecmaFeatures: {
                    jsx: true,
                },
                project: ['./tsconfig.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: { '@typescript-eslint': tsEsLint.plugin, importPlugin },
        rules: {
            'no-eval': 'error',
            'no-new-func': 'error',
            'no-debugger': 'error',
            'no-console': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            '@typescript-eslint/prefer-nullish-coalescing': 'warn',
            '@typescript-eslint/prefer-optional-chain': 'warn',
            'import/no-extraneous-dependencies': 'off',
            'import/no-named-as-default': 'off',
            'import/no-unresolved': 'off',
            'import/default': 'off',
            'import/prefer-default-export': 'off',
            'import/order': ['error', {
              'newlines-between': 'always',
              alphabetize: { order: 'asc', caseInsensitive: true },
            }],
            'import/extensions': 'off',
        },
    },
    {
        files: ['**/*.js'],
        extends: [tsEsLint.configs.disableTypeChecked],
        ignores: ['**/*.config.js'],
    },
    {
        files: ['**/*.mjs'],
        extends: [tsEsLint.configs.disableTypeChecked],
        ignores: ['**/*.config.mjs'],
    },
]);
