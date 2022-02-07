const db = require('../db');
const { DataTypes } = require('sequelize');

const CandleFiveMinutes = db.define('CandleFiveMinutes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Coin: {
        type: DataTypes.STRING
    },
    Period: {
        type: DataTypes.STRING
    },
    Datetime: {
        type: DataTypes.DATE
    },
    Open: {
        type: DataTypes.DOUBLE
    },
    Low: {
        type: DataTypes.DOUBLE
    },
    High: {
        type: DataTypes.DOUBLE
    },
    Close: {
        type: DataTypes.DOUBLE
    }
});

module.exports = CandleFiveMinutes;
