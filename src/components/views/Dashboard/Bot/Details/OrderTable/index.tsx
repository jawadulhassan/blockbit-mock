import React, { useState, Fragment, FC } from 'react';
import { format } from 'date-fns';

import { FlexColumn, FlexRow, ProfitPercentage } from 'shared/commonStyles';

import Calender from 'components/widgets/Calender';

import { HeaderTab } from './styles.js';

const OrderTable: FC<any> = ({ openOrders, closedOrders }): any => {
  const [tableDisplay, setTableDisplay] = useState(false);

  return (
    <FlexColumn>
      <FlexRow
        marginBottom="40px"
        alignItems="center"
        justifyContent="space-between"
      >
        <FlexRow>
          <HeaderTab
            active={!tableDisplay}
            onClick={(): any => setTableDisplay(false)}
          >
            Open Orders
          </HeaderTab>
          <HeaderTab
            active={tableDisplay}
            onClick={(): any => setTableDisplay(true)}
          >
            Closed Trades
          </HeaderTab>
        </FlexRow>
        <Calender />
      </FlexRow>
      {!tableDisplay ? (
        <TableOpen tableData={openOrders} />
      ) : (
        <TableClosed tableData={closedOrders} />
      )}
    </FlexColumn>
  );
};

const TableClosed: FC<any> = ({ tableData }: any): any => {
  return (
    <div className="table-responsive">
      <table className="table data-table">
        <thead>
          <tr>
            <th>Buy Date</th>
            <th>Sell Date</th>
            <th>Exchange</th>
            <th>Market</th>
            <th>Buy Price</th>
            <th>Sell Price</th>
            <th>Fee</th>
            <th>Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 &&
            tableData.map(
              (
                {
                  fee,
                  pnl,
                  pair,
                  buyDate,
                  sellDate,
                  exchange,
                  buyPrice,
                  sellPrice,
                }: any,
                index: any
              ): any => {
                return (
                  <Fragment key={`order-book-${index}`}>
                    <TableClosedRow
                      {...{
                        fee,
                        pnl,
                        pair,
                        buyDate,
                        sellDate,
                        exchange,
                        buyPrice,
                        sellPrice,
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

const TableClosedRow: FC<any> = (props: any): any => {
  const {
    fee,
    pnl,
    pair,
    buyDate,
    sellDate,
    exchange,
    buyPrice,
    sellPrice,
  } = props;

  return (
    <tr>
      <td>{format(new Date(buyDate), 'yyyy-MM-dd | HH:mm:ss')}</td>
      <td>{format(new Date(sellDate), 'yyyy-MM-dd | HH:mm:ss')}</td>
      <td>{exchange}</td>
      <td>{pair}</td>
      <td>{`${buyPrice} USD`}</td>
      <td>{`${sellPrice} USD`}</td>
      <td>
        <span>{fee.toFixed(8)}</span>
      </td>
      <td>
        <span
          style={{
            color: `${pnl > 0 ? '#00DA9D' : '#F33501'}`,
          }}
        >
          {pnl > 0 ? `+${pnl.toFixed(2)}` : pnl.toFixed(2)}
        </span>
      </td>
    </tr>
  );
};

const TableOpen: FC<any> = ({ tableData }: any): any => {
  return (
    <div className="table-responsive">
      <table className="table data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Exchange</th>
            <th>Market</th>
            <th>Side</th>
            <th>Buy Price</th>
            <th>Amount</th>
            <th>Profit/Loss</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 &&
            tableData.map(
              (
                { date, exchange, pair, price, amount, fee, side }: any,
                index: any
              ): any => {
                return (
                  <Fragment key={`order-book-${index}`}>
                    <TableOpenRow
                      {...{
                        fee,
                        side,
                        pair,
                        date,
                        price,
                        amount,
                        exchange,
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

const TableOpenRow: FC<any> = (props: any): any => {
  const { amount, pair, date, exchange, fee, price, side } = props;

  return (
    <tr>
      <td>{format(new Date(date), 'yyyy-MM-dd | HH:mm:ss')}</td>
      <td>{exchange}</td>
      <td>{pair}</td>
      <td>
        <ProfitPercentage
          textAlign="left"
          color={side === 'Buy' ? '#00DA9D' : '#F33501'}
        >
          {side}
        </ProfitPercentage>
      </td>
      <td>{price.toFixed(2)}</td>
      <td>
        <span
          style={{
            color: `${amount > 0 ? '#00DA9D' : '#F33501'}`,
          }}
        >
          {amount > 0 ? `+${amount.toFixed(8)}` : amount.toFixed(8)}
        </span>
      </td>
      <td>--</td>
      <td>
        <span>{fee.toFixed(8)}</span>
      </td>
    </tr>
  );
};

export default OrderTable;
