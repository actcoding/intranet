import { configActDefault, configActReact, configActNext } from '@actcoding/eslint-config'

/** @type import('eslint').Linter.Config[] */
const config = [
    ...configActDefault,
    ...configActReact,
    ...configActNext,
    {
        name: 'frontend/react-jsx',
        rules: {
            '@tailwindcss/no-custom-classname': 'off',
            '@react-refresh/only-export-components': 'off',
            '@react/react-in-jsx-scope': 'off',
            '@react/prop-types': 'off',
            'no-restricted-syntax': [
                'error',
                {
                    'selector': 'JSXElement > JSXExpressionContainer > LogicalExpression[operator!=\'??\']',
                    'message': 'Please use ternary operator instead',
                },
            ],
        },
    },
    {
        name: 'frontend/css',
        rules: {

        },
    },
    {
        name: 'frontend/ignores',
        ignores: [
            '*.d.ts',
            '.next',
        ],
    },
]

export default config
