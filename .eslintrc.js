module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'no-console': 'error'
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
      flowVersion: '0.53'
    },
    propWrapperFunctions: [
        'forbidExtraProps',
        {'property': 'freeze', 'object': 'Object'},
        {'property': 'myFavoriteWrapper'}
    ],
    linkComponents: [
      'Hyperlink',
      {'name': 'Link', 'linkAttribute': 'to'}
    ]
  }
}
