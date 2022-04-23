import React, { useState, Fragment, FC } from 'react';
import capitalize from 'lodash/capitalize';

import { getExchangeIcon, getExchangeSmallIcon } from 'shared/helpers';

import DeleteExchange from 'components/modals/DeleteExchange';
import DisconnectExchange from 'components/modals/DisconnectExchange';

import Slider from '../Slider';

import {
  Assets,
  IdeaIcon,
  GridView,
  LightText,
  BolderText,
  FlexedCentered,
  FlexedRowBetween,
  ProfitPercentage,
} from './styles';

const GridItem: FC<any> = (props: any): any => {
  const {
    status,
    assets,
    iconList,
    profitLoss,
    description,
    marketsList,
    exchangeKeyID,
    getAddedExchangeList,
  } = props;

  const [selectedRow, setSelectedRow] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDisconnectModal, setOpenDisconnectModal] = useState(false);

  const toggleDeleteModal = (): void => setOpenDeleteModal(!openDeleteModal);
  const toggleDisconnectModal = (): void =>
    setOpenDisconnectModal(!openDisconnectModal);

  return (
    <Fragment>
      <DeleteExchange
        open={openDeleteModal}
        toggle={toggleDeleteModal}
        exchangeId={exchangeKeyID}
        getAddedExchangeList={getAddedExchangeList}
      />
      <DisconnectExchange
        open={openDisconnectModal}
        toggle={toggleDisconnectModal}
      />
      <GridView
        border={selectedRow}
        onClick={(): void => setSelectedRow(!selectedRow)}
        // onMouseEnter={(): void => setSelectedRow(true)}
        // onMouseLeave={(): void => setSelectedRow(false)}
      >
        {!selectedRow ? (
          <Fragment>
            <FlexedRowBetween>
              <div>
                <LightText>{description}</LightText>
                <BolderText>Name</BolderText>
              </div>
              <div>
                <ProfitPercentage
                  style={{
                    color: `${profitLoss > 0 ? '#00DA9D' : '#F33501'}`,
                  }}
                >
                  {`${profitLoss}%`}
                </ProfitPercentage>
                <BolderText>Profit/Loss</BolderText>
              </div>
            </FlexedRowBetween>
            <Assets>
              Assets
              <IdeaIcon src="static/svgs/idea-icon.svg" alt="idea-icon" />
            </Assets>
            <div className="mt-2 mb-3">
              <Slider
                sliderMin="OK"
                sliderMax="100k"
                totalValue={assets}
                sliderValue={(assets / 1000) * 100}
                // setSliderValue={(): void => {
                //   console.log('changes');
                // }}
              />
            </div>

            <FlexedRowBetween>
              <div>
                {status === 'connected' ? (
                  <span
                    style={{
                      color: `${status === 'connected' && '#00DA9D'}`,
                    }}
                  >
                    {capitalize(status)}
                  </span>
                ) : (
                  <span>
                    <img src="/static/svgs/alert.svg" alt="alert" />
                  </span>
                )}
                <BolderText>Status</BolderText>
              </div>

              <div>
                <span className="d-flex flex-row">
                  {iconList.length > 0 &&
                    iconList.map((item: any, internalIndex: any): any => (
                      <Fragment key={internalIndex}>
                        <img
                          src={getExchangeSmallIcon(item)}
                          className="exchange-small-icon"
                          alt={`${item}-icon`}
                        />
                      </Fragment>
                    ))}
                  {marketsList.length > 2 && (
                    <div className="additional-icons-circle">
                      <span className="circle-text">{`+${
                        marketsList.length - 2
                      }`}</span>
                    </div>
                  )}
                </span>
                <BolderText>Markets</BolderText>
              </div>
            </FlexedRowBetween>
          </Fragment>
        ) : (
          <FlexedCentered>
            <img
              src={getExchangeIcon(description)}
              style={{ width: 84, height: 84 }}
              alt={`${description}`}
              className="mb-2"
            />
            <BolderText>{description}</BolderText>
            <div className="d-flex flex-row mt-3">
              {(status === false || status === 0) && (
                <div className="pointer mr-2" onClick={toggleDisconnectModal}>
                  <img
                    src="/static/svgs/connect-small.svg"
                    alt="connect-small"
                  />
                </div>
              )}

              <div className="pointer" onClick={toggleDeleteModal}>
                <img src="/static/svgs/delete-small.svg" alt="delete-small" />
              </div>
            </div>
          </FlexedCentered>
        )}
      </GridView>
    </Fragment>
  );
};

export default GridItem;
