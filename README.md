# generator-firebase-functions

[![Code Style][code-style-image]][code-style-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Build Status][travis-image]][travis-url]

## Getting Started

* Install dependencies: `npm install` (installs `functions` dependencies as well)

## Functions Scripts
A number of npm scripts which are in `functions/package.json` are exposed as top level npm scripts with `functions:` prefix.

### Building

Running in the root of the project:

```sh
npm run functions:build
```

In the `functions` folder:

```sh
npm run build
```

### Serving Functions

Running in the root of the project:

```sh
npm run functions:serve
```

In the `functions` folder:

```sh
npm run serve
```

### Emulation

Functions can be emulated through the functions shell. To run in the root of the project:

```sh
npm run functions:emulate
```

In the `functions` folder:

```sh
npm run emulate
```

## Sub generators

Sub generators are included to help speed up the application building process. You can run a sub-generator by calling `yo firebase-functions:<name of sub-generator> <param1>`.

Example: To call the `component` sub-generator with "SomeThing" as the first parameter write: `yo firebase-functions:function SomeThing`

##### Path Argument
Another argument can be passed to sub generators (unless otherwise noted) to provide the base path in which you would like to run the generator (starts from `src`). For example: `yo firebase-functions:function Car routes/Project` runs the component generator within the Project route folder meaning that the component will be added to `routes/Project/components` instead of the top level `src/components` folder.

#### Function

Generates a Cloud Function allowing the user to specify trigger type (from HTTPS, Firestore, RTDB, Auth, or Storage)

A component is best for things that will be reused in multiple places. Our example

**command**

`yo firebase-functions:function uppercaser`

**result**

```
/functions
--/uppercaser
----index.js
```

For firebase-functions `<v1.0.0`:

*/functions/uppercaser/index.js:*

```js
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { to } from 'utils/async'

/**
 * @name uppercaser
 * Cloud Function triggered by Real Time Database Event
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref('/users/{userId}')
  .onUpdate(uppercaserEvent)

/**
 * @param  {functions.Event} event - Function event
 * @return {Promise}
 */
async function uppercaserEvent(event) {
  const eventData = event.data.val()
  const params = event.params
  const ref = admin.database().ref('responses')
  const [writeErr, response] = await to(ref.push(eventData))
  if (writeErr) {
    console.error('Error writing response:', writeErr.message || writeErr)
    throw writeErr
  }
  return response
}
```

For firebase-functions `>=v1.0.0`:

*/functions/uppercaser/index.js:*

```js
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { to } from 'utils/async'

/**
 * @name uppercaser
 * Cloud Function triggered by Real Time Database Event
 * @type {functions.CloudFunction}
 */
export default functions.database
  .ref('/users/{userId}')
  .onUpdate(uppercaserEvent)

/**
 * @param  {functions.Event} event - Function event
 * @return {Promise}
 */
async function uppercaserEvent(change, context) {
  // const { params, auth, timestamp } = context
  // const { before, after } = change
  const ref = admin.database().ref('responses')
  const [writeErr, response] = await to(ref.push({ hello: 'world' }))
  if (writeErr) {
    console.error('Error writing response:', writeErr.message || writeErr)
    throw writeErr
  }
  return response
}
```

Note: This sub-generator does not support the Path Argument (functions are already placed within a folder matching their name).


[travis-image]: https://img.shields.io/travis/generator-firebase-functions/generator-firebase-functions/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/generator-firebase-functions/generator-firebase-functions
[daviddm-image]: https://img.shields.io/david/generator-firebase-functions/generator-firebase-functions.svg?style=flat-square
[daviddm-url]: https://david-dm.org/generator-firebase-functions/generator-firebase-functions
[code-style-image]: https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square
[code-style-url]: https://github.com/airbnb/javascript
