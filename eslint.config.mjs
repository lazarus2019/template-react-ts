import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import _import from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-plugin-prettier';
import tailwindcss from 'eslint-plugin-tailwindcss';
import preferArrow from 'eslint-plugin-prefer-arrow';
import checkFile from 'eslint-plugin-check-file';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['*', '!src'],
  },
  ...fixupConfigRules(
    compat.extends(
      'plugin:@tanstack/eslint-plugin-query/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:unicorn/recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'plugin:tailwindcss/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'prettier'
    )
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      'simple-import-sort': simpleImportSort,
      import: fixupPluginRules(_import),
      'unused-imports': unusedImports,
      prettier,
      tailwindcss: fixupPluginRules(tailwindcss),
      'prefer-arrow': preferArrow,
      'check-file': checkFile,
      'react-refresh': reactRefresh,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'es2020',
      sourceType: 'module',

      parserOptions: {
        project: 'tsconfig.json',
        projectService: true,
        tsconfigRootDir: __dirname,

        ecmaFeatures: {
          modules: true,
        },
      },
    },

    settings: {
      'import/resolver': {
        typescript: {},
      },

      react: {
        version: 'detect',
      },

      tailwindcss: {
        calless: ['cn'],
        config: path.join(__dirname, './tailwind.config.js'),
      },
    },

    rules: {
      'react-refresh/only-export-components': ['warn'],
      '@typescript-eslint/no-explicit-any': 'warn',
      'unused-imports/no-unused-imports': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            param: true,
            Param: true,
            req: true,
            res: true,
            Props: true,
            props: true,
            prop: true,
            Prop: true,
            params: true,
            Params: true,
            ref: true,
            Ref: true,
            prev: true,
            Prev: true,
          },
        },
      ],

      'unicorn/no-null': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/no-array-reduce': 'off',

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          prefix: ['T'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
          prefix: ['E'],
        },
        {
          selector: 'variable',
          modifiers: ['destructured'],
          format: null,
        },
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },
      ],

      'linebreak-style': ['error', 'unix'],
      'tailwindcss/no-custom-classname': ['off'],

      'no-restricted-imports': [
        'error',
        {
          patterns: ['@/features/*/*', '@features/*/*'],
        },
      ],

      'react/prop-types': 'off',
      'import/no-default-export': ['error'],

      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],

      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false,
        },
      ],

      'func-style': [
        'error',
        'expression',
        {
          allowArrowFunctions: true,
        },
      ],

      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],

      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/': 'KEBAB_CASE',
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js'],

    languageOptions: {
      parser: tsParser,
    },
  },
];
