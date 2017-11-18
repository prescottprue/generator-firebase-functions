'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

















/**
                                                                                                                                                                                                                                                                                                                                             * Handle downloading service account from cloud storage and store it within
                                                                                                                                                                                                                                                                                                                                             * Firestore. Could be a storage function, but it would require more code
                                                                                                                                                                                                                                                                                                                                             * due to being triggered for all storage files.
                                                                                                                                                                                                                                                                                                                                             * @param  {functions.Event} event - Function event triggered when adding a new
                                                                                                                                                                                                                                                                                                                                             * service account to a project
                                                                                                                                                                                                                                                                                                                                             * @return {Promise} Resolves with filePath
                                                                                                                                                                                                                                                                                                                                             */var handleServiceAccountCreate = function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(
  function _callee(event) {var _event$data$data, fullPath, tempLocalFile, fileName, tempFilePath, fileData;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_event$data$data =
            event.data.data(), fullPath = _event$data$data.fullPath;
            tempLocalFile = _path2.default.join(_os2.default.tmpdir(), fullPath);
            fileName = _path2.default.basename(fullPath); // File Name
            tempFilePath = _path2.default.join(_os2.default.tmpdir(), fileName);_context.next = 6;return (
              bucket.file(fullPath).download({ destination: tempFilePath }));case 6:
            console.log('File downloaded locally to', tempFilePath);
            // Create Temporary directory and download file to that folder
            _context.next = 9;return _fsExtra2.default.readJson(tempLocalFile);case 9:fileData = _context.sent;_context.next = 12;return (

              event.data.ref.update({ credential: fileData }));case 12:
            console.log('Service account copied to Firestore, cleaning up...');
            // Once the file data hase been added to db delete the local files to free up disk space.
            _fsExtra2.default.unlinkSync(tempLocalFile);return _context.abrupt('return',
            fullPath);case 15:case 'end':return _context.stop();}}}, _callee, this);}));return function handleServiceAccountCreate(_x) {return _ref.apply(this, arguments);};}();var _fsExtra = require('fs-extra');var _fsExtra2 = _interopRequireDefault(_fsExtra);var _os = require('os');var _os2 = _interopRequireDefault(_os);var _path = require('path');var _path2 = _interopRequireDefault(_path);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var functions = require('firebase-functions'); /* eslint-disable no-console */var gcs = require('@google-cloud/storage')();var bucket = gcs.bucket(functions.config().firebase.storageBucket); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @name copyServiceAccountToFirestore
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * Copy service account to Firestore from Cloud Storage when new service
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * account meta data is added to Firestore
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @type {functions.CloudFunction}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */exports.default = functions.firestore.document('projects/{projectId}/serviceAccounts/{serviceAccountId}').onCreate(handleServiceAccountCreate);