const axios = require('axios');
const CandleOneMinute = require('../database/models/CandleOneMinute');
const CandleFiveMinutes = require('../database/models/CandleFiveMinutes');
const CandleTenMinutes = require('../database/models/CandleTenMinutes');
const MountCandleAndSaveOnDb = require('./MountCandlestick');
axios.defaults.baseURL = "https://poloniex.com";

const GetTickers = async (CoinName, PriceList, executionTime) => {

    console.log(executionTime);

    if (executionTime == 0) return;

    axios.get('/public?command=returnTicker')
        .then((response) => {

            const lastCoinPrice = response?.data[`${CoinName}`]?.last;

            PriceList.forEach((element) => {
                element.push(lastCoinPrice)
            })

            if (PriceList[0].length == 60) {

                MountCandleAndSaveOnDb({
                    CoinName: CoinName,
                    Period: '1min',
                    PriceList: PriceList[0],
                    DatabaseModel: CandleOneMinute
                });

                PriceList[0] = [];
            }

            if (PriceList[1].length == 300) {

                MountCandleAndSaveOnDb({
                    CoinName: CoinName,
                    Period: '5min',
                    PriceList: PriceList[1],
                    DatabaseModel: CandleFiveMinutes
                });

                PriceList[1] = [];
            }

            if (PriceList[2].length == 600) {

                MountCandleAndSaveOnDb({
                    CoinName: CoinName,
                    Period: '10min',
                    PriceList: PriceList[2],
                    DatabaseModel: CandleTenMinutes
                });

                PriceList[2] = [];
            }
        })
        .catch((error) => {
            throw new Error(error);
        })


    setTimeout(GetTickers, 1000, CoinName, PriceList, executionTime - 1);
}

module.exports = GetTickers;

