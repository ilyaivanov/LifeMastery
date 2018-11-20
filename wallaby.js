module.exports = function(wallaby) {
  return {
    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    files: [
      'jest/**/*.ts?(x)',
      'src/**/*.ts?(x)',
      '!src/**/*.spec.ts?(x)'
    ],

    tests: [
      'src/**/*.spec.ts?(x)'
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel({}),
      '**/*.ts?(x)': wallaby.compilers.typeScript({ })
    },
  };
};
