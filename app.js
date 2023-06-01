const express = require('express');
const expressHandlebars  = require('express-handlebars');
const path = require('path');
// const getStockData = require('./lib/fetch');

// Create express handlebars instance to register helper functions
const hbs = expressHandlebars.create({});

// Return "positive" or "negative" string depending on input value
// Will be used to add an extra class to the ticker % value
hbs.handlebars.registerHelper('changeColor', function(value) {
    return value >= 0 ? 'positive' : 'negative';
});

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
app.engine('handlebars', hbs.engine);
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
    // Create mapping of stock symbols to names
    const symbolToName = {
        "FTSE:FSI": "FTSE 100",
        "INX:IOM": "S&P 500",
        "EURUSD": "Euro/Dollar",
        "GBPUSD": "Pound/Dollar",
        "IB.1:IEU": "Brent Crude Oil"
      };
      
    // Import mockData from sample
    const stockData = require('./lib/data/mockData.json');
    console.log(stockData.items[0]); 
    
    let stocks = [];
    // Filter for stock name, clean it and format values
    for (let stock of stockData.items) {
        let name = symbolToName[stock.basic.symbol];
        let oneDayChange = parseFloat(stock.quote.change1DayPercent.toFixed(2));
        stocks.push({ name: name, oneDayChange: oneDayChange });
    }

    console.log(stocks)
    const templateData = {
        // Add test data
        stocks: stocks
    };

    // TODO: Get API access keys
    // Get stock data
    // const stocks = await getStockData();

    // // This object is passed to the Handlebars template.
    // const templateData = {
    //     stocks: stocks
    // };
    // End TODO

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
