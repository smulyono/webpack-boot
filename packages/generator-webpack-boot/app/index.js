'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the excellent ' + chalk.red('WebpackBoot') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'Project name : '
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            // To access props later use this.props.someOption;
            this.destinationRoot(this.props.name);
            done();
        }.bind(this));
    },

    copyAppStructures: function () {
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            {
                name: this.props.name
            }
        );
    },

    copyProjectfiles: function () {
        this.fs.copy(
            this.templatePath('editorconfig'),
            this.destinationPath('.editorconfig')
        );
        this.fs.copy(
            this.templatePath('babelrc'),
            this.destinationPath('.babelrc')
        );
        this.fs.copyTpl(
            this.templatePath('_index.html'),
            this.destinationPath('src/assets/pages/index.html'),
            {
                name: this.props.name
            }
        );
        this.fs.copyTpl(
            this.templatePath('_index.js'),
            this.destinationPath('src/index.js'),
            {
                name: this.props.name
            }
        );        
    },
    install: function () {
        this.log("Run " + chalk.yellow("yarn install") + " to install required dependencies");
        this.log("Run " + chalk.yellow("yarn start") + " to start development server");
    }
});
