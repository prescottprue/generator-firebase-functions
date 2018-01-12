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
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const filesArray = [
      {
        src: 'httpFunction.js',
        dest: `functions/src/${this.options.name}.js`
      }
    ];
    if (this.props.includeTests) {
      filesArray.push({
        src: 'test.js',
        dest: `functions/test/unit/${this.options.name}.spec.js`
      });
    }
    filesArray.forEach(file => {
      return this.fs.copyTpl(
        this.templatePath(file.src || file),
        this.destinationPath(file.dest || file.src || file),
        Object.assign({}, this.answers, {
          name: this.options.name,
          lowerName: this.options.name.toLowerCase()
        })
      );
    });
  }
};
