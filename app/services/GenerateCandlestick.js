const CreateCandles = require('./CreateCandles');
const db = require('../database/db');

const GenerateCandlestick = (coins, executionTime) => {
    var CoinsPrice = [];

    const GenerateCreateCandlesArray = (CoinsList) => {
        for (var i = 0; i < CoinsList.length; i++) {
            CoinsPrice.push([[], [], []]);
        }

        let FunctionAsString = "";

        if (CoinsList.length == 1) {
            FunctionAsString += `[CreateCandles('${CoinsList[0]}',CoinsPrice[${0}],${executionTime})]`;
        }
        else {
            for (var i = 0; i < CoinsList.length; i++) {
                if (i == 0) {
                    FunctionAsString += `[CreateCandles('${CoinsList[i]}',CoinsPrice[${i}],${executionTime}),`;
                }

                else if (i == CoinsList.length - 1) {
                    FunctionAsString += `CreateCandles('${CoinsList[i]}',CoinsPrice[${i}],${executionTime})]`;
                }

                else {
                    FunctionAsString += `CreateCandles('${CoinsList[i]}',CoinsPrice[${i}],${executionTime}),`;
                }

            }
        }
        return FunctionAsString;
    }

    const GetCandles = (CoinsList) => {
        return eval(GenerateCreateCandlesArray(CoinsList));
    }

    db.sync()
        .then(() => {
            Promise.all(GetCandles(coins));
        })
        .catch((error) => {
            throw new Error(error)
        });
}

module.exports = GenerateCandlestick;