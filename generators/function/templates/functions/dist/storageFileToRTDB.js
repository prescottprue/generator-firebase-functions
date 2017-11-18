'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var copyFileToRTDB = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(



















  function _callee(event) {var eventData, filePath, databasePath, _eventData$keepPushKe, keepPushKey, tempLocalFile, tempLocalDir, fileData;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            eventData = event.data.val();
            filePath = eventData.filePath, databasePath = eventData.databasePath, _eventData$keepPushKe = eventData.keepPushKey, keepPushKey = _eventData$keepPushKe === undefined ? false : _eventData$keepPushKe;
            tempLocalFile = _path2.default.join(_os2.default.tmpdir(), filePath);
            tempLocalDir = _path2.default.dirname(tempLocalFile);_context.next = 6;return (
              (0, _mkdirpPromise2.default)(tempLocalDir));case 6:_context.next = 8;return (

              bucket.file(filePath).download({ destination: tempLocalFile }));case 8:_context.next = 10;return (

              _fsExtra2.default.readJson(filePath));case 10:fileData = _context.sent;
            console.log('File data loaded, writing to database', event.data.val());
            // Write File data to DB
            _context.next = 14;return event.data.adminRef.ref.root.
            child(databasePath + '/' + (keepPushKey ? event.params.pushId : '')).
            set(fileData);case 14:_context.next = 16;return (

              event.data.adminRef.ref.root.
              child('responses/' + eventPathName + '/' + event.params.pushId).
              set({
                completed: true,
                completedAt: admin.database.ServerValue.TIMESTAMP }));case 16:

            console.log('Copying data to DB, cleaning up...');
            // Once the file data hase been added to db delete the local files to free up disk space.
            _fsExtra2.default.unlinkSync(tempLocalFile);return _context.abrupt('return',
            filePath);case 19:case 'end':return _context.stop();}}}, _callee, this);}));return function copyFileToRTDB(_x) {return _ref.apply(this, arguments);};}();var _fsExtra = require('fs-extra');var _fsExtra2 = _interopRequireDefault(_fsExtra);var _os = require('os');var _os2 = _interopRequireDefault(_os);var _path = require('path');var _path2 = _interopRequireDefault(_path);var _firebaseAdmin = require('firebase-admin');var admin = _interopRequireWildcard(_firebaseAdmin);var _mkdirpPromise = require('mkdirp-promise');var _mkdirpPromise2 = _interopRequireDefault(_mkdirpPromise);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var functions = require('firebase-functions');var gcs = require('@google-cloud/storage')();var bucket = gcs.bucket(functions.config().firebase.storageBucket);var eventPathName = 'fileToDb'; /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @name storageFileToRTDB
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Convert a JSON file from storage bucket into a data on RTDB
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @type {functions.CloudFunction}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */exports.default = functions.database.ref('/requests/' + eventPathName + '/{pushId}').onCreate(copyFileToRTDB);