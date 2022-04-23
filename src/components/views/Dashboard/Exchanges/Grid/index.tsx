import React, { Fragment, FC } from 'react';

import GridItem from 'components/widgets/GridItem';

const Grid: FC<any> = (props: any): any => {
  const { tableData, getAddedExchangeList } = props;
  return (
    <div className="flexed-wrapped">
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
          const iconList = marketsList.length > 0 && marketsList.slice(0, 2);
          return (
            <Fragment key={`order-book-${index}`}>
              <GridItem
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
    </div>
  );
};

export default Grid;
