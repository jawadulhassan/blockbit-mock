import React, { useState, Fragment, FC } from 'react';
import { useToasts } from 'react-toast-notifications';

import { FlexRow } from 'shared/commonStyles';

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

  const [isStopping] = useState(false);
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
    notificationHandler('Your bot has been stopped, successfully.', 'success');
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
                  {trade > 0 ? (
                    <img src="/static/svgs/up-swiggly.svg" alt="icon-small" />
                  ) : (
                    <img src="/static/svgs/down-swiggly.svg" alt="icon-small" />
                  )}
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
