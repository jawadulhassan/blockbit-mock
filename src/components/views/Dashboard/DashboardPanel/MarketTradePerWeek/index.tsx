import React, { FC, useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

import { apiClient } from 'shared/services/api';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import StorageConstants from 'shared/constants/StorageConstants';
import { getUserMarketTradePerWeekEndpoint } from 'shared/endPoints';
import {
  FlexRow,
  FlexColumn,
  BolderText,
  BorderedBottom,
  // ProfitPercentage,
} from 'shared/commonStyles';

import Calender from 'components/widgets/Calender';
import HalfPageLoader from 'components/widgets/ContentLoaders/HalfPageLoading';

import { ComponentBox } from '../styles';

import PNLGraph from './Graph';

interface IData {
  tileValue: number;
  tilePercentage: number;
  data: number[];
  days: number[];
}

const MarketTradePerWeek: FC<{}> = () => {
  const history = useHistory();
  const unmounted = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [marketTradeData, setMarketTradeData] = useState<IData>({
    tileValue: 0,
    tilePercentage: 0,
    data: [],
    days: [],
  });

  useEffect((): any => {
    getUserMarketTradePerWeek();
    return (): void => {
      unmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUserMarketTradePerWeek(
    startDate = '',
    endDate = ''
  ): Promise<any> {
    setIsLoading(true);
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    apiClient(userToken)
      .get(
        `${getUserMarketTradePerWeekEndpoint}?externalUserId=${user.userId}${
          !!startDate ? `&startDate=${startDate}` : ''
        }${!!endDate ? `&endDate=${endDate}` : ''}`
      )
      .then((response): void => {
        if (!unmounted.current) {
          const data = response?.data?.data?.record;
          if (data) {
            setMarketTradeData(data);
          }
          setIsLoading(false);
        }
      })
      .catch((err): void => {
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

  const dateSelectionHandler = ({ start, end }) => {
    const startDate = format(new Date(start), 'yyyy-MM-dd');
    const endDate = format(new Date(end), 'yyyy-MM-dd');

    if (startDate && endDate) {
      getUserMarketTradePerWeek(startDate, endDate);
    }
  };

  if (isLoading) return <HalfPageLoader />;
  return (
    <ComponentBox width="49.5%" height="433px">
      <BorderedBottom>
        <FlexRow justifyContent="space-between" alignItems="center">
          <FlexColumn>
            <BolderText fontSize="20px" lineHeight="27px">
              Market Trade
            </BolderText>
            <BolderText fontSize="24px" lineHeight="33px">
              {`${marketTradeData.tileValue} $`}
            </BolderText>
          </FlexColumn>
        </FlexRow>
      </BorderedBottom>
      <FlexRow
        marginTop="20px"
        marginRight="20px"
        alignItems="center"
        marginBottom="20px"
        justifyContent="space-between"
      >
        <BolderText />
        <Calender dateSelectionHandler={dateSelectionHandler} />
      </FlexRow>
      <PNLGraph categories={marketTradeData.days} data={marketTradeData.data} />
    </ComponentBox>
  );
};

export default MarketTradePerWeek;
