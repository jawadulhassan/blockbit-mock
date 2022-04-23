import React, { FC, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { apiClient } from 'shared/services/api';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import StorageConstants from 'shared/constants/StorageConstants';
import { FlexRow, BolderText, BorderedBottom } from 'shared/commonStyles';
import { getUserPortfolioHoldingByMarketEndpoint } from 'shared/endPoints';

import HalfPageLoader from 'components/widgets/ContentLoaders/HalfPageLoading';

import { ComponentBox } from '../styles';

import Graph from './Graph';

const HoldingsByMarket: FC<{}> = () => {
  const history = useHistory();
  const unmounted = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [holdingsMarketList, setHoldingsMarketList] = useState<[]>([]);

  useEffect((): any => {
    getUserHoldingsByMarket();
    return (): void => {
      unmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUserHoldingsByMarket(): Promise<any> {
    setIsLoading(true);
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    apiClient(userToken)
      .get(
        `${getUserPortfolioHoldingByMarketEndpoint}?externalUserId=${user.userId}`
      )
      .then((response): void => {
        if (!unmounted.current) {
          const list = response?.data?.data?.records;
          if (list) {
            setHoldingsMarketList(list);
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
    <ComponentBox width="49%" height="486px">
      <BorderedBottom>
        <FlexRow>
          <BolderText fontSize="20px" lineHeight="27px">
            Holdings by Currencies
          </BolderText>
        </FlexRow>
      </BorderedBottom>
      {holdingsMarketList.length > 0 && <Graph list={holdingsMarketList} />}
    </ComponentBox>
  );
};

export default HoldingsByMarket;
