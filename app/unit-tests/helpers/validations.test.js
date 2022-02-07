const validations = require('../../helpers/Validations');

test('compare coins with array of coins and return match',() =>{
    const testCoins = ["BNB_BTC","btc_aave","BTC_ADA"];

    expect(validations.isValidCoins(testCoins)).toBe(true);
});

test('compare coins with array of coins and return not match',() =>{
    const testCoins = ["BNB_BTC","BTC_AAVE","CCC_XXX"];

    expect(validations.isValidCoins(testCoins)).toBe(false);
});

test('check if element is undefined and return true',() =>{
    const undefinedElement = undefined;

    expect(validations.isEmpty(undefinedElement)).toBe(true);
});

test('check if element is null and return true',() =>{
    const nullElement = null;

    expect(validations.isEmpty(nullElement)).toBe(true);
});

test('check if element is null or undefined and return false',() =>{
    const element = 1;;
    const element2 = "a";

    expect(validations.isEmpty(element) && validations.isEmpty(element2)).toBe(false);
});

test('check if element is valid time and return true',() =>{
    const time = 5;

    expect(validations.isValidTime(time)).toBe(true);
});

test('check if element is valid time and return false',() =>{
    const time = 4;

    expect(validations.isValidTime(time)).toBe(false);
});