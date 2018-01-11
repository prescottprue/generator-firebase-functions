'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // Get first cli argument, and set it as this.options.name
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The component name'
    });
  }

  prompting() {
    const prompts = [
      {
        type: 'confirm',
        name: 'includeTests',
        message: 'Would you like to include tests?',
        default: false
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('httpFunction.js'),
      this.destinationPath(`functions/${this.options.name}/index.js`),
      Object.assign({}, this.answers, {
        name: this.options.name,
        lowerName: this.options.name.toLowerCase()
      })
    );
  }
};
