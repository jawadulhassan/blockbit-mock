import React, { FC, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { apiClient } from 'shared/services/api';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import { getUserTradeByMarketEndpoint } from 'shared/endPoints';
import StorageConstants from 'shared/constants/StorageConstants';
import { FlexRow, BolderText, BorderedBottom } from 'shared/commonStyles';

import HalfPageLoader from 'components/widgets/ContentLoaders/HalfPageLoading';

import { ComponentBox } from '../styles';

import Graph from './Graph';

const TradeByMarket: FC<{}> = () => {
  const history = useHistory();
  const unmounted = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [tradeMarketList, setTradeMarketList] = useState<[]>([]);

  useEffect((): any => {
    getUserTradeByMarket();
    return (): void => {
      unmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUserTradeByMarket(): Promise<any> {
    setIsLoading(true);
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    apiClient(userToken)
      .get(`${getUserTradeByMarketEndpoint}?externalUserId=${user.userId}`)
      .then((response): void => {
        if (!unmounted.current) {
          const list = response?.data?.data?.records;
          if (list) {
            setTradeMarketList(list);
            setIsLoading(false);
          }
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

  if (isLoading) return <HalfPageLoader />;
  return (
    <ComponentBox width="49.5%" height="456px">
      <BorderedBottom>
        <FlexRow>
          <BolderText fontSize="20px" lineHeight="27px">
            Trade by Markets
          </BolderText>
        </FlexRow>
      </BorderedBottom>
      {tradeMarketList.length > 0 && <Graph list={tradeMarketList} />}
    </ComponentBox>
  );
};

export default TradeByMarket;
