import React, { useState, Fragment, FC, useEffect } from 'react';

import { FlexRow } from 'shared/commonStyles';

import Checkbox from 'components/widgets/Checkbox';
import DeleteBot from 'components/modals/DeleteBot';

const Table: FC<any> = ({
  allRowsSelected,
  historyTableData,
  getBotHistoryList,
}: any): any => {
  if (!historyTableData) return null;
  return (
    <div className="table-responsive">
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
          {historyTableData.length > 0 &&
            historyTableData.map(
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
                        allRowsSelected,
                        getBotHistoryList,
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
    allRowsSelected,
    getBotHistoryList,
    algoTradingPlanID,
  } = props;

  const [rowChecked, setRowChecked] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect((): any => {
    setRowChecked(allRowsSelected);
  }, [allRowsSelected]);

  const toggleDeleteModal = (): void => setOpenDeleteModal(!openDeleteModal);

  return (
    <Fragment>
      <DeleteBot
        open={openDeleteModal}
        botId={algoTradingPlanID}
        toggle={toggleDeleteModal}
        getBotHistoryList={getBotHistoryList}
      />
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

export default Table;
