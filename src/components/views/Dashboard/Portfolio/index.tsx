import React, { FC, useContext } from 'react';

import { FlexRow, ScreenWrapper } from 'shared/commonStyles';
import SelectedTabContext from 'shared/contexts/selectedTabContext';

import ScreenHeader from 'components/widgets/ScreenHeader';

import CryptoAssets from './CryptoAssets';
import HoldingsTable from './HoldingsTable';
import HoldingsByExchange from './HoldingsByExchange';
import HoldingsByCurrencies from './HoldingsByCurrencies';

const PortfolioView: FC<{}> = (): any => {
  let tabContext: any = {};
  tabContext = useContext(SelectedTabContext);

  return (
    <ScreenWrapper>
      <ScreenHeader
        header="Crypto Portfolio"
        buttonLabel="Start Trading"
        withCaret={true}
        onClick={(): any => tabContext.setSelectedTab('bot')}
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
