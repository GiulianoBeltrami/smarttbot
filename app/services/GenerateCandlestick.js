const GetTickers = require('./GetTickers');
const db = require('../database/db');

const GenerateCandlestick = (CoinsList, executionTime) => {
    
    let CoinsPrice = [];

    const GenerateCoinsPriceStruct = () => {
        CoinsList.forEach(() => {
            CoinsPrice.push([[], [], []]);
        })
    }

    const GenerateFunctionsAsStringArray = () => {

        GenerateCoinsPriceStruct();

        let functionAsString = "";

        if (CoinsList.length == 1) {
            return functionAsString += `[GetTickers('${CoinsList[0]}',CoinsPrice[${0}],${executionTime})]`;
        }

        CoinsList.map((coin, index) => {
            if (index == 0) {
                functionAsString += `[GetTickers('${coin}',CoinsPrice[${index}],${executionTime}),`;
            }
            else if (index == CoinsList.length - 1) {
                functionAsString += `GetTickers('${coin}',CoinsPrice[${index}],${executionTime})]`;
            }
            else {
                functionAsString += `GetTickers('${coin}',CoinsPrice[${index}],${executionTime}),`;
            }
        });

        return functionAsString;
    }

    const GetCandles = () => {
        return eval(GenerateFunctionsAsStringArray(CoinsList));
    }

    db.sync()
        .then(() => {
            Promise.all(GetCandles(CoinsList));
        })
        .catch((error) => {
            throw new Error(error)
        });
}

module.exports = GenerateCandlestick;