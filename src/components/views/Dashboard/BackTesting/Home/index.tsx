import React, { useState, FC } from 'react';

import { shapeDataFormatter } from 'shared/helpers';
import {
  mockBacktesting,
  mockIndividualTests,
} from 'shared/mockData/backtestHistory';
import {
  FlexRow,
  FlexColumn,
  BolderText,
  PNLWrapper,
  RingWrapper,
  ComponentBox,
  ScreenWrapper,
  ProfitPercentage,
} from 'shared/commonStyles';

import Loader from 'components/widgets/Loader';
// import Button from 'components/widgets/Button';
import RingStep from 'components/widgets/RingStep';
import ScreenHeader from 'components/widgets/ScreenHeader';

import Graph from '../BacktestingGraph';

import PNLTable from './PNLTable';
import SummaryTable from './SummaryTable';
import HistoryTable from './HistoryTable';

const BackTesting: FC<any> = ({ userQuota, setSelectedStep }: any): any => {
  const [isLoading] = useState(false);
  const [displayResult, setDisplayResult] = useState('');
  const [selectedFilter, setSelectedFilter] = useState({
    filter: '',
    value: '',
  });
  const [backtestHistory] = useState(mockBacktesting);

  const handleSearch = () => {
    if (selectedFilter.value === '') {
      return;
    }
    const queryParam = `${selectedFilter.filter}=${selectedFilter.value}`;
    console.log({ queryParam });
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        withCaret={true}
        header="Backtesting"
        buttonLabel="New Backtesting"
        onClick={(): any => setSelectedStep(2)}
      />
      {!!isLoading && <Loader />}
      <ComponentBox height="240px">
        <FlexRow
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <RingWrapper width="30%" borderLeft={true} borderBottom={true}>
            <RingStep
              progress={userQuota?.allowedMaxTests}
              color="#1CE0E2"
              className="smaller-ring"
              label="Allowed Tests / Day"
              background="rgba(28, 224, 226, 0.2)"
            />
          </RingWrapper>
          <RingWrapper width="40%" borderBottom={true}>
            <RingStep
              progress={userQuota?.availableTests}
              color="#00DA9D"
              className="smaller-ring"
              label="Available Tests"
              background="rgba(0, 218, 157, 0.2)"
            />
          </RingWrapper>
          <RingWrapper width="30%" borderRight={true} borderBottom={true}>
            {userQuota?.status === 'InProgress' ? (
              <RingStep
                progress={userQuota?.usedTests}
                color="#EBC844"
                className="smaller-ring"
                label="In Processing Tests"
                background="rgba(235, 200, 68, 0.2)"
              />
            ) : (
              <RingStep
                progress={0}
                color="#EBC844"
                className="smaller-ring"
                label="In Processing Tests"
                background="rgba(235, 200, 68, 0.2)"
              />
            )}
          </RingWrapper>
        </FlexRow>
        <FlexRow
          width="100%"
          marginTop="21px"
          alignItems="center"
          justifyContent="center"
        >
          {/* <Button
            width="150px"
            label="Buy Tests"
            icon="colored-backtesting.svg"
          /> */}
        </FlexRow>
      </ComponentBox>
      <HistoryTable
        data={backtestHistory}
        handleSearch={handleSearch}
        setDisplayResult={setDisplayResult}
        setSelectedFilter={setSelectedFilter}
      />
      {!!displayResult && (
        <IndividualTest
          {...{ displayResult, backtestHistory, setDisplayResult }}
        />
      )}
    </ScreenWrapper>
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
    netProfitLoss: 4,
    trades: mockIndividualTests,
  });

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
