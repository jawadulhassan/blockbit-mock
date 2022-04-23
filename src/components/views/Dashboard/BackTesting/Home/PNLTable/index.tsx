import React, { useState, Fragment, FC } from 'react';
import { format } from 'date-fns';

import { FlexRow, BolderText, ProfitPercentage } from 'shared/commonStyles';

import Calender from 'components/widgets/Calender';
import DeleteExchange from 'components/modals/DeleteExchange';

const Table: FC<any> = ({ individualData }: any): any => {
  return (
    <div className="table-responsive mt-4">
      <FlexRow
        alignItems="center"
        padding="14px 50px"
        justifyContent="space-between"
      >
        <BolderText fontSize="20px">
          <FlexRow>
            PNL
            <ProfitPercentage
              marginLeft="15px"
              color={individualData.netProfitLoss > 0 ? '#00DA9D' : '#F33501'}
            >
              {individualData.netProfitLoss > 0
                ? `+${individualData.netProfitLoss.toFixed(2)}`
                : individualData.netProfitLoss.toFixed(2)}
            </ProfitPercentage>
          </FlexRow>
        </BolderText>
        {individualData?.trades.length > 5 && <Calender />}
      </FlexRow>
      <table className="table data-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Opening Price</th>
            <th>Closing Price</th>
            <th>Opening Date</th>
            <th>Closing Date</th>
            <th>Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {individualData?.trades.map(
            (
              {
                amount,
                profitLoss,
                openTime,
                closeTime,
                closePrice,
                openPrice,
              }: any,
              index: any
            ): any => {
              return (
                <Fragment key={`order-book-${index}`}>
                  <TableRow
                    {...{
                      amount,
                      profitLoss,
                      openTime,
                      closeTime,
                      closePrice,
                      openPrice,
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
    amount,
    profitLoss,
    openTime,
    closeTime,
    closePrice,
    openPrice,
  } = props;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const toggleDeleteModal = (): void => setOpenDeleteModal(!openDeleteModal);

  return (
    <Fragment>
      <DeleteExchange open={openDeleteModal} toggle={toggleDeleteModal} />

      <tr>
        <td>{`${amount}`}</td>
        <td>{`$${openPrice}`}</td>
        <td>{`$${closePrice}`}</td>
        <td>{format(new Date(openTime), 'yyyy-MM-dd | HH:mm')}</td>
        <td>{format(new Date(closeTime), 'yyyy-MM-dd | HH:mm')}</td>
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
      </tr>
    </Fragment>
  );
};

export default Table;
