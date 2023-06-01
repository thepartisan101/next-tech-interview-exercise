const express = require('express');
const expressHandlebars  = require('express-handlebars');
const path = require('path');

/**
 * Require in your library here.
 */
// const fetch = require('./lib/fetch');

/**
 * Create a new instance of express and define the port to attach to.
 */
const app = express();
const port = process.env.PORT || 3000;

/**
 * Configure the Handlebars view engine with the express app.
 *
 * Views with a `.handlebars` extension will be parsed with this Handlebars view engine.
 *
 * The default layout is `views/layouts/main.handlebars`.
 */
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

/**
 * Configure a path for static assets.
 *
 * Assets in the `static/` folder can be loaded using the `/static` path.
 *
 * @example
 *
 * ```html
 * <link rel="stylesheet" type="text/css" href="/static/stylesheet.css">
 * ```
 */
app.use('/static', express.static(path.join(__dirname, 'static')));

/**
 * The index route. Your logic here-ish.
 */
app.get('/', async function (req, res) {
    // This object is passed to the Handlebars template.
    const templateData = {
        name: 'world'
    };

    // This renders the Handlebars view at `views/home.handlebars`.
    res.render('home', templateData);
});

/**
 * If not in a test environment where we don't need the server stared,
 * bind express to the port and start the server.
 */
if(process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Running at http://localhost:${port}!`));
}

/**
 * We export the app so that we can test it in `test/app.spec.js`.
 */
module.exports = app;
