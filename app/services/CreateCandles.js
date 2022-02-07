const axios = require('axios');
const CandleOneMinute = require('../database/models/CandleOneMinute');
const CandleFiveMinutes = require('../database/models/CandleFiveMinutes');
const CandleTenMinutes = require('../database/models/CandleTenMinutes');
const MountCandleAndSaveOnDb = require('./MountCandlestick');
axios.defaults.baseURL = "https://poloniex.com";

const CreateCandles = async (Coin, list, executionTime) => {
    console.log(executionTime);
    if (executionTime == 0) return;

    axios.get('/public?command=returnTicker')
        .then((response) => {

            const lastCoinPrice = response?.data[`${Coin}`]?.last;

            list.forEach((element) => {
                element.push(lastCoinPrice)
            })

            if (list[0].length == 60) {

                MountCandleAndSaveOnDb({
                    CoinName: Coin,
                    Period: '1min',
                    PriceList: list[0],
                    DatabaseModel: CandleOneMinute
                });

                list[0] = [];
            }

            if (list[1].length == 300) {

                MountCandleAndSaveOnDb({
                    CoinName: Coin,
                    Period: '5min',
                    PriceList: list[1],
                    DatabaseModel: CandleFiveMinutes
                });

                list[1] = [];
            }

            if (list[2].length == 600) {

                MountCandleAndSaveOnDb({
                    CoinName: Coin,
                    Period: '10min',
                    PriceList: list[2],
                    DatabaseModel: CandleTenMinutes
                });

                list[2] = [];
            }
        })
        .catch((error) => {
            throw new Error({
                message: "Error on CreateCandles",
                error: error
            })
        })


    setTimeout(CreateCandles, 1000, Coin, list, executionTime - 1);
}

module.exports = CreateCandles;

