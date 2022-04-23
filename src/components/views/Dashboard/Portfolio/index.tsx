import React, { FC } from 'react';

import { FlexRow, ScreenWrapper } from 'shared/commonStyles';

import ScreenHeader from 'components/widgets/ScreenHeader';

import CryptoAssets from './CryptoAssets';
import HoldingsTable from './HoldingsTable';
import HoldingsByExchange from './HoldingsByExchange';
import HoldingsByCurrencies from './HoldingsByCurrencies';

const PortfolioView: FC<{}> = (): any => {
  return (
    <ScreenWrapper>
      <ScreenHeader
        header="Crypto Portfolio"
        buttonLabel="Start Trading"
        withCaret={true}
        onClick={(): any => console.log('pressed!')}
      />
      <CryptoAssets />
      <FlexRow justifyContent="space-between">
        <HoldingsByCurrencies />
        <HoldingsByExchange />
      </FlexRow>
      <HoldingsTable />
    </ScreenWrapper>
  );
};

export default PortfolioView;
