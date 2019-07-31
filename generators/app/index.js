const Generator = require('yeoman-generator')
const chalk = require('chalk')
const path = require('path')
const yosay = require('yosay')
const commandExistsSync = require('command-exists').sync

const filesArray = [
  { src: 'functions/**', dest: 'functions' },
  { src: 'functions/.eslintrc.js', dest: 'functions/.eslintrc.js' },
  { src: 'functions/.babelrc', dest: 'functions/.babelrc' },
  {
    src: 'functions/.runtimeconfig.json',
    dest: 'functions/.runtimeconfig.json'
  },
  { src: 'firebase.json', dest: 'firebase.json' },
  { src: '.firebaserc', dest: '.firebaserc' },
  { src: '.eslintignore', dest: '.eslintignore' },
  { src: '.eslintrc.js', dest: '.eslintrc.js' },
  { src: 'package.json', dest: 'package.json' },
  { src: 'README.md', dest: 'README.md' },
  { src: 'gitignore', dest: '.gitignore' }
]

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('name', { type: String, required: false })
    this.intialData = {
      version: '0.0.1',
      codeClimate: true,
      appPath: this.env.options.appPath,
      appName:
        this.options.name || path.basename(process.cwd()) || 'react-firebase'
    }
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the terrific ${chalk.red(
          'generator-firebase-functions'
        )} generator!`
      )
    )

    const prompts = [
      {
        type: 'confirm',
        name: 'includeTests',
        message: 'Do you want to include tests?',
        default: true
      },
      {
        type: 'confirm',
        name: 'useYarn',
        message: 'Use Yarn?',
        when: () => commandExistsSync('yarn'),
        default: true
      }
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
      this.data = Object.assign({}, this.intialData, props)
    })
  }

  writing() {
    if (this.props.includeTests) {
      filesArray.push(
        { src: 'functions/scripts/**', dest: 'functions/scripts' },
        { src: 'functions/mocha.opts' }
        // { src: 'functions/test/setup.js', dest: 'functions/test/setup.js' },
      )
    }
    filesArray.forEach(file => {
      if (file.noTemplating || file.src.indexOf('.png') !== -1) {
        return this.fs.copy(
          this.templatePath(file.src),
          this.destinationPath(file.dest || file.src || file)
        )
      }
      return this.fs.copyTpl(
        this.templatePath(file.src || file),
        this.destinationPath(file.dest || file.src || file),
        this.data
      )
    })
  }

  install() {
    /* eslint-disable no-console */
    console.log(chalk.blue('\nProject Generated successfully'))
    const yarnExists = commandExistsSync('yarn')
    const installCommand = yarnExists ? 'yarnInstall' : 'npmInstall'
    const depManagerName = yarnExists ? 'Yarn' : 'NPM'
    console.log(`Installing dependencies using ${depManagerName}...`)
    // Promise chaining used since this.npmInstall.then not a function
    return Promise.resolve()
      .then(() => {
        return Promise.all([
          this[installCommand](),
          this[installCommand](undefined, {
            [yarnExists ? 'cwd' : 'prefix']: 'functions'
          })
        ])
      })
      .then(() => {
        console.log(
          chalk.blue(
            `Dependencies successfully installed using ${depManagerName}...`
          )
        )
      })
  }
}
