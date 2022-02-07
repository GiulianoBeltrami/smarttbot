
const MountCandlestick = ({ CoinName, Period, PriceList }) => {
    return ({
        Coin: CoinName,
        Period: Period,
        Datetime: Date.parse(new Date),
        Open: PriceList[0],
        Low: PriceList.reduce((a, b) => Math.min(a, b)),
        High: PriceList.reduce((a, b) => Math.max(a, b)),
        Close: PriceList[PriceList.length - 1],
    })
}

const AddCandlesToDb = async ({ DatabaseModel, Candlestick }) => {
    await DatabaseModel.create(Candlestick);
}

const MountCandleAndSaveOnDb = async ({CoinName,Period,PriceList,DatabaseModel}) =>{
    
    const candlestick = MountCandlestick({
        CoinName: CoinName,
        Period: Period,
        PriceList: PriceList
    });

    AddCandlesToDb({
        DatabaseModel: DatabaseModel,
        Candlestick: candlestick,
    });
}


module.exports = MountCandleAndSaveOnDb;