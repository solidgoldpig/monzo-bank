;'use strict'

module.exports = function (wallaby) {
  return {
    files: [{
      pattern: 'lib/monzo.js',
      load: false
    }, {
      pattern: 'package.json',
      load: false
    }, {
      pattern: 'lib/api.values.json',
      load: false
    }, {
      pattern: 'spec/helper/monzo-unit-spec-helper.js',
      load: false
    }],
    tests: [
      'spec/**/*unit.spec.js'
    ],
    env: {
      type: 'node'
    },
    testFramework: 'jasmine'
  }
}
