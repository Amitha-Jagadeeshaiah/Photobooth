module.exports= {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'parser': 'babel-eslint',
    'parserOptions': {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    'plugins': [
        'react'
    ],
    rules: {
        indent: [ 'warn', 4, { SwitchCase: 1 } ],
        quotes: [ 'warn', 'single' ],
        semi: 'warn',
        'import/no-default-export': 'off',
        'arrow-body-style': 'warn',
        'no-debugger': [ 0 ],
        'padded-blocks': 'warn',
        'comma-dangle': [ 'error', 'never' ],
        'no-trailing-spaces': 'warn',
        'max-len': [ 2, 125, 4, {'ignoreUrls': true} ],
        'function-paren-newline': 'warn',
        'block-spacing': 'warn',
        'no-unused-vars': 'warn',
        'no-multi-spaces': 'warn',
        'eol-last': 'warn',
        'no-multiple-empty-lines': 'warn',
        'import/prefer-default-export': 'off',
        'no-confusing-arrow': 'warn',
        'no-extra-boolean-cast': 0,
        'no-use-before-define': 'warn',
        'object-curly-newline': 'warn',
        'no-nested-ternary': [ 0 ],
        'no-restricted-syntax': [ 'off' ],
        'arrow-parens': [ 1, 'as-needed', { requireForBlockBody: true } ],
        'prefer-destructuring': [ 'warn', { object: true, array: true } ],
        'array-bracket-spacing': [ 'warn', 'always' ],
        'react/jsx-indent': [ 1, 4 ],
        'react/jsx-filename-extension': [ 1 ],
        'react/jsx-closing-tag-location': [ 0 ],
        'react/jsx-one-expression-per-line': [ 0, { allow: 'single-child' } ],
        'react/jsx-indent-props': [ 1, 4 ],
        'react/jsx-curly-spacing': [ 0 ],
        'react/button-has-type': [ 1 ],
        'react/jsx-boolean-value': [ 1 ],
        'react/jsx-tag-spacing': [ 1 ],
        'react/prop-types': [ 0 ],
        'react/self-closing-comp': [ 1 ],
        'react/jsx-closing-bracket-location': [ 1 ],
        'react/jsx-props-no-spreading': [ 0 ],
        'jsx-a11y/no-static-element-interactions': [ 0 ],
        'jsx-a11y/click-events-have-key-events': [ 0 ],
        'jsx-a11y/interactive-supports-focus': [ 0 ],
        'jsx-a11y/label-has-associated-control': [ 0 ],
        'jsx-a11y/no-noninteractive-element-interactions': [ 0 ],
        'jsx-a11y/no-noninteractive-element-to-interactive-role': [ 0 ]
    }
};

