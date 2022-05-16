import React, { useState, FC, Fragment } from 'react';

import { historyData } from 'shared/mockData/history';
import {
  Divider,
  FlexRow,
  AlignedEnd,
  AlignedCenter,
  ScreenWrapper,
  FlexedReverse,
  FlexedBetweenSeventy,
} from 'shared/commonStyles';

import Loader from 'components/widgets/Loader';
import Checkbox from 'components/widgets/Checkbox';
import SearchBox from 'components/widgets/SearchBox';
import ScreenHeader from 'components/widgets/ScreenHeader';
import TableLayoutIcons from 'components/widgets/TableLayoutIcons';

import Grid from './Grid';
import Table from './Table';

const History: FC<{}> = (): any => {
  const [dataList] = useState(historyData);
  const [layout, setLayout] = useState('list');
  const [isLoading] = useState(false);
  const [allRowsSelected, setAllRowsSelected] = useState(false);

  return (
    <ScreenWrapper>
      {!!isLoading && <Loader />}
      <ScreenHeader header="History" />
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
          historyTableData={dataList}
          allRowsSelected={allRowsSelected}
          getBotHistoryList={() => console.log('getBotHistoryList')}
        />
      )}
      {layout === 'grid' && (
        <Grid
          historyTableData={dataList}
          getBotHistoryList={() => console.log('getBotHistoryList')}
        />
      )}
    </ScreenWrapper>
  );
};

export default History;
