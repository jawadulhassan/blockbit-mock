import React, { FC, useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

import { apiClient } from 'shared/services/api';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import { getUserCryptoAssetsEndpoint } from 'shared/endPoints';
import StorageConstants from 'shared/constants/StorageConstants';
import {
  FlexRow,
  Divider,
  BolderText,
  BorderedBottom,
  ProfitPercentage,
} from 'shared/commonStyles';

import Calender from 'components/widgets/Calender';
import FullPageLoader from 'components/widgets/ContentLoaders/FullPageLoading';

import { ComponentBox, SmallStatus } from '../styles';

import AssetsGraph from './Graph';

interface IAssets {
  tileValue: number;
  tilePercentage: number;
  data: object[];
}

const CryptoAssets: FC<{}> = () => {
  const history = useHistory();
  const unmounted = useRef(false);

  const [assetsData, setAssetsData] = useState<IAssets>({
    tileValue: 0,
    tilePercentage: 0,
    data: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect((): any => {
    getUserAssets();
    return (): void => {
      unmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUserAssets(startDate = '', endDate = ''): Promise<any> {
    setIsLoading(true);
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    apiClient(userToken)
      .get(
        `${getUserCryptoAssetsEndpoint}?externalUserId=${user.userId}${
          !!startDate ? `&startDate=${startDate}` : ''
        }${!!endDate ? `&endDate=${endDate}` : ''}`
      )
      .then((response): void => {
        if (!unmounted.current) {
          const data = response?.data?.data?.record;
          if (data) {
            setAssetsData(data);
          }
          setIsLoading(false);
        }
      })
      .catch((err): void => {
        setIsLoading(false);
        if (!unmounted.current) {
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
      getUserAssets(startDate, endDate);
    }
  };

  if (isLoading) return <FullPageLoader />;
  return (
    <ComponentBox>
      <BorderedBottom>
        <FlexRow justifyContent="space-between" alignItems="center">
          <FlexRow alignItems="center">
            <BolderText fontSize="20px" lineHeight="27px">
              Assets
            </BolderText>
            <SmallStatus>
              <BolderText fontSize="24px" lineHeight="33px" marginBottom="0px">
                {`$ ${assetsData.tileValue}`}
              </BolderText>
              <Divider />
              <ProfitPercentage
                fontSize="20px"
                marginRight="7px"
                color={assetsData.tilePercentage > 0 ? '#00DA9D' : '#F33501'}
              >
                {`${assetsData.tilePercentage}%`}
              </ProfitPercentage>
              {assetsData.tilePercentage > 0 ? (
                <img src="/static/svgs/up-arrow.svg" alt="icon-small" />
              ) : (
                <img src="/static/svgs/down-arrow.svg" alt="icon-small" />
              )}
              {assetsData.tilePercentage > 0 ? (
                <img
                  src="/static/svgs/small-up-swiggly.svg"
                  alt="swiggly"
                  className="ml-2"
                />
              ) : (
                <img
                  src="/static/svgs/down-swiggly.svg"
                  alt="swiggly"
                  className="ml-2"
                />
              )}
            </SmallStatus>
          </FlexRow>
          <Calender dateSelectionHandler={dateSelectionHandler} />
        </FlexRow>
      </BorderedBottom>
      {!!assetsData.data && (
        <AssetsGraph heightProp="363px" chartData={assetsData.data} />
      )}
    </ComponentBox>
  );
};

export default CryptoAssets;
