// import * as admin from 'firebase-admin';

const functions = require('firebase-functions');

/**
 * Say hello to the world to show Firebase functions are working
 * @param  {functions.Event} event - function event object
 * @param  {object|undefined} event.params - Parameters from event ref URL
 * @return {Promise}
 */
function handleRequest(request, response) {
  // const dbRef = admin.database().ref(); // eslint-disable-line no-unused-vars
  response.send('Hello from Functions!');
}

/**
 * @name <%= name %>
 * @type {functions.CloudFunction}
 */
export default functions.https.onRequest(handleRequest);
