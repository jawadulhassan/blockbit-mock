import React, { FC, useState } from 'react';

import { FlexRow, BolderText, BorderedBottom } from 'shared/commonStyles';

import HalfPageLoader from 'components/widgets/ContentLoaders/HalfPageLoading';

import { ComponentBox } from '../styles';

import Graph from './Graph';

const InvestmentByMarket: FC<{}> = () => {
  const [isLoading] = useState(false);

  if (isLoading) return <HalfPageLoader />;
  return (
    <ComponentBox width="49%" height="486px">
      <BorderedBottom>
        <FlexRow>
          <BolderText fontSize="20px" lineHeight="27px">
            Holdings by Exchanges
          </BolderText>
        </FlexRow>
      </BorderedBottom>
      <Graph />
    </ComponentBox>
  );
};

export default InvestmentByMarket;
