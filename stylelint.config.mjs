/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended',
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
  ],
  overrides: [
    {
      files: ['**/*.scss'],
      rules: {
        'at-rule-no-unknown': null,
        'number-max-precision': 5,
      },
    },
  ],
  rules: {
    'at-rule-no-unknown': null,
    'number-max-precision': 5,
    'selector-class-pattern': null,
    'media-feature-range-notation': 'prefix',
  },
  ignoreFiles: ['**/*.php'],
};
