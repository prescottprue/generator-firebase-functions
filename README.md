# generator-firebase-functions

> Yeoman generator for Firebase Functions including support for separate files

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

## Installation

Install [Yeoman](http://yeoman.io) and generator-firebase-functions using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)):

```bash
npm install -g yo
npm install -g generator-firebase-functions
```

## Getting Started

### Create Project
This section can be skipped if you have an already existing Firebase project
  1. Make a new folder and enter it: `mkdir myProject && cd myProject`
  1. Running `npm init` to initialize an npm project *suggested but optional*
  1. Make sure firebase-tools are installed with `npm i -g firebase-tools`
  1. Run `firebase init` to initialize a Firebase project
  1. Include at least Functions

### Run Generator

1. Enter an already existing Firebase project
1. Generate functions: `yo firebase-functions`

### Single Function

Generate a single function by calling its type

#### HTTP

1. Run `yo firebase-functions:http myFunc`

#### Database

1. Run `yo firebase-functions:database myFunc`

#### Storage

1. Run `yo firebase-functions:storage myFunc`

## Roadmap
* Single Function generator for remaining event types (Analytics Event, PubSub event)
* Option for each type of database event type (`onCreate`, `onWrite`)

## License

MIT © [Scott Prue](http://prue.io)

[npm-image]: https://img.shields.io/npm/v/generator-firebase-functions.svg?style=flat-square
[npm-url]: https://npmjs.org/package/generator-firebase-functions
[npm-downloads-image]: https://img.shields.io/npm/dm/generator-firebase-functions.svg?style=flat-square
[quality-image]: http://npm.packagequality.com/shield/generator-firebase-functions.svg?style=flat-square
[quality-url]: https://packagequality.com/#?package=generator-firebase-functions
[travis-image]: https://img.shields.io/travis/prescottprue/generator-firebase-functions/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/prescottprue/generator-firebase-functions
[daviddm-image]: https://img.shields.io/david/prescottprue/generator-firebase-functions.svg?style=flat-square
[daviddm-url]: https://david-dm.org/prescottprue/generator-firebase-functions
[climate-image]: https://img.shields.io/codeclimate/github/prescottprue/generator-firebase-functions.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/prescottprue/generator-firebase-functions
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/prescottprue/generator-firebase-functions.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/prescottprue/generator-firebase-functions
[license-image]: https://img.shields.io/npm/l/generator-firebase-functions.svg?style=flat-square
[license-url]: https://github.com/prescottprue/generator-firebase-functions/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
[gitter-image]: https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square
[gitter-url]: https://gitter.im/prescottprue/generator-firebase-functions
