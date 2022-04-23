import React, { useState, Fragment, FC } from 'react';
import { useToasts } from 'react-toast-notifications';

import { FlexRow } from 'shared/commonStyles';
import { apiClient } from 'shared/services/api';
import { stopBotEndpoint } from 'shared/endPoints';
import StorageConstants from 'shared/constants/StorageConstants';

import Loader from 'components/widgets/Loader';
import DeleteBot from 'components/modals/DeleteBot';

import PerformanceGraph from './Graph';
import {
  LightText,
  BolderText,
  BotItemView,
  BorderedTop,
  FlexedCentered,
  BorderedBottom,
  FlexedRowBetween,
  ProfitPercentage,
} from './styles';

const BotItem: FC<any> = (props: any): any => {
  const {
    days,
    trade,
    // index,
    market,
    botName,
    exchange,
    strategy,
    // investment,
    setSelectedBot,
    getAddedBotList,
    setSelectedStep,
    algoTradingPlanID,
  } = props;
  const { addToast } = useToasts();

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
      .then((response: any): void => {
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
      <BotItemView
        border={selectedRow}
        onClick={(): void => {
          setSelectedBot(algoTradingPlanID);
          setSelectedStep(3);
        }}
        onMouseEnter={(): void => setSelectedRow(true)}
        onMouseLeave={(): void => setSelectedRow(false)}
      >
        {!selectedRow ? (
          <Fragment>
            <BorderedBottom>
              <FlexedRowBetween>
                <div>
                  <BolderText>{botName}</BolderText>
                </div>
                <div>
                  <img src="/static/svgs/green-pulse.svg" alt="pulse" />
                  <FlexRow>
                    <ProfitPercentage color={trade > 0 ? '#00DA9D' : '#F33501'}>
                      {`${trade}%`}
                    </ProfitPercentage>
                    <div className="ml-1">{` / ${days}`}</div>
                  </FlexRow>
                </div>
              </FlexedRowBetween>
            </BorderedBottom>
            <div>
              <PerformanceGraph />
            </div>

            <BorderedTop>
              <FlexedRowBetween>
                <div>
                  <LightText>{market}</LightText>
                  <BolderText>{exchange}</BolderText>
                </div>
                <div>
                  <LightText>{strategy}</LightText>
                  <BolderText>Strategy</BolderText>
                </div>
              </FlexedRowBetween>
            </BorderedTop>
          </Fragment>
        ) : (
          <FlexedCentered>
            <img
              alt="bot"
              className="mb-2"
              src="/static/svgs/colorful-bot.svg"
            />
            <div className="d-flex flex-row mt-3">
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
            </div>
          </FlexedCentered>
        )}
      </BotItemView>
    </Fragment>
  );
};

export default BotItem;
