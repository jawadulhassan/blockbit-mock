import React, { FC, useState } from 'react';
import { format } from 'date-fns';

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
  chartData: any;
}

const GrossPNL: FC<{}> = () => {
  const [pnlData] = useState<IPnl>({
    tileValue: 6756721,
    tilePercentage: 2.4,
    chartData: [4, 2, 3, 7, 1, 5, 3],
  });
  const [isLoading] = useState(false);

  const dateSelectionHandler = ({ start, end }) => {
    const startDate = format(new Date(start), 'yyyy-MM-dd');
    const endDate = format(new Date(end), 'yyyy-MM-dd');

    if (startDate && endDate) {
      console.log('startDate, endDate', startDate, endDate);
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
