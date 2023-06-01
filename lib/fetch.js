/**
 * Get ticker data from Financial Times API (https://markets.ft.com/research/webservices/securities/v1/docs)
 * Filter for ticker name and daily percentage change
 */
const axios = require('axios');

async function getStockData() {
    try {
        const url = 'https://markets.ft.com/research/webservices/securities/v1/quotes?symbols=FTSE:FSI,INX:IOM,EURUSD,GBPUSD,IB.1:IEU';
        const response = await axios.get(url);
        const items = response.data.data.items;

        let stocks = [];
        
        for (let item of items) {
            let name = item.basic.name.replace(" Index", "");
            let oneDayChange = parseFloat(item.quote.change1DayPercent.toFixed(2));
            stocks.push({ ticker: name, oneDayChange: oneDayChange });
        }
        console.log(stocks);
        return stocks;

    } catch (error) {
        console.error(error);
    }
}

module.exports = getStockData;


