import React, { Fragment, FC } from 'react';

import HistoryItem from 'components/widgets/HistoryItem';

const Grid: FC<any> = (props: any): any => {
  const { historyTableData, getBotHistoryList } = props;
  return (
    <div className="flexed-wrapped">
      {historyTableData.map(
        (
          {
            name,
            market,
            exchange,
            profitLoss,
            investment,
            daysRunning,
            tradingStrategy,
            algoTradingPlanID,
          }: any,
          index: any
        ): any => {
          return (
            <Fragment key={`order-book-${index}`}>
              <HistoryItem
                index={index}
                botName={name}
                market={market}
                days={daysRunning}
                trade={profitLoss}
                exchange={exchange}
                investment={investment}
                strategy={tradingStrategy}
                getBotHistoryList={getBotHistoryList}
                algoTradingPlanID={algoTradingPlanID}
              />
            </Fragment>
          );
        }
      )}
    </div>
  );
};

export default Grid;
