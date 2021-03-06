/* eslint-disable no-multi-assign */
module.exports = exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'airbnb'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'arrow-body-style': 'off',
        'object-curly-newline': 'off',
        'no-debugger': 'off',
        'no-unused-vars': 'off',
        'react/jsx-closing-bracket-location': 0,
        'react/jsx-first-prop-new-line': [2, 'never'],
        'react/jsx-max-props-per-line': 0,
        'react/jsx-tag-spacing': [0],
        'react/jsx-props-no-spreading': 0,
        'react/function-component-definition': ['off'],
        'react/require-default-props': ['off'],
        'react/no-unstable-nested-components': ['off'],
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'linebreak-style': ['off'],
        'max-len': ['warn', { code: 150 }],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
        'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
    },

    settings: {
        'import/resolver': {
            typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
        },
    },
};
