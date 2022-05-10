import React, { useState, FC, Fragment } from 'react';

import { botData } from 'shared/mockData/bot';
import {
  Divider,
  FlexRow,
  AlignedEnd,
  AlignedCenter,
  FlexedReverse,
  FlexedBetweenSeventy,
} from 'shared/commonStyles';

import WelcomeModal from 'components/modals/WelcomeModal';

import Loader from 'components/widgets/Loader';
import Checkbox from 'components/widgets/Checkbox';
import SearchBox from 'components/widgets/SearchBox';
import ScreenHeader from 'components/widgets/ScreenHeader';
import TableLayoutIcons from 'components/widgets/TableLayoutIcons';

import Grid from './Grid';
import Table from './Table';

const BotView: FC<any> = ({
  selectedStep,
  isWelcomeOpen,
  setSelectedBot,
  setSelectedStep,
  setIsWelcomeOpen,
}): any => {
  const [dataList] = useState(botData);
  const [isLoading] = useState(false);
  const [layout, setLayout] = useState('list');
  const [allRowsSelected, setAllRowsSelected] = useState(false);

  return (
    <Fragment>
      {!!isLoading && <Loader />}
      <ScreenHeader
        header="Bot"
        withCaret={true}
        buttonLabel="Create"
        onClick={(): any => {
          setIsWelcomeOpen(false);
          setSelectedStep(2);
        }}
      />
      <WelcomeModal
        open={isWelcomeOpen}
        toggle={(): any => {
          setIsWelcomeOpen(!isWelcomeOpen);
        }}
        onClick={(): any => {
          setIsWelcomeOpen(false);
          setSelectedStep(2);
        }}
      />
      <FlexedReverse>
        <FlexedBetweenSeventy>
          <AlignedCenter>
            <SearchBox />
          </AlignedCenter>
          <AlignedEnd>
            <TableLayoutIcons layout={layout} setLayout={setLayout} />
          </AlignedEnd>
        </FlexedBetweenSeventy>
      </FlexedReverse>

      {layout === 'list' && dataList?.length > 0 && (
        <FlexRow className="pl-6 pb-2 align-items-center">
          <Checkbox
            name={`main-selector`}
            checked={allRowsSelected}
            onChange={(): void => setAllRowsSelected(!allRowsSelected)}
          />
          {!!allRowsSelected && (
            <Fragment>
              <Divider />
              <img src="/static/svgs/delete-bin.svg" alt="bin" />
            </Fragment>
          )}
        </FlexRow>
      )}

      {layout === 'list' && (
        <Table
          botTableData={dataList}
          setSelectedBot={setSelectedBot}
          getAddedBotList={() => console.log('getAddedBotList')}
          allRowsSelected={allRowsSelected}
          setSelectedStep={setSelectedStep}
        />
      )}
      {layout === 'grid' && (
        <Grid
          botTableData={dataList}
          setSelectedBot={setSelectedBot}
          getAddedBotList={() => console.log('getAddedBotList')}
          setSelectedStep={setSelectedStep}
        />
      )}
    </Fragment>
  );
};

export default BotView;
