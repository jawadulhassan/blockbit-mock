import React, { useState, Fragment, FC } from 'react';
import capitalize from 'lodash/capitalize';

import { FlexRow } from 'shared/commonStyles';
import { getExchangeSmallIcon } from 'shared/helpers';

import DeleteExchange from 'components/modals/DeleteExchange';
import DisconnectExchange from 'components/modals/DisconnectExchange';

const Table: FC<any> = ({ tableData, getAddedExchangeList }: any): any => {
  if (!tableData) return null;
  return (
    <div className="table-responsive">
      <table className="table data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Assets</th>
            <th>Profit/Loss</th>
            <th>Markets</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(
            (
              {
                status,
                assets,
                markets,
                profitLoss,
                description,
                exchangeKeyID,
              }: any,
              index: any
            ): any => {
              const marketsList = markets.split(',');
              const iconList =
                marketsList.length > 0 && marketsList.slice(0, 2);
              return (
                <Fragment key={`order-book-${index}`}>
                  <TableRow
                    {...{
                      status,
                      assets,
                      iconList,
                      profitLoss,
                      marketsList,
                      description,
                      exchangeKeyID,
                      getAddedExchangeList,
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

      <tr
        onClick={(): void => setSelectedRow(true)}
        onMouseEnter={(): void => setSelectedRow(true)}
        onMouseLeave={(): void => setSelectedRow(false)}
      >
        <td>{description}</td>
        <td>{`$ ${assets}`}</td>
        <td>
          <span
            style={{
              color: `${profitLoss > 0 ? '#00DA9D' : '#F33501'}`,
            }}
          >
            {`${profitLoss}%`}
          </span>
        </td>
        <td>
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
        </td>
        <td>
          {selectedRow ? (
            <FlexRow>
              {status === 1 && (
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
            </FlexRow>
          ) : status === 1 ? (
            <span
              style={{
                color: `${status === 1 && '#00DA9D'}`,
              }}
            >
              {capitalize(status)}
            </span>
          ) : (
            <span>
              <img src="/static/svgs/alert.svg" alt="alert" />
            </span>
          )}
        </td>
      </tr>
    </Fragment>
  );
};

export default Table;
