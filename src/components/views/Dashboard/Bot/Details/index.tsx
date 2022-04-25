import React, { useState, FC, Fragment } from 'react';

import { FlexRow } from 'shared/commonStyles';
import { tradeOrdersGeneratorTable } from 'shared/helpers';

import Loader from 'components/widgets/Loader';
import TopStatsBar from 'components/widgets/TopStatsBar';
import ScreenHeader from 'components/widgets/ScreenHeader';
import TechnicalAnalysis from 'components/widgets/TechnicalAnalysis';

import Graph from './Graph';
import OrderTable from './OrderTable';

const BotDetails: FC<any> = ({
  selectedBot,
  selectedMarket,
  setSelectedStep,
}: any): any => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataObj, setDataObj] = useState({
    openOrders: [{
      fee: 5,
      pnl: 2.02,
      pair: "Buy",
      buyDate: 39000,
      sellDate: 42000,
      exchange: 'Binance',
      buyPrice: 42000,
      sellPrice: 39000,
  }],
    closedOrders: [{
        fee: 5,
        pnl: 2.02,
        pair: "Buy",
        buyDate: 39000,
        sellDate: 42000,
        exchange: 'Binance',
        buyPrice: 42000,
        sellPrice: 39000,
    }],
    algoTradingGridStrategy: {
      tickerPrice: 23,
      maxThreshold: 11,
      minThreshold: 2,
      numberOfIntervals: 5,
      totalAllocatedAmount: 999.99,
    },
  });

  console.log({dataObj})
  console.log(setIsLoading, setDataObj);


  const {
    openOrders,
    closedOrders,
    algoTradingGridStrategy: {
      tickerPrice,
      maxThreshold,
      minThreshold,
      numberOfIntervals,
      totalAllocatedAmount,
    },
  } = !!dataObj && dataObj;

  let { orderBookTable } = tradeOrdersGeneratorTable({
    tickerPrice: Number(tickerPrice),
    lowerThreshold: Number(minThreshold),
    higherThreshold: Number(maxThreshold),
    numberOfGrids: Number(numberOfIntervals),
    totalInvestmentBalance: totalAllocatedAmount,
  });

  if (orderBookTable.length === 0 && isLoading) return <Loader />;
  if (openOrders.length === 0 && closedOrders.length === 0)
    return (
      <ScreenHeader
        header="Bot"
        subheading="Bot Details"
        headingClickHandler={(): any => setSelectedStep(1)}
        subheadingClickHandler={(): any => setSelectedStep(3)}
      />
    );
  return (
    <Fragment>
      {!!isLoading && <Loader />}
      <ScreenHeader
        header="Bot"
        subheading="Bot Details"
        headingClickHandler={(): any => setSelectedStep(1)}
        subheadingClickHandler={(): any => setSelectedStep(3)}
      />
      <TopStatsBar selectedMarket={selectedMarket} />

      <Graph selectedMarket={selectedMarket} orderBookTable={orderBookTable} />
      <FlexRow width="100%" marginTop="21px" justifyContent="space-between">
        <div style={{ width: '68%' }}>
          <OrderTable openOrders={openOrders} closedOrders={closedOrders} />
        </div>
        <div style={{ width: '30%' }}>
          <TechnicalAnalysis selectedMarket={selectedMarket} />
        </div>
      </FlexRow>
    </Fragment>
  );
};

export default BotDetails;
