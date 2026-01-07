const js = require('@eslint/js');
const jest = require('eslint-plugin-jest');

module.exports = [
    js.configs.recommended,
    {
        files: ['**/*.js'],
        plugins: {
            jest: jest,
        },
        languageOptions: {
            ecmaVersion: 2018,
            sourceType: 'commonjs',
            globals: {
                ...require('globals').node,
                ...require('globals').commonjs,
                ...require('globals').es6,
                ...require('globals').jest,
                Atomics: 'readonly',
                SharedArrayBuffer: 'readonly',
            },
        },
        rules: {
            // Your custom rules can be added here
        },
    },
];