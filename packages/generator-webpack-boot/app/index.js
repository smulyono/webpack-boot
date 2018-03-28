'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require("path");

module.exports = class extends Generator {
    constructor(args, options) {
        super(args, options);
        // check for arguments, this is shorthand for
        // creating project on certain root directory
        this.argument("name", {
            type : String,
            required : false,
            desc : "project full directory path"
        });
    }

    prompting() {
        if (this.options.name) {
            this.props = {};
            var dirname = path.dirname(this.options.name);
            var basename = path.basename(this.options.name);
            this.props.name = basename;
            this.destinationRoot(this.options.name);
            return ;
        }

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the excellent '
            + chalk.red('WebpackBoot')
            + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'Project name : '
        }];

        return this.prompt(prompts)
            .then((props) => {
                this.props = props;
                // To access props later use this.props.someOption;
                this.destinationRoot(this.props.name);
        });
    }

    copyAppStructures() {
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            {
                name: this.props.name
            }
        );
    }

    copyProjectfiles() {
        this.fs.copy(
            this.templatePath('editorconfig'),
            this.destinationPath('.editorconfig')
        );
        this.fs.copy(
            this.templatePath('babelrc'),
            this.destinationPath('.babelrc')
        );
        // default landing page
        this.fs.copyTpl(
            this.templatePath('_index.html'),
            this.destinationPath('src/assets/pages/index.html'),
            {
                name: this.props.name
            }
        );
        // default stylesheet
        this.fs.copyTpl(
            this.templatePath('_index.css'),
            this.destinationPath('src/assets/styles/index.css'),
            {}
        );
        // Default application page
        this.fs.copyTpl(
            this.templatePath('_index.js'),
            this.destinationPath('src/index.js'),
            {
                name: this.props.name
            }
        );
        // Boot environment configuration
        this.fs.copy(
            this.templatePath('_boot.env'),
            this.destinationPath('.boot.env')
        );
        // Readme file
        this.fs.copyTpl(
            this.templatePath('_Readme.md'),
            this.destinationPath('Readme.md'),
            {
                name : this.props.name
            }
        );
    }

    install() {
        this.installDependencies({
            npm : false,
            bower : false,
            yarn : true
        });
        this.log("-------------------------------------------------------------");
        this.log("Run " + chalk.yellow("yarn start") + " to start development server");
    }
}
