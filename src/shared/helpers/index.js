import { find as _find, get } from 'lodash';

import iconList from '../data/iconsList.json';
import imagesList from '../data/imagesList.json';

export const find = _find;

export function getExchangeIcon(title = '') {
  const foundExchange = find(
    imagesList,
    (item) => item.name.toLocaleLowerCase() === title.toLocaleLowerCase()
  );
  return foundExchange ? foundExchange.icon : null;
}

export function getExchangeSmallIcon(title = '') {
  const foundExchange = find(
    iconList,
    (item) => item.name.toLocaleLowerCase() === title.toLocaleLowerCase()
  );
  return foundExchange ? foundExchange.icon : null;
}

export function numberFormatter(number) {
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

export function getNamesFromList(list = [], label) {
  const nameToDisplay = [];
  list.map((item) => nameToDisplay.push(item[label]));
  return nameToDisplay;
}

export function getSelectedItemIdFromList(list = [], name, label) {
  const foundItem = list.find((item) => item[label] === name);
  return foundItem;
}

export function shapeDataFormatter(list = []) {
  const newList = [];
  for (let i = 0; i < list.length; i++) {
    const firstObj = {
      type: 'Buy',
      price: list[i].openPrice,
      time: new Date(list[i].openTime).getTime() / 1000,
    };
    newList.push(firstObj);
    const secondObj = {
      type: 'Sell',
      price: list[i].closePrice,
      time: new Date(list[i].closeTime).getTime() / 1000,
    };
    newList.push(secondObj);
  }

  return newList;
}

export function pairDivider(str = '') {
  switch (str) {
    case 'BTCUSDT':
      return { first: 'BTC', second: 'USDT' };
    case 'ETHBTC':
      return { first: 'ETH', second: 'BTC' };
    case 'ETHUSDT':
      return { first: 'ETH', second: 'USDT' };
    default:
      return { first: '', second: '' };
  }
}

export function cryptoPairDivider(str = '') {
  switch (str) {
    case 'BTCUSDT':
      return 'btc-usdt';
    case 'ETHBTC':
      return 'eth-btc';
    case 'ETHUSDT':
      return 'eth-usdt';
    default:
      return '';
  }
}

export function balanceCalculator(
  balance1,
  balance2,
  tickerValue,
  investmentValue
) {
  let totalBalance = balance1 * tickerValue + balance2;
  let totalInvestmentBalance = totalBalance * (investmentValue / 100);
  return Number(totalInvestmentBalance.toFixed(6));
}

export function pairValuesGetter(str1, str2, data) {
  let firstObj = data.find((item) => item.currencyCode === str1);
  let secondObj = data.find((item) => item.currencyCode === str2);

  return {
    firstMarketTotalBalance: get(firstObj, 'total', 0),
    secondMarketTotalBalance: get(secondObj, 'total', 0),
  };
}

export function tradeOrdersGeneratorTable({
  tickerPrice,
  numberOfGrids,
  lowerThreshold,
  higherThreshold,
  totalInvestmentBalance,
}) {
  let totalInvestedValue = Number(totalInvestmentBalance);
  let perGridInvestment = totalInvestedValue / numberOfGrids;
  let tradePerGrid = perGridInvestment / tickerPrice;
  let gridDiffCalculator = (higherThreshold - lowerThreshold) / numberOfGrids;

  let number = null;
  let fraction = null;
  let belowValues = 0;
  let buyOrdersPrice = [];
  let buyOrdersValue = [];

  let firstRiskValue = Number(lowerThreshold.toFixed(6));
  if (firstRiskValue < tickerPrice) {
    buyOrdersValue.push(Number((tradePerGrid * firstRiskValue).toFixed(8)));
    buyOrdersPrice.push(firstRiskValue);
  }
  for (var i = 0; i < numberOfGrids; i++) {
    belowValues += gridDiffCalculator;
    number = Number((lowerThreshold + belowValues).toFixed(6));
    fraction = tradePerGrid * number;
    if (number > tickerPrice) {
      continue;
    }
    buyOrdersValue.push(Number(fraction.toFixed(8)));
    buyOrdersPrice.push(number);
  }

  let number2 = null;
  let fraction2 = null;
  let aboveValues = gridDiffCalculator;
  let sellOrdersPrice = [];
  let sellOrdersValue = [];
  var valueOfBuyOrdersLastIndex =
    buyOrdersPrice.length !== 0
      ? buyOrdersPrice[buyOrdersPrice.length - 1]
      : lowerThreshold;
  for (var j = 0; j < numberOfGrids - buyOrdersPrice.length; j++) {
    aboveValues += gridDiffCalculator;
    number2 = Number((valueOfBuyOrdersLastIndex + aboveValues).toFixed(6));
    fraction2 = tradePerGrid * number2;
    sellOrdersValue.push(Number(fraction2.toFixed(8)));
    sellOrdersPrice.push(number2);
  }

  let BUYORDERS =
    buyOrdersValue.length !== 0
      ? buyOrdersPrice.map((_, i) => ({
          type: 'Buy',
          trade: tradePerGrid.toFixed(8),
          investment: buyOrdersValue[i],
          price: `${buyOrdersPrice[i].toFixed(6)}`,
        }))
      : [];

  let SELLORDERS = sellOrdersPrice.map((_, i) => ({
    type: 'Sell',
    trade: tradePerGrid.toFixed(8),
    investment: sellOrdersValue[i],
    price: `${sellOrdersPrice[i].toFixed(6)}`,
  }));

  let gridArray = [];
  let arr = [...new Array(numberOfGrids + 1)];

  let acc = lowerThreshold;
  arr[0] = acc;

  for (var g = 1; g < arr.length; g++) {
    acc += gridDiffCalculator;
    arr[g] = Number(acc.toFixed(8));
  }

  for (let k = 0; k < arr.length - 1; k++) {
    let high = arr[k + 1];
    let low = arr[k];
    gridArray.push({ low, high });
  }

  return {
    orderBookTable: BUYORDERS.concat(SELLORDERS),
    calculatedGridValue: gridArray,
  };
}
