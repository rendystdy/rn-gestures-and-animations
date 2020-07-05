module.exports = {
  root: true,
  "extends": "react-native-wcandillon",
  "rules": {
    "no-bitwise": 0,
    "react-native/no-inline-styles": 0,
    "react-native/no-color-literals": 0,
    "import/prefer-default-export": 0,
    "prettier/prettier": "error"
  }
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint','prettier'],
};
