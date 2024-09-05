import { configActDefault, configActReact, configActNext } from '@actcoding/eslint-config'

/** @type import('eslint').Linter.Config[] */
const config = [
    ...configActDefault,
    ...configActReact,
    // ...configActNext,
    {
        name: 'frontend/react-jsx',
        rules: {
            '@react/react-in-jsx-scope': 'off',
            '@react/prop-types': 'off',
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
