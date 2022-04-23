import React, { Fragment, FC } from 'react';

import BotItem from 'components/widgets/BotItem';

const Grid: FC<any> = (props: any): any => {
  const {
    botTableData,
    setSelectedBot,
    getAddedBotList,
    setSelectedStep,
  } = props;
  return (
    <div className="flexed-wrapped">
      {botTableData.map(
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
              <BotItem
                index={index}
                botName={name}
                market={market}
                days={daysRunning}
                trade={profitLoss}
                exchange={exchange}
                investment={investment}
                strategy={tradingStrategy}
                setSelectedBot={setSelectedBot}
                getAddedBotList={getAddedBotList}
                setSelectedStep={setSelectedStep}
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
