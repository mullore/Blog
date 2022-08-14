

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true, // 使用setup语法糖
  },
  extends: [
    // 第1种情况
    'eslint:recommended',
    // 接入 prettier 的规则
    'prettier',
    'standard',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  parser: 'vue-eslint-parser',
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    // 3. 注意要加上这一句，开启 prettier 自动修复的功能
    'no-console': 0,
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    // 这句不能少不然报错
    'vue/comment-directive': 0,
    // key 为规则名，value 配置内容
    'no-cond-assign': ['error', 'always'],
    '@typescript-eslint/ban-ts-comment': 'error',
    // 原始是warn 暂时关闭any检查后续恢复跳转
    '@typescript-eslint/no-explicit-any': ['off'],
    // 关闭驼峰命名规则验证(变量不允许下划线,常量除外)
    camelcase: [
      0,
      {
        properties: 'always',
      },
    ],
    // 忽略默认的禁令类型
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          // un-ban a type that's banned by default
          '{}': false,
        },
        extendDefaults: true,
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 10,
        },
        multiline: {
          max: 10,
        },
      },
    ],
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea', "a",
          "abbr",
          "audio",
          "b",
          "bdi",
          "bdo",
          "canvas",
          "cite",
          "code",
          "data",
          "del",
          "dfn",
          "em",
          "i",
          "iframe",
          "ins",
          "kbd",
          "label",
          "map",
          "mark",
          "noscript",
          "object",
          "output",
          "picture",
          "q",
          "ruby",
          "s",
          "samp",
          "small",
          "span",
          "strong",
          "sub",
          "sup",
          "svg",
          "time",
          "u",
          "var",
          "video"],
      },
    ],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: [],
      },
    ],
  },
};
