import React, { useState, FC, Fragment, useEffect } from 'react';

import { shapeDataFormatter } from 'shared/helpers';
import { mockBacktesting, mockIndividualTests } from 'shared/mockData/backtestHistory';
import {
  FlexRow,
  LightText,
  FlexColumn,
  BolderText,
  PNLWrapper,
  ProfitPercentage,
  UnAuthScreenWrapper,
} from 'shared/commonStyles';

import Loader from 'components/widgets/Loader';
import Button from 'components/widgets/Button';
import UnAuthBacktest from 'components/modals/UnAuthBacktest';
import UnAuthShareBacktest from 'components/modals/UnAuthShareBacktest';

import { UnAuthHeader } from '../../Header';

import PNLTable from './PNLTable';
import Graph from './BacktestingGraph';
import SummaryTable from './SummaryTable';
import HistoryTable from './HistoryTable';

const BackTesting: FC<any> = (): any => {
  const [isLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayResult, setDisplayResult] = useState('');
  const [backtestHistory] = useState(mockBacktesting);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const toggleModal = (): any => setIsModalOpen(!isModalOpen);
  const toggleShareModal = (): any => setIsShareModalOpen(!isShareModalOpen)

  return (
    <Fragment>
      <UnAuthHeader />
      {!!isLoading && <Loader />}
      <UnAuthScreenWrapper>
        <BolderText fontSize="28px" lineHeight="38px">
          Backtesting
        </BolderText>
        <FlexColumn padding="31px 7% 59px 7%">
          <LightText textAlign="center">
            Below you can see the results of predefined Pairs and tests that our
            users has been performing.
          </LightText>
          <LightText textAlign="center">
            Below results show how PNL will be for these markets and on the
            given dates.
          </LightText>
        </FlexColumn>
        <BolderText fontSize="20px" lineHeight="27px" marginBottom="12px">
          Recent Backtests
        </BolderText>
        <UnAuthBacktest open={isModalOpen} toggle={toggleModal} />
        <UnAuthShareBacktest
          open={isShareModalOpen}
          toggle={toggleShareModal}
        />
        <HistoryTable
          data={backtestHistory}
          toggleModal={toggleShareModal}
          setDisplayResult={setDisplayResult}
        />

        {!!displayResult && (
          <IndividualTest
            {...{ displayResult, backtestHistory, setDisplayResult }}
          />
        )}
        <Button
          width="194px"
          icon="arrow.svg"
          marginTop="40px"
          label="Start Backtesting"
          onClick={(): any => toggleModal()}
        />
      </UnAuthScreenWrapper>
    </Fragment>
  );
};

export default BackTesting;

const IndividualTest: FC<any> = ({
  displayResult: resultId,
  backtestHistory,
  setDisplayResult,
}: any): any => {
  const summaryTableData = backtestHistory.find(
    (item: any): any => item.resultID === resultId
  );

  const [isLoading] = useState(false);
  const [individualData] = useState({
    netProfitLoss: 5,
    trades: mockIndividualTests,
  });

  if (individualData.trades.length === 0) {
    return null;
  }

  const plotData = shapeDataFormatter(individualData.trades);
  return (
    <FlexColumn
      width="100%"
      marginTop="30px"
      paddingTop="30px"
      alignItems="center"
    >
      {!!isLoading && <Loader />}
      <div className="pointer" onClick={(): void => setDisplayResult('')}>
        <img src="/static/svgs/arrow-down.svg" alt="arrow-icon" />
      </div>
      <BolderText
        fontSize="24px"
        marginTop="20px"
        lineWeight="33px"
        marginBottom="20px"
      >
        Results
      </BolderText>
      <Graph ordersData={plotData} market={summaryTableData.symbol} />
      <PNLWrapper>
        PNL
        <ProfitPercentage
          color={individualData.netProfitLoss > 0 ? '#00DA9D' : '#F33501'}
        >
          {individualData.netProfitLoss > 0
            ? `+${individualData.netProfitLoss.toFixed(2)}`
            : individualData.netProfitLoss.toFixed(2)}
        </ProfitPercentage>
      </PNLWrapper>
      <FlexRow width="100%" marginBottom="40px" justifyContent="space-between">
        <div style={{ width: '35%' }}>
          <SummaryTable {...{ summaryTableData }} />
        </div>
        <div style={{ width: '64%' }}>
          <PNLTable {...{ individualData }} />
        </div>
      </FlexRow>
    </FlexColumn>
  );
};
