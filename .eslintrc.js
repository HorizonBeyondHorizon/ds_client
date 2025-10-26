module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended'],
    plugins: ['@typescript-eslint', 'react'],
    settings: { react: { version: 'detect' } },
    rules: {
        "@typescript-eslint/no-empty-function": ["error", { "allow": ["arrowFunctions"] }],
        "@typescript-eslint/ban-ts-comment": "off"
    }
};
