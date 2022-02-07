const express = require('express');
const validations = require('../helpers/Validations');
const GenerateCandlestick = require('../services/GenerateCandlestick');
const router = express.Router();
const CandleOneMinute = require('../database/models/CandleOneMinute');
const CandleFiveMinutes = require('../database/models/CandleFiveMinutes');
const CandleTenMinutes = require('../database/models/CandleTenMinutes');
const { Times } = require('../services/AvailableTimestamps.json');
const { Coins } = require('../services/AvailableCoins.json');

router.post('/candlestick', (req, res) => {

    const desiredCoins = req.body.coins;
    const executionTime = req.body.executionTime;
    
    if (validations.isValidCoins(desiredCoins) && executionTime) {
        res.send("Generating candlestickers, please wait a minute and do a get request.");
        GenerateCandlestick(desiredCoins,executionTime);
    }
    else {
        res.statusCode = 400;
        res.send({
            error: "Invalid coins or execution time"
        });
    }
});

router.get('/candlestick', async (req, res) => {

    const candleOneMinute = await CandleOneMinute.findAll();
    const candleFiveMinutes = await CandleFiveMinutes.findAll();
    const candleTenMinutes = await CandleTenMinutes.findAll();

    const isEmptyModels = validations.isEmpty(candleOneMinute) && validations.isEmpty(candleFiveMinutes) && validations.isEmpty(candleTenMinutes)

    if (isEmptyModels) {
        res.statusCode = 404;
        res.send({
            message: 'You are trying to do a get request before the post request that initializes the creation of the candle. Please, do a post on /candlestick'
        })
    }

    else {
        const concatenatedArrays = candleOneMinute.concat(candleFiveMinutes).concat(candleTenMinutes);
        res.send(concatenatedArrays);
    }
});

router.get('/candlestick/:time', async (req, res) => {
    const time = req.params.time;

    if (!validations.isValidTime(time)) {
        res.statusCode = 400;
        res.send({
            error: `Wrong time, available time: ${Times}`
        });
    }
    else {
        if (time == 1) return res.send(await CandleOneMinute.findAll());
        else if (time == 5) return res.send(await CandleFiveMinutes.findAll());
        else return res.send(await CandleTenMinutes.findAll());
    }

});

router.get('/candlestick/:pair/:time', async (req, res) => {
    const pair = [req.params.pair];
    const time = [req.params.time];

    const isValidPair = validations.isValidCoins(pair);
    const isValidTime = validations.isValidTime(time);

    if (!isValidPair && !isValidTime) {
        res.statusCode = 400;
        res.send({
            error: `Wrong time or coins, please check again and remember to send a post request first.Try again.`,
            availableTimes: Times,
            availableCoins: Coins
        });
    }
    else {
        if(time == 1){
            var query = await CandleOneMinute.findAll({
                where: {
                    Coin:pair
                }
            });

            return res.send(query);
        }
        else if(time == 5){
            var query = await CandleFiveMinutes.findAll({
                where: {
                    Coin:pair
                }
            });

            return res.send(query);
        }
        else{
            var query = await CandleTenMinutes.findAll({
                where: {
                    Coin:pair
                }
            });

            return res.send(query);
        }
        
    }



});

module.exports = router;