import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

import {
  numberFormatter,
  getExchangeIcon,
  cryptoPairDivider,
} from 'shared/helpers';
import {
  FlexRow,
  LightText,
  HeaderBar,
  BolderText,
  FlexColumn,
} from 'shared/commonStyles';

const BASE_URL = 'http://api.cryptonator.com/api/ticker/';
interface IMarket {
  base: string;
  price: string;
  target: string;
  volume: string;
  change: string;
}

const TopStatsBar: FC<any> = ({ selectedMarket }: any): any => {
  const [marketData, setMarketData] = useState<IMarket>({
    base: '',
    price: '',
    target: '',
    volume: '',
    change: '',
  });

  useEffect(() => {
    const modifiedMarket = cryptoPairDivider(selectedMarket);
    startUpdatingData(modifiedMarket);
  }, [selectedMarket]);

  const startUpdatingData = async (market) => {
    console.log('Tickers: ', market);
    // setInterval(async () => {
    await fetch(BASE_URL + market, {
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Tickersss: ', data.ticker);
        setMarketData(data.ticker);
      })
      .catch((err) => console.log(err));
    // }, 4000);
  };

  return (
    <HeaderBar>
      <FlexColumn>
        <BolderText marginBottom="11px" fontSize="24px" lineHeight="33px">
          {`${marketData?.base} / ${marketData?.target}`}
        </BolderText>
        <FlexRow>
          <img
            src={getExchangeIcon(marketData?.base)}
            className="exchange-small-icon mr-2"
            alt={`${marketData?.base}-icon`}
          />
          <LightText fontSize="18px" fontWeight="600" lineHeight="25px">
            {marketData?.base}
          </LightText>
        </FlexRow>
      </FlexColumn>
      <FlexColumn>
        <BolderText
          marginBottom="11px"
          fontSize="24px"
          lineHeight="33px"
          color={`${Number(marketData?.change) > 0 ? '#00DA9D' : '#F33501'}`}
        >
          {Number(marketData?.change) > 0
            ? `+${marketData?.change}`
            : marketData?.change}
        </BolderText>
        <LightText
          fontSize="18px"
          fontWeight="600"
          lineHeight="25px"
        >{`$${marketData?.price}`}</LightText>
      </FlexColumn>
      <FlexColumn>
        <BolderText
          marginBottom="11px"
          fontSize="24px"
          lineHeight="33px"
          color={`${Number(marketData?.change) > 0 ? '#00DA9D' : '#F33501'}`}
        >
          {Number(marketData?.change) > 0
            ? `+${marketData?.change}`
            : marketData?.change}
        </BolderText>
        <LightText
          fontSize="18px"
          fontWeight="600"
          lineHeight="25px"
        >{`24h Change`}</LightText>
      </FlexColumn>
      <FlexColumn>
        <BolderText marginBottom="11px" fontSize="24px" lineHeight="33px">
          {numberFormatter(Number(marketData?.volume))}
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
