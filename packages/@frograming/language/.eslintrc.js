module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parserOptions: {
    sourceType: "module",
  },
  extends: [
    'eslint:recommended',
    '@ycm.jason/eslint-config',
  ],
};
