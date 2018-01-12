import { getFunctionsWithMockedFirebase, restoreStubs } from '../utils';

describe('<%= name %> Database Function', () => {
  let myFunctions;
  let configStub;
  let adminInitStub;
  let databaseStub;
  let req;
  let res;

  beforeEach(() => {
    const mocked = getFunctionsWithMockedFirebase();
    myFunctions = mocked.myFunctions;
    configStub = mocked.configStub;
    adminInitStub = mocked.adminInitStub;
  });

  afterEach(() => {
    // Restoring our stubs to the original methods
    restoreStubs([configStub, adminInitStub, databaseStub]);
  });

  it('responds when requested', done => {
    // A fake request object, with req.query.text set to 'input'
    const fakeEvent = {
      // The DeltaSnapshot constructor is used by the Functions SDK to transform a raw event from
      // your database into an object with utility functions such as .val().
      // Its signature is: DeltaSnapshot(app: firebase.app.App, adminApp: firebase.app.App,
      // data: any, delta: any, path?: string);
      // We can pass null for the first 2 parameters. The data parameter represents the state of
      // the database item before the event, while the delta parameter represents the change that
      // occured to cause the event to fire. The last parameter is the database path, which we are
      // not making use of in this test. So we will omit it.
      data: new functions.database.DeltaSnapshot(null, null, null, 'input'),
      // To mock a database delete event:
      // data: new functions.database.DeltaSnapshot(null, null, 'old_data', null)
    };
    myFunctions.<%= name %>(fakeEvent);
  });
});
