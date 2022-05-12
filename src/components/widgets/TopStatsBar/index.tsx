import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

import { numberFormatter } from 'shared/helpers';
import {
  FlexRow,
  LightText,
  HeaderBar,
  BolderText,
  FlexColumn,
} from 'shared/commonStyles';

// const BASE_URL =
//   'https://cors-anywhere.herokuapp.com/https://api.cryptonator.com/api/full/';
const BASE_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1&page=1&sparkline=falsebtc-usd';

// interface IMarket {
//   base: string;
//   price: string;
//   target: string;
//   volume: string;
//   price_change_24h: string;
// }

interface IMarket {
  high_24h: string;
  low_24h: string;
  price_change_24h: string;
  image: string;
  current_price: string;
  total_volume: string;
}

const TopStatsBar: FC<any> = ({ selectedMarket }: any): any => {
  // const [marketData, setMarketData] = useState<IMarket>({
  //   base: '',
  //   price: '',
  //   target: '',
  //   volume: '',
  //   price_change_24h: '',
  // });

  // useEffect(() => {
  //   const modifiedMarket = cryptoPairDivider(selectedMarket);
  //   startUpdatingData(modifiedMarket);
  // }, [selectedMarket]);

  // const startUpdatingData = async (market) => {
  //   console.log('Tickers: ', market);
  //   // setInterval(async () => {
  //   await fetch(BASE_URL + market, {
  //     mode: 'cors',
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('Tickersss: ', data.ticker);
  //       setMarketData(data.ticker);
  //     })
  //     .catch((err) => console.log(err));
  //   // }, 4000);
  // };

  const [marketData, setMarketData] = useState<IMarket>({
    high_24h: '',
    low_24h: '',
    price_change_24h: '',
    image: '',
    current_price: '',
    total_volume: '',
  });

  useEffect(() => {
    startUpdatingData();
  }, [selectedMarket]);

  const startUpdatingData = async () => {
    await axios.get(BASE_URL).then((list) => {
      const data = list.data[0];
      setMarketData(data);
    });
  };

  return (
    <HeaderBar>
      <FlexColumn>
        <BolderText marginBottom="11px" fontSize="24px" lineHeight="33px">
          {`${marketData?.high_24h} / ${marketData?.low_24h}`}
        </BolderText>
        <FlexRow>
          <img
            src={marketData?.image}
            className="exchange-small-icon mr-2"
            alt={`${marketData?.high_24h}-icon`}
          />
          <LightText fontSize="18px" fontWeight="600" lineHeight="25px">
            {marketData?.high_24h}
          </LightText>
        </FlexRow>
      </FlexColumn>
      <FlexColumn>
        <BolderText
          marginBottom="11px"
          fontSize="24px"
          lineHeight="33px"
          color={`${
            Number(marketData?.price_change_24h) > 0 ? '#00DA9D' : '#F33501'
          }`}
        >
          {Number(marketData?.price_change_24h) > 0
            ? `+${Number(marketData?.price_change_24h).toFixed(4)}`
            : Number(marketData?.price_change_24h).toFixed(4)}
        </BolderText>
        <LightText fontSize="18px" fontWeight="600" lineHeight="25px">
          {`$${Number(marketData?.current_price).toFixed(4)}`}
        </LightText>
      </FlexColumn>
      <FlexColumn>
        <BolderText
          marginBottom="11px"
          fontSize="24px"
          lineHeight="33px"
          color={`${
            Number(marketData?.price_change_24h) > 0 ? '#00DA9D' : '#F33501'
          }`}
        >
          {Number(marketData?.price_change_24h) > 0
            ? `+${Number(marketData?.price_change_24h).toFixed(4)}`
            : Number(marketData?.price_change_24h).toFixed(4)}
        </BolderText>
        <LightText
          fontSize="18px"
          fontWeight="600"
          lineHeight="25px"
        >{`24h Change`}</LightText>
      </FlexColumn>
      <FlexColumn>
        <BolderText marginBottom="11px" fontSize="24px" lineHeight="33px">
          {numberFormatter(Number(marketData?.total_volume))}
        </BolderText>
        <LightText
          fontSize="18px"
          fontWeight="600"
          lineHeight="25px"
        >{`24h Volume`}</LightText>
      </FlexColumn>
    </HeaderBar>
  );
};

// export default React.memo(TopStatsBar);
export default TopStatsBar;
