import React, { FC, useState } from 'react';
import { format } from 'date-fns';

import { FlexRow, BolderText, BorderedBottom } from 'shared/commonStyles';

import Calender from 'components/widgets/Calender';
import FullPageLoader from 'components/widgets/ContentLoaders/FullPageLoading';

import { ComponentBox } from '../styles';

import Graph from './Graph';

const AverageProfitPercentage: FC<{}> = () => {
  const [isLoading] = useState(false);

  const dateSelectionHandler = ({ start, end }) => {
    const startDate = format(new Date(start), 'yyyy-MM-dd');
    const endDate = format(new Date(end), 'yyyy-MM-dd');

    if (startDate && endDate) {
      console.log('startDate, endDate', startDate, endDate);
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

      <Graph />
    </ComponentBox>
  );
};

export default AverageProfitPercentage;
