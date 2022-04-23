import React, { useState, Fragment, FC } from 'react';
import { format } from 'date-fns';

import { FlexRow, BolderText } from 'shared/commonStyles';

import SearchBox from 'components/widgets/SearchBox';
import DeleteExchange from 'components/modals/DeleteExchange';

const Table: FC<any> = ({ data, toggleModal, setDisplayResult }: any): any => {
  return (
    <div className="table-responsive mt-4">
      <FlexRow
        alignItems="center"
        padding="14px 50px"
        justifyContent="space-between"
      >
        <BolderText fontSize="20px" color="color">
          Backtest History
        </BolderText>
        <SearchBox width="25%" />
      </FlexRow>
      <table className="table data-table">
        <thead>
          <tr>
            <th>Exchange</th>
            <th>Market</th>
            <th>Risk Threshold</th>
            <th>Low Bound</th>
            <th>High Bound</th>
            <th>Strategy</th>
            <th>Investment</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Profit/Loss</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (
              {
                symbol,
                status,
                endDate,
                exchange,
                lowBound,
                strategy,
                resultID,
                highBound,
                startDate,
                investment,
                profitLoss,
                riskThreshold,
              }: any,
              index: any
            ): any => {
              return (
                <Fragment key={`order-book-${index}`}>
                  <TableRow
                    {...{
                      symbol,
                      status,
                      endDate,
                      exchange,
                      lowBound,
                      strategy,
                      resultID,
                      highBound,
                      startDate,
                      investment,
                      profitLoss,
                      toggleModal,
                      riskThreshold,
                      setDisplayResult,
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
    symbol,
    status,
    endDate,
    exchange,
    lowBound,
    strategy,
    resultID,
    highBound,
    startDate,
    investment,
    profitLoss,
    toggleModal,
    riskThreshold,
    setDisplayResult,
  } = props;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const toggleDeleteModal = (): void => setOpenDeleteModal(!openDeleteModal);

  return (
    <Fragment>
      <DeleteExchange open={openDeleteModal} toggle={toggleDeleteModal} />

      <tr>
        <td>{exchange}</td>
        <td>{symbol}</td>
        <td>{riskThreshold}</td>
        <td>{`$${lowBound}`}</td>
        <td>{`$${highBound}`}</td>
        <td>{strategy}</td>
        <td>{`$${investment}`}</td>
        <td>{format(new Date(startDate), 'yyyy-MM-dd')}</td>
        <td>{format(new Date(endDate), 'yyyy-MM-dd')}</td>
        <td>
          {status === 'Completed' && (
            <span
              style={{
                color: `${profitLoss > 0 ? '#00DA9D' : '#F33501'}`,
              }}
            >
              {profitLoss > 0
                ? `+${profitLoss.toFixed(2)}`
                : profitLoss.toFixed(2)}
            </span>
          )}
        </td>
        <td>
          <span>{status}</span>
        </td>
        <td>
          <FlexRow>
            {status === 'Completed' ? (
              <div
                className="pointer"
                onClick={(): any => {
                  setDisplayResult(resultID);
                  window.scrollTo(0, 2500);
                }}
              >
                <img src="/static/svgs/active-play.svg" alt="play-small" />
              </div>
            ) : (
              <div>
                <img src="/static/svgs/inactive-play.svg" alt="play-small" />
              </div>
            )}
            <div className="pointer ml-2" onClick={toggleModal}>
              <img src="/static/svgs/share-icon.svg" alt="share-icon" />
            </div>
          </FlexRow>
        </td>
      </tr>
    </Fragment>
  );
};

export default Table;
