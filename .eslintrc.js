module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'arrow-body-style': [0],
    'no-console': 0,
    'no-unused-vars': [
      'warn',
      { vars: 'all', args: 'none', ignoreRestSiblings: false },
    ],
    indent: ['error', 2, { indentSwitchCase: true }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
    'comma-dangle': [2, 'always-multiline'],
    'react/jsx-filename-extension': [0],
    beforeBlockComment: true,
  },
};
