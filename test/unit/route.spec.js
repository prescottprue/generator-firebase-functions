import path from 'path'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const name = 'Test'
const folderPath = `functions/${name}`

describe('generator-react-firebase:function', () => {
  before(() =>
    helpers.run(path.join(__dirname, '../../generators/function'))
      .withArguments(['Test'])
      .withPrompts({
        usingFirestore: true,
        includeEnhancer: true
      })
      .toPromise()
  )

  describe('index.js file', () => {
    checkForEachFile([ `${folderPath}/index.js` ], folderPath)
    // TODO: Check that content of file is correct
    // it('has correct content', () => {
    //   assert.fileContent('app/components/${name}/${name}.js', //)
    // })
  })

})
