import React, { Fragment, FC } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import { getExchangeSmallIcon } from 'shared/helpers';
import { BolderText, FlexRow } from 'shared/commonStyles';

import SearchBox from 'components/widgets/SearchBox';

import { BodyWrapper } from './styles.js';

const HoldingDetails: FC<any> = ({ open, toggle, currencies }: any): any => {
  return (
    <Modal isOpen={open} centered={true}>
      <ModalHeader className="border-less" toggle={(): void => toggle()} />
      <ModalBody style={{ padding: 0 }}>
        <BodyWrapper>
          <BolderText fontSize="28px" lineHeight="38px" marginBottom="48px">
            Crypto Holdings
          </BolderText>
          <SearchBox />
          <div className="table-responsive mt-5">
            <table className="table data-table">
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Total</th>
                  <th>Ticker</th>
                  <th>Dollar Price</th>
                </tr>
              </thead>
              <tbody>
                {currencies.map(
                  (
                    { name, total, ticker, dollarPrice }: any,
                    index: any
                  ): any => {
                    return (
                      <Fragment key={`holding-book-${index}`}>
                        <TableRow
                          {...{
                            name,
                            total,
                            ticker,
                            dollarPrice,
                          }}
                        />
                      </Fragment>
                    );
                  }
                )}
                <tr />
              </tbody>
            </table>
          </div>
        </BodyWrapper>
      </ModalBody>
    </Modal>
  );
};

const TableRow: FC<any> = (props: any): any => {
  const { name, total, ticker, dollarPrice } = props;

  return (
    <Fragment>
      <tr>
        <td>
          <FlexRow>
            <img
              src={getExchangeSmallIcon(name)}
              className="exchange-small-icon mr-2"
              alt={`${name}-icon`}
            />
            {name}
          </FlexRow>
        </td>
        <td>{total.toFixed(4)}</td>
        <td>{ticker}</td>
        <td>{`$${dollarPrice.toFixed(4)}`}</td>
      </tr>
    </Fragment>
  );
};

export default HoldingDetails;
