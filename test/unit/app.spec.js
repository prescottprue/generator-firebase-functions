import path from 'path'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const srcFiles = [
  'functions/src/helloWorld.js'
  // 'functions/src/index.js',
]

const mainFiles = ['functions/package.json']

const testFiles = [
  'functions/test/unit/index.spec.js',
  'functions/test/mocha.opts',
  'functions/test/setup.js'
]

describe('generator-react-firebase:app', function() {
  this.timeout(15000)
  describe('firebaseName', () => {
    describe('validate', () => {
      before(() =>
        helpers
          .run(path.join(__dirname, '../../generators/app'))
          .withPrompts({
            includeTests: true,
            includeAsync: true
          })
          .toPromise()
      )
      describe('creates files for', () => {
        describe('functions source', () => {
          checkForEachFile(srcFiles)
        })
        describe('functions core', () => {
          checkForEachFile(mainFiles)
        })
        describe('tests', () => {
          checkForEachFile(testFiles)
        })
      })
    })
  })
})
