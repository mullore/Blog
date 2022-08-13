module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true // 使用setup语法糖
  },
  extends: [
    // 第1种情况
    'eslint:recommended',
    // 1. 接入 prettier 的规则
    'prettier',
    'standard',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    // 3. 注意要加上这一句，开启 prettier 自动修复的功能
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    // 这句不能少不然报错
    'vue/comment-directive': 0,
    // key 为规则名，value 配置内容
    'no-cond-assign': ['error', 'always'],
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    // 忽略默认的禁令类型
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false
        }
      }
    ]
  }
};
