import React, { useState, FC } from 'react';

import {
  FlexRow,
  FlexColumn,
  PNLWrapper,
  ScreenWrapper,
  ProfitPercentage,
} from 'shared/commonStyles';

import Button from 'components/widgets/Button';
import ScreenHeader from 'components/widgets/ScreenHeader';

import ShareBacktest from 'components/modals/ShareBacktest';

import PNLTable from '../Home/PNLTable';
import SummaryTable from '../Home/SummaryTable';

import Graph from '../BacktestingGraph';

const pnlTableData = [
  {
    amount: 200,
    profitLoss: 2.24,
    openingDate: 'Sep 13,2020',
    closingDate: 'Sep 14,2020',
    closingPrice: 13200,
    openingPrice: 13600,
  },
  {
    amount: 400,
    profitLoss: -2.24,
    openingDate: 'Sep 13,2020',
    closingDate: 'Sep 14,2020',
    closingPrice: 13200,
    openingPrice: 13600,
  },
  {
    amount: 200,
    profitLoss: 2.24,
    openingDate: 'Sep 13,2020',
    closingDate: 'Sep 14,2020',
    closingPrice: 13200,
    openingPrice: 13600,
  },
  {
    amount: 400,
    profitLoss: -2.24,
    openingDate: 'Sep 13,2020',
    closingDate: 'Sep 14,2020',
    closingPrice: 13200,
    openingPrice: 13600,
  },
  {
    amount: 200,
    profitLoss: 2.24,
    openingDate: 'Sep 13,2020',
    closingDate: 'Sep 14,2020',
    closingPrice: 13200,
    openingPrice: 13600,
  },
  {
    amount: 400,
    profitLoss: -2.24,
    openingDate: 'Sep 13,2020',
    closingDate: 'Sep 14,2020',
    closingPrice: 13200,
    openingPrice: 13600,
  },
  {
    amount: 200,
    profitLoss: 2.24,
    openingDate: 'Sep 13,2020',
    closingDate: 'Sep 14,2020',
    closingPrice: 13200,
    openingPrice: 13600,
  },
  {
    amount: 400,
    profitLoss: -2.24,
    openingDate: 'Sep 13,2020',
    closingDate: 'Sep 14,2020',
    closingPrice: 13200,
    openingPrice: 13600,
  },
];

const summaryTableData = {
  exchange: 'Binance',
  market: 'BTC/USDT',
  riskThreshold: 'Minimum',
  lowBound: 183.4,
  highBound: 412.9,
  strategy: 'Sell',
  investment: 2344,
  startDate: 'Sept 7, 2020',
  endDate: 'Sept 8, 2020',
  profitLoss: +2.5,
};

const ResultsBacktesting: FC<any> = (): any => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (): any => setIsModalOpen(!isModalOpen);

  return (
    <ScreenWrapper>
      <ScreenHeader header="Results" />
      <ShareBacktest open={isModalOpen} toggle={toggleModal} />
      <FlexColumn width="100%" marginTop="28px" alignItems="center">
        <Graph />
        <PNLWrapper>
          PNL
          <ProfitPercentage>+2.56%</ProfitPercentage>
        </PNLWrapper>
        <FlexRow
          width="100%"
          marginBottom="40px"
          justifyContent="space-between"
        >
          <div style={{ width: '35%' }}>
            <SummaryTable {...{ summaryTableData }} />
          </div>
          <div style={{ width: '64%' }}>
            <PNLTable {...{ pnlTableData }} />
          </div>
        </FlexRow>
        <Button
          width="115px"
          label="Share"
          icon="arrow.svg"
          onClick={(): any => toggleModal()}
        />
      </FlexColumn>
    </ScreenWrapper>
  );
};

export default ResultsBacktesting;
