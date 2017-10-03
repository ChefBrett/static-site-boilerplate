# Smile Static Site

## Development Setup

* `git clone` this repository
* `npm install`
* `npm run build`
  * If you don't have `gulp` installed, run `npm install -g gulp`

## Running Site (Development)

* `gulp watch` in one terminal window
  * This will need to be restarted typically when you add a new file to the project
* In another terminal window `cd` into `./build`
* While in `./build`, run `live-server` (this will launch site locally)
  * If you don't have `live-server` installed, run `npm install -g live-server`

## Build for Production

This still needs to be determined. Right now the `gulp build` command will apply `uncss`

## Code Standards/Practices

### HTML

This project uses [htmlincluder](https://github.com/internetErik/gulp-htmlincluder) to componentize the parts of the site. Ideally this can provide some modularity to the static html build.

The HTML that should be worked out is in `./src/html/`

Think in terms of components, and try to use [BEM](http://getbem.com/introduction/) to give semantic value to parts of the page (more in CSS section).

### JavaScript

This site uses vanilla JavaScript.

For carousels we are using [lory.js](http://meandmax.github.io/lory/)

JavaScript files are in `./src/js/`.

You should make separate files for different components.

Don't add atomic css classes via JavaScript.

### CSS (SASS)

This project uses [atomic-scss](https://github.com/internetErik/atomic-scss) as much as possible. For everything that can't be done reasonably with atomic scss (which isn't a lot) we losely follow [BEM](http://getbem.com/introduction/). Tend towards giving HTML BEM style class names, even if you don't actually use them in any scss file.

* Try to do as much styling as you can with atomic styles
* If you can't, then create a scss file for the component you are working on
  * The scss file should be named the same as the CSS class used for the components (e.g., `home-page` => `_home-page.scss`)

#### Note on UnCss

This project uses `uncss` to reduce the css payload size. However, it only uses `uncss` on the atomic css. No classes in the `site.css` will be removed.
