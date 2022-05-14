import React, { FC, useState } from 'react';

import { exchangeData } from 'shared/mockData/exchange';
import {
  AlignedEnd,
  AlignedCenter,
  ScreenWrapper,
  FlexedReverse,
  FlexedBetweenSeventy,
} from 'shared/commonStyles';

import AddExchange from 'components/modals/AddExchange';

import Loader from 'components/widgets/Loader';
import ScreenHeader from 'components/widgets/ScreenHeader';
import TableLayoutIcons from 'components/widgets/TableLayoutIcons';
import SearchBox from 'components/widgets/SearchBox/ExchangeFilter';

import Grid from './Grid';
import Table from './Table';

const Exchanges: FC<{}> = () => {
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState('list');
  const [isLoading] = useState(false);
  const [exchangeList] = useState(exchangeData);
  const [selectedFilter, setSelectedFilter] = useState({
    filter: '',
    value: '',
  });

  const toggle = (): void => setOpen(!open);

  const handleSearch = () => {
    if (selectedFilter.value === '') {
      return;
    }
    const queryParam = `${selectedFilter.filter}=${selectedFilter.value}`;
    console.log('handleSearch: ', queryParam);
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        header="Exchanges"
        buttonLabel="Add"
        withCaret={true}
        onClick={(): void => toggle()}
      />
      {!!isLoading && <Loader />}
      <AddExchange
        open={open}
        toggle={toggle}
        getAddedExchangeList={() => console.log('getAddedExchangeList')}
      />
      <FlexedReverse>
        <FlexedBetweenSeventy>
          <AlignedCenter>
            <SearchBox
              handleSearch={handleSearch}
              setSelectedFilter={setSelectedFilter}
            />
          </AlignedCenter>
          <AlignedEnd>
            <TableLayoutIcons layout={layout} setLayout={setLayout} />
          </AlignedEnd>
        </FlexedBetweenSeventy>
      </FlexedReverse>

      {layout === 'list' && (
        <Table
          tableData={exchangeList}
          getAddedExchangeList={() => console.log('getAddedExchangeList')}
        />
      )}
      {layout === 'grid' && (
        <Grid
          tableData={exchangeList}
          getAddedExchangeList={() => console.log('getAddedExchangeList')}
        />
      )}
    </ScreenWrapper>
  );
};

export default Exchanges;
