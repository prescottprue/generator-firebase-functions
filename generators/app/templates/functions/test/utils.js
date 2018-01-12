const proxyquire = require('proxyquire').noCallThru();

process.env.FIREBASE_PROJECT = JSON.stringify({
  firebase: {
    databaseURL: 'https://not-a-project.firebaseio.com',
    storageBucket: 'not-a-project.appspot.com'
  }
});

const stubs = {
  'firebase-admin': {
    database: () => ({
      ref: sinon.stub()
    }),
    initializeApp: sinon.spy(),
    credential: {
      applicationDefault: () => ({
        firebase: {
          databaseURL: 'https://not-a-project.firebaseio.com',
          storageBucket: 'not-a-project.appspot.com'
        }
      })
    },
    '@global': true
  },
  functions: {
    config: () => process.env.FIREBASE_PROJECT,
    '@global': true
  }
};

export function getFunctionsWithMockedFirebase() {
  return {
    myFunctions: proxyquire(`${__dirname}/../index`, stubs), // eslint-disable-line import/no-dynamic-require, global-require
    admin: stubs['firebase-admin'],
    functions: stubs.functions,
    configStub: stubs.functions.config
  };
}

export function restoreStubs(args) {
  args.forEach(arg => {
    // Restoring our stubs to the original methods.
    arg && arg.restore && arg.restore();
  });
}
