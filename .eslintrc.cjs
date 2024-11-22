const path = require('path')

/**
 * @type {import('eslint').Linter.LegacyConfig}
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    projectService: true,
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'es2020',
    ecmaFeatures: { modules: true },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      parser: '@typescript-eslint/parser',
    },
  ],
  env: { browser: true, es2020: true },
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
  extends: [
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'import',
    'unused-imports',
    'prettier',
    'tailwindcss',
    'prefer-arrow',
    'check-file',
    'react-refresh',
  ],
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
    'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
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
}
