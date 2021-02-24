![Quantum sample home page](https://github.com/dmoncado/Quantum/blob/master/src/assets/images/quantum-home.png?raw=true)

# Quantum — A Boilerplate for Front End Developers
Quantum is a Bootstrapped, Gulp-powered, Sassified, front end boilerplate that's focused on automated web development. It comes with Browsersync, hot reloading, Slick carousel, and much more. Quantum is also all built on top of Handlebars.js + Panini for easy HTML templating {{  }}

### Baked-in Features:

* Bootstrap 4
* Gulp 4
* Sass
* Emergence.js
* Slick Carousel
* Browsersync + hot reloading
* Handlebars.js (HTML templates)
* Popper.js
* Animate.css
* Emergence.js
* Handlebars.js
* Compilation
* Autoprefixing
* Sourcemaps
* Concatenation
* Minification
* Linting
* Accessibility reports


### Details

Quantum's primary features:

- Build on top of Bootstrap with baked-in mobile navigation.
-	Sass compilation and prefixing with Autoprefixer (using Sass 7-1 folder architecture pattern).
- CSS compression after all SCSS is compiled.
- JavaScript concatenation + minification.
-	Built-in BrowserSync server - this will automatically reload your page when files are changed. It also live-injects CSS changes when you save a Sass file. This task runs continuously and defaults to localhost.
-	Handlebars HTML templates with Panini. Panini is a super simple flat file generator for use with Gulp. It compiles a series of HTML pages using a common layout. These pages can also include HTML partials (rejoice!), external Handlebars helpers, or external data as JSON.


### Requirements

To use Quantum, you'll need:

-	Node.js | Test: run ` node -v ` in the terminal
-	npm | (Node comes with npm installed). Test: run ` npm -v`  in the terminal
-	Gulp | `npm install -g gulp`


### Installing & Use:

- Clone this repo: `git clone https://github.com/dmoncado/quantum`
- Navigate into the repo directory: `cd quantum`
- Install all node packages: `npm install` or `sudo npm install`
- Run `gulp dev`
- Your site is now viewable at: http://localhost:3000
- Build something great! (start from the HTML partials and style with the SCSS partials, just go nuts.)

🚨 Changes should be committed to `src/` files only! 🚨

Primary Gulp tasks are:
-	`gulp dev` for general development
-	`gulp prod` for production builds (compiles, minifies, and concatenates everything into a folder called `/dist`)

...There is also:
-	`gulp linters` to run all linting tasks for HTML, SCSS, and JS
-	`gulp accessibility` to run accessibility tasks that creates an accessibility report .txt file in a folder called `reports` for your reference

NOTE:
- Once a project is nearing completion and you want to create compressed, concatenated, production-ready files, run `gulp prod`. This will delete everything in the `dist` folder and recreate it instantly with all of your working files compiled. Never make updates directly into the dist folder as these files get overridden each time. Also, The dist folder is not kept in source control - check the .gitignore file to remove it if you'd like.


### Folder Structure:

- `dist/` - compiled files (minified and concatenated only with `gulp prod`)
- `node_modules` - front-end dependencies (.gitignore'd)
- `src/` - contains all of your core, working files—static assets, pages, templates, etc
- `src/assets/` - scss files, JS files, images, and fonts
- `src/layouts/` - HTML layouts templates
- `src/pages/` - site pages
- `src/partials/` - handlebars partials files (HTML Partials)
- `gulpfile.js` - all task definitions
- `package.json` - handles the front-end dependencies
- `.htmllintrc` - handles the HTML lint rules (for when you run the `gulp linters`)
- `.sass-lint.yml` - handles the SCSS lint rules
- `reports` - txt generated file for accessibility issues (for when you run the `gulp accessibility`)

Happy Coding </>
