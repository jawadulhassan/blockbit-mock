import React, { FC, useState } from 'react';

import { FlexRow, BolderText, BorderedBottom } from 'shared/commonStyles';

import HalfPageLoader from 'components/widgets/ContentLoaders/HalfPageLoading';

import { ComponentBox } from '../styles';

import Graph from './Graph';

const TradeByMarket: FC<{}> = () => {
  const [isLoading] = useState(false);

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
      <Graph />
    </ComponentBox>
  );
};

export default TradeByMarket;
