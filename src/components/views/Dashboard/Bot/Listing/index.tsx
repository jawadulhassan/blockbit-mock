import React, { useState, FC, useRef, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import { apiClient } from 'shared/services/api';
import { getUserBotsEndpoint } from 'shared/endPoints';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import StorageConstants from 'shared/constants/StorageConstants';
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
  const history = useHistory();
  const unmounted = useRef(false);

  const [dataList, setDataList] = useState([]);
  const [layout, setLayout] = useState('list');
  const [isLoading, setIsLoading] = useState(false);
  const [allRowsSelected, setAllRowsSelected] = useState(false);

  useEffect((): any => {
    getAddedBotList();
    return (): void => {
      unmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStep]);

  async function getAddedBotList(): Promise<void> {
    setIsLoading(true);
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    const clientId = user.userId;
    apiClient(userToken)
      .get(`${getUserBotsEndpoint}?externalUserId=${clientId}`)
      .then((response: any): any => {
        if (!unmounted.current) {
          const list = response?.data?.data?.records;
          if (list?.length === 0) {
            setIsWelcomeOpen(true);
          }
          setDataList(list);
          setIsLoading(false);
        }
      })
      .catch((err: any): any => {
        if (!unmounted.current) {
          setIsLoading(false);
          if (err?.response?.status === 401) {
            localStorage.setItem(StorageConstants.AUTH_TOKEN, '');
            localStorage.setItem(StorageConstants.USER_DATA, '');
            history.push(ROUTE_CONSTANTS.LOGIN);
          }
        }
      });
  }

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
          getAddedBotList={getAddedBotList}
          allRowsSelected={allRowsSelected}
          setSelectedStep={setSelectedStep}
        />
      )}
      {layout === 'grid' && (
        <Grid
          botTableData={dataList}
          setSelectedBot={setSelectedBot}
          getAddedBotList={getAddedBotList}
          setSelectedStep={setSelectedStep}
        />
      )}
    </Fragment>
  );
};

export default BotView;
