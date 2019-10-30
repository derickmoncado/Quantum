# Frontend Starter Kit
A Bootstrapped, Gulp-powered, Sassified, frontend project boilerplate with Browsersync, hot reloading, and the Bourbon Sass library. All built on top of Handlebars.js for HTML templating.

### Features

* Bootstrap 4
* Gulp 4
* Sass
* Bourbon
* HTML templating (Handlebars)
* Autoprefixing
* Sourcemaps
* Concatenation
* Minification
* Linting
* Accessibility
* Browsersync w/ hot reloading

Changes should be commited to `src/` files only.

### How to use

The template is built with Sass and Gulp build system with these features:

-	Handlebars HTML templates with Panini– Panini is a super simple flat file generator for use with Gulp. It compiles a series of HTML pages using a common layout. These pages can also include HTML partials, external Handlebars helpers, or external data as JSON.
-	Sass compilation, prefixing with Autoprefixer, and JavaScript concatenation
-	Built-in BrowserSync server - Will automatically reload your page when files are changed. It also live-injects CSS changes when you save a Sass file. This task runs continuously. Defaults to localhost.
-	For production builds - CSS compression, JavaScript compression, Image compression and more..


### Requirements

To use this template, your will need:

-	Node.js
-   Test: run ` node -v ` in the terminal
-	Npm (Node comes with npm installed so you should have a version of npm.)
-   Test: run ` npm -v`  in the terminal
-	Gulp – task runner
	`npm install -g gulp`
-	Test: run `gulp -v ` in the terminal

### Installing:

- Clone this repo: `git clone https://github.com/dmoncado/frontend-starter-kit`
- Navigate into the repo directory: `cd frontend-start-kit`
- Install all node packages: `npm install`
- Run `gulp dev`
- Your site is now viewable at this URL: http://localhost:3000
- To create compressed, production-ready assets run `gulp prod`. This will delete everything in the dist folder and recreate all of your complied files. Never make updates directly into the dist folder as these files get overridden each time. Note: The dist folder is not kept in source control.


### Folder Structure:

- `dist/` - compiled files
- `node_modules` - front-end dependencies (.gitignore'd)
- `src/` - contains all of your core, working files—static assets, pages, templates, etc.
- `src/assets/` - scss files, JS files, images, and fonts
- `src/layouts/` - HTML layouts templates
- `src/pages/` - site pages
- `src/partials/` - handlebars partials files.
- `gulpfile.js` - all task definitions
- `package.json` - handles the front-end dependencies
- `.htmllintrc` - handles the HTML lint rules
- `.sass-lint.yml` - handles the SCSS lint rules
- `reports` - txt generated file for accessibility issues
