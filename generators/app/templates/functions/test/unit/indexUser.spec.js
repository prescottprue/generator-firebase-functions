import * as admin from 'firebase-admin'
const userId = 1
const refParam = `users_public/${userId}`

describe('indexUser RTDB Cloud Function (onWrite)', () => {
  let adminInitStub
  let indexUser

  before(() => {
    /* eslint-disable global-require */
    adminInitStub = sinon.stub(admin, 'initializeApp')
    // Syntax may change when this issue is addressed
    // [#2](https://github.com/firebase/firebase-functions-test/issues/2)
    indexUser = functionsTest.wrap(
      require(`${__dirname}/../../index`).indexUser
    )
    /* eslint-enable global-require */
  })

  after(() => {
    adminInitStub.restore()
    functionsTest.cleanup()
  })

  it('handles event', async () => {
    const databaseStub = sinon.stub()
    const refStub = sinon.stub()
    const removeStub = sinon.stub()

    refStub.withArgs(refParam).returns({ remove: removeStub })
    removeStub.returns(Promise.resolve({ ref: 'new_ref' }))
    databaseStub.returns({ ref: refStub })
    sinon.stub(admin, 'database').get(() => databaseStub)
    const snap = {
      val: () => null
    }
    const fakeContext = {
      params: { filePath: 'testing', userId: 1 }
    }

    const res = await indexUser({ after: snap }, fakeContext)
    expect(res).to.be.null
  })
})
