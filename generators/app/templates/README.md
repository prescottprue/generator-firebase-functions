# <%= appName %>

[![Code Style][code-style-image]][code-style-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Build Status][travis-image]][travis-url]

## Getting Started

* Install dependencies: `npm install` (installs `functions` dependencies as well)

## Building Functions

Running in the root of the project:

```sh
npm run functions:build
```

In the `functions` folder:

```sh
npm run build
```

## Serving Functions

Running in the root of the project:

```sh
npm run functions:serve
```

In the `functions` folder:

```sh
npm run serve
```

## Emulating Functions

Functions can be emulated through the functions shell. To run in the root of the project:

```sh
npm run functions:emulate
```

In the `functions` folder:

```sh
npm run emulate
```

[travis-image]: https://img.shields.io/travis/<%= appName %>/<%= appName %>/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/<%= appName %>/<%= appName %>
[daviddm-image]: https://img.shields.io/david/<%= appName %>/<%= appName %>.svg?style=flat-square
[daviddm-url]: https://david-dm.org/<%= appName %>/<%= appName %>
[code-style-image]: https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square
[code-style-url]: https://github.com/airbnb/javascript
