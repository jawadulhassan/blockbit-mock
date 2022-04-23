import React, { FC, useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

import { apiClient } from 'shared/services/api';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import { getUserAverageProfitEndpoint } from 'shared/endPoints';
import StorageConstants from 'shared/constants/StorageConstants';
import { FlexRow, BolderText, BorderedBottom } from 'shared/commonStyles';

import Calender from 'components/widgets/Calender';
import FullPageLoader from 'components/widgets/ContentLoaders/FullPageLoading';

import { ComponentBox } from '../styles';

import Graph from './Graph';

interface IData {
  data: number[];
  dates: number[];
}

const AverageProfitPercentage: FC<{}> = () => {
  const history = useHistory();
  const unmounted = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [profitData, setProfitData] = useState<IData>({
    data: [],
    dates: [],
  });

  useEffect((): any => {
    getUserAverageProfitPercentage();
    return (): void => {
      unmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUserAverageProfitPercentage(
    startDate = '',
    endDate = ''
  ): Promise<any> {
    setIsLoading(true);
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    apiClient(userToken)
      .get(
        `${getUserAverageProfitEndpoint}?externalUserId=${user.userId}${
          !!startDate ? `&startDate=${startDate}` : ''
        }${!!endDate ? `&endDate=${endDate}` : ''}`
      )
      .then((response): void => {
        if (!unmounted.current) {
          const data = response?.data?.data?.record;
          if (data) {
            setProfitData(data);
          }
          setIsLoading(false);
        }
      })
      .catch((err): void => {
        console.log({ err });
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
      getUserAverageProfitPercentage(startDate, endDate);
    }
  };

  if (isLoading) return <FullPageLoader />;
  return (
    <ComponentBox width="100%" height="354px">
      <BorderedBottom marginBottom="25px">
        <FlexRow justifyContent="space-between" alignItems="center">
          <BolderText fontSize="20px" lineHeight="27px">
            Average Profit Percentage
          </BolderText>
          <Calender dateSelectionHandler={dateSelectionHandler} />
        </FlexRow>
      </BorderedBottom>
      {!!profitData && (
        <Graph categories={profitData.dates} data={profitData.data} />
      )}
    </ComponentBox>
  );
};

export default AverageProfitPercentage;
