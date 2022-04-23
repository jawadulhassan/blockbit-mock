import React, { useState, Fragment, FC, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { apiClient } from 'shared/services/api';

import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import StorageConstants from 'shared/constants/StorageConstants';
import { stopBotEndpoint, getUserBotsEndpoint } from 'shared/endPoints';

import { FlexRow, BolderText } from 'shared/commonStyles';

import Loader from 'components/widgets/Loader';
import Checkbox from 'components/widgets/Checkbox';
import DeleteBot from 'components/modals/DeleteBot';
import FullPageLoader from 'components/widgets/ContentLoaders/FullPageLoading';

const BotListing: FC<any> = (): any => {
  const history = useHistory();
  const unmounted = useRef(false);

  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect((): any => {
    getAddedBotList();
    return (): void => {
      unmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (isLoading) return <FullPageLoader />;
  return <Table botTableData={dataList} getAddedBotList={getAddedBotList} />;
};

const Table: FC<any> = ({ botTableData, getAddedBotList }): any => {
  if (!botTableData) return null;
  return (
    <div className="table-responsive mt-4">
      <FlexRow padding="14px 50px">
        <BolderText fontSize="20px" color="color">
          Bots
        </BolderText>
      </FlexRow>
      <table className="table data-table">
        <thead>
          <tr>
            <th />
            <th>Bot Name</th>
            <th>Exchange</th>
            <th>Days</th>
            <th>Market</th>
            <th>Investment</th>
            <th>Profit/Loss</th>
            <th>Strategy</th>
          </tr>
        </thead>
        <tbody>
          {botTableData.length > 0 &&
            botTableData.map(
              (
                {
                  name,
                  market,
                  exchange,
                  investment,
                  profitLoss,
                  daysRunning,
                  tradingStrategy,
                  algoTradingPlanID,
                }: any,
                index: any
              ): any => {
                return (
                  <Fragment key={`order-book-${index}`}>
                    <TableRow
                      {...{
                        name,
                        index,
                        market,
                        exchange,
                        profitLoss,
                        investment,
                        daysRunning,
                        tradingStrategy,
                        getAddedBotList,
                        algoTradingPlanID,
                      }}
                    />
                  </Fragment>
                );
              }
            )}
        </tbody>
      </table>
    </div>
  );
};

const TableRow: FC<any> = (props: any): any => {
  const {
    name,
    index,
    market,
    exchange,
    profitLoss,
    investment,
    daysRunning,
    tradingStrategy,
    getAddedBotList,
    algoTradingPlanID,
  } = props;
  const { addToast } = useToasts();

  const [rowChecked, setRowChecked] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  function notificationHandler(content: any, type: any = 'info'): any {
    addToast(content, {
      appearance: type,
      autoDismiss: true,
    });
  }

  const handleStopBot = (event, id) => {
    event.stopPropagation();
    setIsStopping(true);
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    const requestBody = {
      algoTradingPlanID: id,
      externalUserId: user.userId,
    };
    apiClient(userToken)
      .post(stopBotEndpoint, requestBody)
      .then((): void => {
        setIsStopping(false);
        notificationHandler(
          'Your bot has been stopped, successfully.',
          'success'
        );
      })
      .catch((err: any): void => {
        const errorMessage = err.response.data.message;
        setIsStopping(false);
        notificationHandler(errorMessage, 'error');
      });
  };

  const toggleDeleteModal = (): void => setOpenDeleteModal(!openDeleteModal);

  return (
    <Fragment>
      <DeleteBot
        open={openDeleteModal}
        botId={algoTradingPlanID}
        toggle={toggleDeleteModal}
        getAddedBotList={getAddedBotList}
      />
      {!!isStopping && <Loader />}
      <tr
        className="pointer"
        onMouseEnter={(): void => setSelectedRow(true)}
        onMouseLeave={(): void => setSelectedRow(false)}
      >
        <td>
          <Checkbox
            index={index}
            checked={rowChecked}
            name={`${index}-selector`}
            onChange={(): void => setRowChecked(!rowChecked)}
          />
        </td>
        <td>{name}</td>
        <td>{exchange}</td>
        <td>{daysRunning}</td>
        <td>{market}</td>
        <td>{`${investment.toFixed(8)}`}</td>
        <td>
          <span
            style={{
              color: `${profitLoss > 0 ? '#00DA9D' : '#F33501'}`,
            }}
          >
            {profitLoss > 0
              ? `+${profitLoss.toFixed(2)}`
              : profitLoss.toFixed(2)}
          </span>
        </td>
        <td>
          {selectedRow ? (
            <FlexRow>
              <div
                className="pointer mr-2 z-indexed"
                onClick={(event) => handleStopBot(event, algoTradingPlanID)}
              >
                <img src="/static/svgs/stop.svg" alt="stop-small" />
              </div>
              <div
                className="pointer z-indexed"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleDeleteModal();
                }}
              >
                <img src="/static/svgs/delete-small.svg" alt="delete-small" />
              </div>
            </FlexRow>
          ) : (
            <span>{tradingStrategy}</span>
          )}
        </td>
      </tr>
    </Fragment>
  );
};

export default BotListing;
