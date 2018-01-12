'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const yosay = require('yosay');

const filesArray = [
  { src: 'functions/**', dest: 'functions' },
  { src: 'functions/.eslintrc', dest: 'functions/.eslintrc' },
  { src: 'functions/.babelrc', dest: 'functions/.babelrc' },
  { src: '.babelrc', dest: '.babelrc' },
  { src: 'firebase.json', dest: 'firebase.json' },
  { src: '.eslintignore', dest: '.eslintignore' },
  { src: '.eslintrc', dest: '.eslintrc' },
  { src: 'package.json', dest: 'package.json' },
  { src: 'README.md', dest: 'README.md' },
  { src: 'gitignore', dest: '.gitignore' }
];

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', { type: String, required: false });
    this.intialData = {
      version: '0.0.1',
      codeClimate: true,
      appPath: this.env.options.appPath,
      appName: this.options.name || path.basename(process.cwd()) || 'react-firebase'
    };
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the terrific ' +
          chalk.red('generator-firebase-functions') +
          ' generator!'
      )
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'includeTests',
        message: 'Do you want to include tests?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.data = Object.assign({}, this.intialData, props);
    });
  }

  writing() {
    if (this.props.includeTests) {
      filesArray.push(
        { src: 'functions/test/**', dest: 'functions/test' },
        { src: 'functions/test/.eslintrc', dest: 'functions/test/.eslintrc' }
      );
    }
    filesArray.forEach(file => {
      if (file.src.indexOf('.png') !== -1) {
        return this.fs.copy(
          this.templatePath(file.src),
          this.destinationPath(file.dest || file.src || file)
        );
      }
      return this.fs.copyTpl(
        this.templatePath(file.src || file),
        this.destinationPath(file.dest || file.src || file),
        this.data
      );
    });
  }

  install() {
    this.npmInstall();
    // Handled by postinstall in package.json
    // this.npmInstall([], { prefix: 'functions' });
  }
};
