import { getFunctionsWithMockedFirebase, restoreStubs } from '../utils';

describe('helloWorld HTTP Function', () => {
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
    req = { headers: {} };
    // A fake response object, with a stubbed writeHead and end methods
    res = {
      writeHead: () => {},
      end: str => {
        assert.equal(str, 'Hello from Functions!');
        done();
      },
      send: str => {
        assert.equal(str, 'Hello from Functions!');
        done();
      }
    };
    // Invoke webhook with our fake request and response objects. This will cause the
    // assertions in the response object to be evaluated.
    myFunctions.helloWorld(req, res);
  });
});
