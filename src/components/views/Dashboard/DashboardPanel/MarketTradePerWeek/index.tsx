import React, { FC, useState } from 'react';
import { format } from 'date-fns';

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

const MarketTradePerWeek: FC<{}> = () => {
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
              Market Trade
            </BolderText>
            <BolderText fontSize="24px" lineHeight="33px">
              456967.65 $
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
      <PNLGraph />
    </ComponentBox>
  );
};

export default MarketTradePerWeek;
