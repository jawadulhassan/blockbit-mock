import React, { useState, Fragment, FC } from 'react';

import { FlexRow } from 'shared/commonStyles';

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

const HistoryItem: FC<any> = (props: any): any => {
  const {
    days,
    trade,
    // index,
    market,
    botName,
    exchange,
    strategy,
    // investment,
    getAddedBotList,
    algoTradingPlanID,
  } = props;
  const [selectedRow, setSelectedRow] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const toggleDeleteModal = (): void => setOpenDeleteModal(!openDeleteModal);

  return (
    <Fragment>
      <DeleteBot
        open={openDeleteModal}
        botId={algoTradingPlanID}
        toggle={toggleDeleteModal}
        getAddedBotList={getAddedBotList}
      />
      <BotItemView
        border={selectedRow}
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

export default HistoryItem;
