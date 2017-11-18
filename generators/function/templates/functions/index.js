const functions = require('firebase-functions')
const admin = require('firebase-admin')
const storageFileToDb = require('./dist/storageFileToDb').default
const dataMigration = require('./dist/dataMigration').default
const copyServiceAccountToFirestore = require('./dist/copyServiceAccountToFirestore')
  .default

admin.initializeApp(functions.config().firebase)

exports.dataMigration = dataMigration
exports.copyServiceAccountToFirestore = copyServiceAccountToFirestore
exports.storageFileToDb = storageFileToDb
