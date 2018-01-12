const functions = require('firebase-functions');
const admin = require('firebase-admin');
const helloWorld = require('./dist/helloWorld').default;

// Initialize Firebase once at the top level so it is available to all funcitons
admin.initializeApp(functions.config().firebase);

exports.helloWorld = helloWorld;
