import * as admin from 'firebase-admin'
import path from 'path'
import os from 'os'
const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();

export default functions.storage.object().onChange(handleObjectChange)

async function handleObjectChange(event) {
  const {
    bucket,
    name,
    contentType,
    resourceState,
    metageneration
  } = event.data;
  const fileName = path.basename(filePath);

  // Exit if this is a move or deletion event.
  if (resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return;
  }

  // Exit if file exists but is not new and is only being triggered
  // because of a metadata change.
  if (resourceState === 'exists' && metageneration > 1) {
    console.log('This is a metadata change event.');
    return;
  }
  const tempFilePath = path.join(os.tmpdir(), fileName);

}
