import React, { useState, FC, useRef, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import { FlexRow } from 'shared/commonStyles';
import { apiClient } from 'shared/services/api';
import { getBotDetailsEndpoint } from 'shared/endPoints';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import { tradeOrdersGeneratorTable } from 'shared/helpers';
import StorageConstants from 'shared/constants/StorageConstants';

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
  const history = useHistory();
  const unmounted = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [dataObj, setDataObj] = useState({
    openOrders: [],
    closedOrders: [],
    algoTradingGridStrategy: {
      tickerPrice: 0,
      maxThreshold: 0,
      minThreshold: 0,
      numberOfIntervals: 0,
      totalAllocatedAmount: 0,
    },
  });

  useEffect((): any => {
    getBotDetails(selectedBot);
    return (): void => {
      unmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBot]);

  async function getBotDetails(botId): Promise<void> {
    setIsLoading(true);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    apiClient(userToken)
      .get(`${getBotDetailsEndpoint}?algoTradingPlanID=${botId}`)
      .then((response: any): any => {
        if (!unmounted.current) {
          setDataObj(response?.data?.data);
          setIsLoading(false);
        }
      })
      .catch((err: any): any => {
        if (!unmounted.current) {
          setIsLoading(false);
          if (err.response.status === 401) {
            localStorage.setItem(StorageConstants.AUTH_TOKEN, '');
            localStorage.setItem(StorageConstants.USER_DATA, '');
            history.push(ROUTE_CONSTANTS.LOGIN);
          }
        }
      });
  }

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
