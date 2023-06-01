/**
 * Get ticker data from Financial Times API (https://markets.ft.com/research/webservices/securities/v1/docs)
 * Filter for ticker name and daily percentage change
 * -----API is not accessible without API Keys---
 */
const axios = require('axios');

// Create mapping of stock symbols to names
const symbolToName = {
    "FTSE:FSI": "FTSE 100",
    "INX:IOM": "S&P 500",
    "EURUSD": "Euro/Dollar",
    "GBPUSD": "Pound/Dollar",
    "IB.1:IEU": "Brent Crude Oil"
    };

async function getStockData() {
    try {
        const url = 'https://markets.ft.com/research/webservices/securities/v1/quotes?symbols=FTSE:FSI,INX:IOM,EURUSD,GBPUSD,IB.1:IEU';
        const response = await axios.get(url);
        // TODO: Double check that data.data.items maps the api response well
        // console.log(response)
        const items = response.data.data.items;

        let stocks = [];

        for (let item of items) {
            let name = symbolToName[item.basic.symbol];
            let oneDayChange = parseFloat(item.quote.change1DayPercent.toFixed(2));
            stocks.push({ name: name, oneDayChange: oneDayChange });
        }
        console.log(stocks);
        return stocks;

    } catch (error) {
        console.error(error);
    }
}

module.exports = getStockData;


