module.exports = {
  'extends': ['airbnb', 'prettier'],
  root: true,
  parser: 'babel-eslint',
  plugins: ['babel', 'prettier', 'jsx-a11y'],
  settings: {
    react: {
      version: '16.8'
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '/']
      }
    }
  },
  rules: {
    'no-console': 'error',
    'no-confusing-arrow': 0,
    'no-case-declarations': 0,
    'import/prefer-default-export': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      }
    ]
  }
}