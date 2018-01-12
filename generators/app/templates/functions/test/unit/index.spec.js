import { getFunctionsWithMockedFirebase, restoreStubs } from '../utils';

describe('Cloud Functions', () => {
  let myFunctions;
  let configStub;
  let adminInitStub;

  before(() => {
    const mocked = getFunctionsWithMockedFirebase();
    myFunctions = mocked.myFunctions;
    configStub = mocked.configStub;
    adminInitStub = mocked.adminInitStub;
  });

  after(() => {
    // Restoring our stubs to the original methods
    restoreStubs([configStub, adminInitStub]);
  });

  it('sets my functions', () => {
    expect(myFunctions.helloWorld).to.exist;
  });
});
