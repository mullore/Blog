module.exports = {
  env: {
    browser: true,
    es2021: true,
    // node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard',
     // 1. 接入 prettier 的规则
     "prettier",
     "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    "prettier"
  ],
  rules: {
    // 3. 注意要加上这一句，开启 prettier 自动修复的功能
    "prettier/prettier": "error",
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "react/react-in-jsx-scope": "off"
  }
}
