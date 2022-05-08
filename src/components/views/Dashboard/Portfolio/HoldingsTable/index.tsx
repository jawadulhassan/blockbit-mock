import React, { useState, Fragment, FC } from 'react';

import { portfolio } from 'shared/mockData/portfolio';
import { FlexRow, LightText, BolderText } from 'shared/commonStyles';

import HoldingDetails from 'components/modals/HoldingDetails';
import FullPageLoader from 'components/widgets/ContentLoaders/FullPageLoading';

const HoldingListing: FC<any> = (): any => {
  const [dataList] = useState(portfolio);
  const [isLoading] = useState(false);

  if (isLoading) return <FullPageLoader />;
  return <Table holdingTableData={dataList} />;
};

const Table: FC<any> = ({ holdingTableData }): any => {
  if (!holdingTableData) return null;
  return (
    <div className="table-responsive mt-3">
      <FlexRow padding="14px 50px">
        <BolderText fontSize="20px" color="color">
          Holdings
        </BolderText>
      </FlexRow>
      <table className="table data-table">
        <thead>
          <tr>
            <th>Exchange</th>
            <th>Currency</th>
            <th>Asset ($)</th>
            <th>Asset (%)</th>
          </tr>
        </thead>
        <tbody>
          {holdingTableData.map(
            (
              { exchangeName, currencies, dollarAssets, percentageAssets }: any,
              index: any
            ): any => {
              return (
                <Fragment key={`holding-book-${index}`}>
                  <TableRow
                    {...{
                      currencies,
                      exchangeName,
                      dollarAssets,
                      percentageAssets,
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
  const { currencies, exchangeName, dollarAssets, percentageAssets } = props;

  const [openHoldingsModal, setOpenHoldingsModal] = useState(false);

  const toggleHoldingsModal = (): void =>
    setOpenHoldingsModal(!openHoldingsModal);

  return (
    <Fragment>
      <HoldingDetails
        currencies={currencies}
        open={openHoldingsModal}
        toggle={toggleHoldingsModal}
      />

      <tr>
        <td>{exchangeName}</td>
        <td className="pointer" onClick={toggleHoldingsModal}>
          <LightText color="#1CE0E2">View all</LightText>
        </td>
        <td>{dollarAssets}</td>
        <td>{percentageAssets}</td>
      </tr>
    </Fragment>
  );
};

export default HoldingListing;
