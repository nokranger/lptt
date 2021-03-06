module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'object-curly-spacing': ['error', 'always'],
    'space-before-function-paren': [
      'error',
      {anonymous: 'always', named: 'always', asyncArrow: 'always'}
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
