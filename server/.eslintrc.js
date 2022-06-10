module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb",
        "prettier",
        "plugin:node/recommended"
    ],
    "plugins": [
        "prettier"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "no-unused-vars": "warn",
        "no-console": "off",
        "func-names": "off",
        "no-process-exit": "off",
        "class-methods-use-this": "off",
        "eqeqeq": "warn",
        "prettier/prettier": "warn"
    }
};

// {
//     "extends": [
//         "airbnb",
//         "prettier",
//         "plugin:node/recommended"
//     ],
//     "plugins": [
//         "prettier"
//     ],
//     "rules": {
//         "no-unused-vars": "warn",
//         "no-console": "off",
//         "func-names": "off",
//         "no-process-exit": "off",
//         "class-methods-use-this": "off",
//         "eqeqeq": "warn",
//         "prettier/prettier": "warn"
//     },
//     "eslintConfig": {
//         "parserOptions": {
//             "ecmaVersion": 6
//         },
//         "env": {
//             "node": true,
//             "es6": true,
//             "jest": true
//         }
//     }
// }