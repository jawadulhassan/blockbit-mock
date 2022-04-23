import React, { useState, Fragment, FC, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { apiClient } from 'shared/services/api';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import StorageConstants from 'shared/constants/StorageConstants';
import { FlexRow, LightText, BolderText } from 'shared/commonStyles';
import { getUserPortfolioHoldingsDetailsEndpoint } from 'shared/endPoints';

import HoldingDetails from 'components/modals/HoldingDetails';
import FullPageLoader from 'components/widgets/ContentLoaders/FullPageLoading';

const HoldingListing: FC<any> = (): any => {
  const history = useHistory();
  const unmounted = useRef(false);

  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect((): any => {
    getAddedHoldingList();
    return (): void => {
      unmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAddedHoldingList(): Promise<void> {
    setIsLoading(true);
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    const clientId = user.userId;
    apiClient(userToken)
      .get(
        `${getUserPortfolioHoldingsDetailsEndpoint}?externalUserId=${clientId}`
      )
      .then((response: any): any => {
        if (!unmounted.current) {
          const list = response?.data?.data?.record;
          setDataList(list);
          setIsLoading(false);
        }
      })
      .catch((err: any): any => {
        if (!unmounted.current) {
          setIsLoading(false);
          if (err?.response?.status === 401) {
            localStorage.setItem(StorageConstants.AUTH_TOKEN, '');
            localStorage.setItem(StorageConstants.USER_DATA, '');
            history.push(ROUTE_CONSTANTS.LOGIN);
          }
        }
      });
  }

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
