/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '*.html',
    './src/js/*.js',
    './src/jsx/*.jsx',
    './src/ts/*.ts',
    './src/tsx/*.tsx',
    './dep/**/ts/*.ts',
    './dep/**/tsx/*.tsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
