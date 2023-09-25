module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "standard-with-typescript",
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json",
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/semi": ["error", "never"],
    "@typescript-eslint/quotes": ["error", "single"],

    /* "prettier/prettier": [
      "error",
      {
        "trailingComma": "all",
        "semi": false,
        "singleQuote": true,
        "bracketSpacing": true,
        "eslintIntegration": true,
        "printWidth": 120
      },
    ] */
  }
}
