// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		ignores: ['eslint.config.mjs'],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	eslintPluginPrettierRecommended,
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			sourceType: 'commonjs',
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-floating-promises': 'warn',
			'@typescript-eslint/no-unsafe-argument': 'warn',
			"prettier/prettier": ["error", { endOfLine: "auto", useTabs: true }],
			"indent": ["error", "tab"],
			"no-tabs": "off",
			"no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1 }],
			// REGLAS PARA LÍNEAS EN BLANCO
			'padding-line-between-statements': [
				'error',
				// Línea en blanco después de class declaration
				{ blankLine: 'always', prev: 'class', next: '*' },
				// Línea en blanco antes de property declaration en class
				{ blankLine: 'always', prev: '*', next: 'property' },
				// Línea en blanco entre propiedades y métodos
				{ blankLine: 'always', prev: 'property', next: 'method' },
				// Línea en blanco entre métodos
				{ blankLine: 'always', prev: 'method', next: 'method' },
				// Línea en blanco antes de return
				{ blankLine: 'always', prev: '*', next: 'return' },
			],

			'lines-between-class-members': [
				'error',
				'always',
				{ exceptAfterSingleLine: false } // IMPORTANTE: false fuerza líneas en blanco
			],

			// Para permitir más líneas en blanco en general
			'no-multiple-empty-lines': ['error', { max: 3, maxEOF: 1, maxBOF: 1 }],
		},
	},
  },
);
