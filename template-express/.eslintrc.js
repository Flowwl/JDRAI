module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: ['eslint:recommended', 'google'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'new-cap': ['off'],
        'object-curly-spacing': ['error', 'always'],
        'indent': ['error', 2, { SwitchCase: 1 }],
        'linebreak-style': ['error', 'unix'],
        'no-console': 'warn',
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'valid-jsdoc': 'off',
    },
}
