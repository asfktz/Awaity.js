module.exports = {
  "extends": ["prettier", "airbnb-base"],
  "plugins": ["jest"],
  "rules": {
    "no-console": 0,
    "no-param-reassign": 0,
    "arrow-body-style": 0,
    "consistent-return": 0,
    "import/no-extraneous-dependencies": 0,
    "object-shorthand": 0,
    "func-names": 0,
    "no-empty-function": 0,
    "prefer-arrow-callback": 0,
    "prefer-template": 0,
    "prefer-spread": 0,
    "prefer-rest-params": 0,
    "prefer-destructuring": 0,
    "object-curly-newline": 0,
    "no-underscore-dangle": 0,
    "no-shadow": 0,
    "import/prefer-default-export": 0
  },
  "env": {
    "jest/globals": true
  } 
};