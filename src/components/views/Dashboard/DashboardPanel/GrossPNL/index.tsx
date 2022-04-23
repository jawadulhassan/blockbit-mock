import React, { FC, useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

import { apiClient } from 'shared/services/api';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import { getUserGrossPNLEndpoint } from 'shared/endPoints';
import StorageConstants from 'shared/constants/StorageConstants';
import {
  FlexRow,
  FlexColumn,
  BolderText,
  BorderedBottom,
  ProfitPercentage,
} from 'shared/commonStyles';

import Calender from 'components/widgets/Calender';
import HalfPageLoader from 'components/widgets/ContentLoaders/HalfPageLoading';

import { ComponentBox } from '../styles';

import PNLGraph from './Graph';

interface IPnl {
  tileValue: number;
  tilePercentage: number;
  chartData: object[];
}

const GrossPNL: FC<{}> = () => {
  const history = useHistory();
  const unmounted = useRef(false);

  const [pnlData, setPnlData] = useState<IPnl>({
    tileValue: 0,
    tilePercentage: 0,
    chartData: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect((): any => {
    getUserGrossPNL();
    return (): void => {
      unmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUserGrossPNL(startDate = '', endDate = ''): Promise<any> {
    setIsLoading(true);
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    apiClient(userToken)
      .get(
        `${getUserGrossPNLEndpoint}?externalUserId=${user.userId}${
          !!startDate ? `&startDate=${startDate}` : ''
        }${!!endDate ? `&endDate=${endDate}` : ''}`
      )
      .then((response): void => {
        if (!unmounted.current) {
          const data = response?.data?.data?.record;
          if (data) {
            setPnlData(data);
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
      getUserGrossPNL(startDate, endDate);
    }
  };

  if (isLoading) return <HalfPageLoader />;
  return (
    <ComponentBox width="49.5%" height="433px">
      <BorderedBottom>
        <FlexRow justifyContent="space-between" alignItems="center">
          <FlexColumn>
            <BolderText fontSize="20px" lineHeight="27px">
              Gross Profit / Loss
            </BolderText>
            <BolderText fontSize="24px" lineHeight="33px">
              {`${pnlData.tileValue} $`}
            </BolderText>
          </FlexColumn>
          <FlexColumn alignItems="flex-end">
            {pnlData.tilePercentage > 0 ? (
              <img src="/static/svgs/up-swiggly.svg" alt="icon-small" />
            ) : (
              <img src="/static/svgs/down-swiggly.svg" alt="icon-small" />
            )}
            <FlexRow justifyContent="flex-end">
              <ProfitPercentage
                marginTop="7px"
                marginRight="12px"
                color={pnlData.tilePercentage > 0 ? '#00DA9D' : '#F33501'}
              >
                {`${pnlData.tilePercentage}%`}
              </ProfitPercentage>
              {pnlData.tilePercentage > 0 ? (
                <img src="/static/svgs/up-arrow.svg" alt="icon-small" />
              ) : (
                <img src="/static/svgs/down-arrow.svg" alt="icon-small" />
              )}
            </FlexRow>
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
      {!!pnlData.chartData && <PNLGraph chartData={pnlData.chartData} />}
    </ComponentBox>
  );
};

export default GrossPNL;
