module.exports = {
  extends: ['airbnb-base', 'plugin:import/recommended', 'prettier'],
  plugins: ['prettier', 'import'],
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: 'script',
  },
  env: {
    node: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    'import/order': [
      'error',
      { 'newlines-between': 'always-and-inside-groups' },
    ],
    'import/first': 'error',
  },
};
