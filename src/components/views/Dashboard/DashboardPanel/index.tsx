import React, { FC, useContext } from 'react';

import { FlexRow, ScreenWrapper } from 'shared/commonStyles';
import SelectedTabContext from 'shared/contexts/selectedTabContext';

import ScreenHeader from 'components/widgets/ScreenHeader';

import Tiles from './Tiles';
import GrossPNL from './GrossPNL';
import BotsStatus from './BotsStatus';
import TradeByMarkets from './TradeByMarkets';
import RunningBotsTable from './RunningBotsTable';
import MarketTradePerWeek from './MarketTradePerWeek';
import InvestmentByMarket from './InvestmentByMarket';
import AverageProfitPercentage from './AverageProfitPercentage';

const PortfolioView: FC<{}> = (): any => {
  let tabContext: any = {};
  tabContext = useContext(SelectedTabContext);

  return (
    <ScreenWrapper>
      <ScreenHeader
        withCaret={true}
        header="Dashboard"
        buttonLabel="Start Trading"
        onClick={(): any => tabContext.setSelectedTab('bot')}
      />
      <Tiles />
      <FlexRow justifyContent="space-between">
        <GrossPNL />
        <MarketTradePerWeek />
      </FlexRow>
      <AverageProfitPercentage />
      <BotsStatus />
      <FlexRow justifyContent="space-between">
        <TradeByMarkets />
        <InvestmentByMarket />
      </FlexRow>
      <RunningBotsTable />
    </ScreenWrapper>
  );
};

export default PortfolioView;
