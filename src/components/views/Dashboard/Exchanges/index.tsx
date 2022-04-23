import React, { FC, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { apiClient } from 'shared/services/api';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import { getUserExchangesListEndpoint } from 'shared/endPoints';
import StorageConstants from 'shared/constants/StorageConstants';
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
  const history = useHistory();
  const unmounted = useRef(false);
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState('list');
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeList, setExchangeList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({
    filter: '',
    value: '',
  });

  useEffect((): any => {
    getAddedExchangeList();
    return (): void => {
      unmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (): void => setOpen(!open);

  async function getAddedExchangeList(params: any = null): Promise<any> {
    setIsLoading(true);
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    apiClient(userToken)
      .get(
        `${getUserExchangesListEndpoint}?externalUserId=${user.userId}&${params}`
      )
      .then((response): void => {
        if (!unmounted.current) {
          const list = response?.data?.data?.records;
          if (list) {
            setExchangeList(list);
            setIsLoading(false);
          }
        }
      })
      .catch((err): void => {
        if (!unmounted.current) {
          setIsLoading(false);
          if (err.response.status === 401) {
            localStorage.setItem(StorageConstants.AUTH_TOKEN, '');
            localStorage.setItem(StorageConstants.USER_DATA, '');
            history.push(ROUTE_CONSTANTS.LOGIN);
          }
        }
      });
  }

  const handleSearch = () => {
    if (selectedFilter.value === '') {
      getAddedExchangeList();
      return;
    }
    const queryParam = `${selectedFilter.filter}=${selectedFilter.value}`;
    setIsLoading(true);
    getAddedExchangeList(queryParam);
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
        getAddedExchangeList={getAddedExchangeList}
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
          getAddedExchangeList={getAddedExchangeList}
        />
      )}
      {layout === 'grid' && (
        <Grid
          tableData={exchangeList}
          getAddedExchangeList={getAddedExchangeList}
        />
      )}
    </ScreenWrapper>
  );
};

export default Exchanges;
