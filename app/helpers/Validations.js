const { Coins } = require('../services/AvailableCoins.json');
const { Times } = require('../services/AvailableTimestamps.json');

const isValidCoins = (target) => {

    const lowerCaseCoins = Coins.map((coin) => coin.toLowerCase());
    const lowerCaseTarget = target.map((element) => element.toLowerCase());

    return lowerCaseTarget.every(v => lowerCaseCoins.includes(v));
}

const isEmpty = (element) => element == undefined || element === null ? true : false;

const isValidTime = (time) => Times.includes(`${time}`) ? true : false;

module.exports = {
    isValidCoins,
    isEmpty,
    isValidTime
}

