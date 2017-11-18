'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var handleMigrateRequest = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(

















  function _callee(event) {var _event$data$val, _event$data$val$servi, serviceAccountType, errMessage;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            console.log('Running migration', event.data.val());_event$data$val =
            event.data.val(), _event$data$val$servi = _event$data$val.serviceAccountType, serviceAccountType = _event$data$val$servi === undefined ? 'firestore' : _event$data$val$servi;_context.t0 =
            serviceAccountType;_context.next = _context.t0 ===
            'firestore' ? 5 : 6;break;case 5:return _context.abrupt('return',
            migrationUsingFirestore(event));case 6:

            errMessage = 'Invalid event type in migration request';
            console.error(errMessage);throw (
              new Error(errMessage));case 9:case 'end':return _context.stop();}}}, _callee, this);}));return function handleMigrateRequest(_x) {return _ref.apply(this, arguments);};}();




















/**
                                                                                                                                                                                           * Data migration using Service account stored on Firestore
                                                                                                                                                                                           * @param  {functions.Event} event [description]
                                                                                                                                                                                           * @param  {object|undefined} event.params [description]
                                                                                                                                                                                           * @param  {String} event.data.serviceAccountType - Type of service accounts, options
                                                                                                                                                                                           * include 'firestore', 'storage', or 'rtdb'
                                                                                                                                                                                           * @return {Promise}
                                                                                                                                                                                           */var migrationUsingFirestore = function () {var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(
  function _callee3(event) {var eventData, _event$data$val2, serviceAccount1Path, serviceAccount2Path, _event$data$val2$data, dataType, app1, app2;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            eventData = event.data.val();_event$data$val2 =




            event.data.val(), serviceAccount1Path = _event$data$val2.serviceAccount1Path, serviceAccount2Path = _event$data$val2.serviceAccount2Path, _event$data$val2$data = _event$data$val2.dataType, dataType = _event$data$val2$data === undefined ? 'firestore' : _event$data$val2$data;
            app1 = appFromFirestorePath(serviceAccount1Path, 'app1');
            app2 = appFromFirestorePath(serviceAccount2Path, 'app2');_context3.t0 =
            dataType;_context3.next = _context3.t0 ===
            'firestore' ? 7 : _context3.t0 ===


            'rtdb' ? 10 : 13;break;case 7:_context3.next = 9;return copyBetweenFirestoreInstances(app1, app2, eventData);case 9:return _context3.abrupt('break', 14);case 10:_context3.next = 12;return (
              copyBetweenRTDBInstances(app1, app2, eventData));case 12:return _context3.abrupt('break', 14);case 13:throw (


              new Error(
              'Data type not supported. Try firestore, rtdb, or storage'));case 14:return _context3.abrupt('return',


            updateResponseOnRTDB(event));case 15:case 'end':return _context3.stop();}}}, _callee3, this);}));return function migrationUsingFirestore(_x4) {return _ref3.apply(this, arguments);};}();var copyBetweenFirestoreInstances = function () {var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(


  function _callee4(app1, app2, eventData) {var firestore1, firestore2, copyPath, dataFromFirst;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
            console.log('starting copyBetweenFirestoreInstances', eventData);
            firestore1 = app1.firestore();
            firestore2 = app2.firestore();
            copyPath = eventData.copyPath;
            // TODO: Use runTransaction
            _context4.prev = 4;_context4.next = 7;return (
              firestore1.doc(copyPath).get());case 7:dataFromFirst = _context4.sent;_context4.next = 10;return (
              firestore2.doc(copyPath).update(dataFromFirst));case 10:
            console.log('copy between firestore instances was successful');_context4.next = 16;break;case 13:_context4.prev = 13;_context4.t0 = _context4['catch'](4);

            console.log('error copying between firestore instances');case 16:case 'end':return _context4.stop();}}}, _callee4, this, [[4, 13]]);}));return function copyBetweenFirestoreInstances(_x5, _x6, _x7) {return _ref4.apply(this, arguments);};}();var copyBetweenRTDBInstances = function () {var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(



  function _callee5(app1, app2, eventData) {var firstRTDB, secondRTDB, copyPath, dataSnapFromFirst, dataFromFirst, errorMessage;return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
            firstRTDB = app1.database();
            secondRTDB = app2.database();
            copyPath = eventData.copyPath;_context5.prev = 3;_context5.next = 6;return (

              firstRTDB.ref(copyPath).once('value'));case 6:dataSnapFromFirst = _context5.sent;
            dataFromFirst = (0, _lodash.invoke)(dataSnapFromFirst, 'val');if (
            dataFromFirst) {_context5.next = 12;break;}
            errorMessage = 'Path does not exist in First source database';
            console.error(errorMessage);throw (
              new Error(errorMessage));case 12:_context5.next = 14;return (

              secondRTDB.ref(copyPath).update(dataFromFirst));case 14:
            console.log('copy between database instances was successful');_context5.next = 20;break;case 17:_context5.prev = 17;_context5.t0 = _context5['catch'](3);

            console.log('error copying between firestore instances');case 20:case 'end':return _context5.stop();}}}, _callee5, this, [[3, 17]]);}));return function copyBetweenRTDBInstances(_x8, _x9, _x10) {return _ref5.apply(this, arguments);};}();var _firebaseAdmin = require('firebase-admin');var admin = _interopRequireWildcard(_firebaseAdmin);var _os = require('os');var _os2 = _interopRequireDefault(_os);var _fsExtra = require('fs-extra');var _fsExtra2 = _interopRequireDefault(_fsExtra);var _mkdirpPromise = require('mkdirp-promise');var _mkdirpPromise2 = _interopRequireDefault(_mkdirpPromise);var _lodash = require('lodash');function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var functions = require('firebase-functions'); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @name dataMigration
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * Migrate data. Multiple serviceAccountTypes supported (i.e. stored on
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * Firestore or cloud storage)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @type {functions.CloudFunction}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */ /* eslint-disable no-console */exports.default = functions.database.ref('/requests/migration/{pushId}').onCreate(handleMigrateRequest);var appFromFirestorePath = function () {var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(path, name) {var firestore, serviceAccountData, localPath, tempLocalFile, tempLocalDir;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:firestore = admin.firestore();_context2.next = 3;return firestore.doc(path).get();case 3:serviceAccountData = _context2.sent;localPath = 'serviceAccounts/' + name;tempLocalFile = path.join(_os2.default.tmpdir(), localPath);tempLocalDir = path.dirname(tempLocalFile);_context2.next = 9;return (0, _mkdirpPromise2.default)(tempLocalDir);case 9:_context2.next = 11;return _fsExtra2.default.writeJson(tempLocalFile, serviceAccountData.serviceAccount);case 11:return _context2.abrupt('return', admin.initializeApp({ credential: admin.credential.cert(tempLocalFile), databaseURL: serviceAccountData.databaseURL }, name));case 12:case 'end':return _context2.stop();}}}, _callee2, undefined);}));return function appFromFirestorePath(_x2, _x3) {return _ref2.apply(this, arguments);};}();function updateResponseOnRTDB(event, error) {var response = {
    completed: true,
    completedAt: admin.database.ServerValue.TIMESTAMP };

  if (error) {
    response.error = error.message || error;
    response.status = 'error';
  } else {
    response.status = 'success';
  }
  return event.data.adminRef.ref.root.
  child('responses/migration/' + event.params.pushId).
  set(response);
}

// function updateResponseOnFirestore(event) {
//   return admin.firestore()
//     .child(`responses/migration/${event.params.pushId}`)
//     .set({
//       completed: true,
//       completedAt: admin.database.ServerValue.TIMESTAMP
//     })
// }

// const actionBetweenTwoAppInstances = () => () => {
//   const app1 = appFromFirestorePath(serviceAccount1Path, 'app1')
//   const app2 = appFromFirestorePath(serviceAccount2Path, 'app2')
//   return action(app1, app2)
// }