const glob = require('glob');
const path = require('path');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

const config = {
  // Files/folders which do not contain cloud functions (relative to src)
  ignoreGlobs: [
    'utils/**',
    'constants'
  ],
  // Point to src folder when running test coverage so percentages are relative
  // to source code instead of babelified version
  srcFolder: process.env.COVERAGE ? './src' : './dist'
};

// Initialize Firebase so it is available within functions
try {
  admin.initializeApp(functions.config().firebase);
} catch (e) {
  /* istanbul ignore next: not called in tests */
  console.error(
    'Caught error initializing app with functions.config():',
    e.message || e
  );
}

// Load all folders within dist directory (mirrors layout of src after
// being built by babel using npm run build or npm run watch)
const files = glob.sync(config.srcFolder + '/**/index.js', {
  cwd: __dirname,
  ignore: [
    './node_modules/**',
  ].concat(
    config.ignoreGlobs.map(globPath => config.srcFolder + '/' + globPath)
  )
});

// Loop over all folders found within dist, loading only the relevant function
// based on FUNCTION_NAME environment variable
files.forEach(functionFile => {
  // Get folder name from file name (removing any dashes)
  const folderName = path
    .basename(path.dirname(functionFile))
    .replace(/[-]/g, '');

  // Load single function from default
  !process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === folderName // eslint-disable-line no-unused-expressions
    ? (exports[folderName] = require(functionFile).default) // eslint-disable-line global-require, import/dynamic-require
    : () => {};
});
