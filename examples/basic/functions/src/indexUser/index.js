import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { to } from '../utils/async';

/**
 * Index user's by placing their displayName into the users_public collection
 * @param  {functions.Change} change - Database event from function being
 * @param  {admin.DataSnapshot} change.before - Snapshot of data before change
 * @param  {admin.DataSnapshot} change.after - Snapshot of data after change
 * @param  {functions.EventContext} context - Function context which includes
 * data about the event. More info in docs:
 * https://firebase.google.com/docs/reference/functions/functions.EventContext
 * @return {Promise} Resolves with user's profile
 */
async function indexUser(change, context) {
  const { before, after } = change;
  console.log('index user event:', { before, after, context });
  const ref = admin.database().ref('responses');
  const [writeErr, response] = await to(ref.push({ hello: 'world' }));
  if (writeErr) {
    console.error(
      `Error writing response: ${writeErr.message || ''}`,
      writeErr
    );
    throw writeErr;
  }
  return response;
}

/**
 * Function to index user data into a public collection for easy access.
 * Triggered by updates to profile within "users/${userId}" path. Writes data
 * to users_public path.
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref('/users/{userId}/displayName')
  .onWrite(indexUser);
