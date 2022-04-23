import React, { useState, FC } from 'react';

import { ScreenWrapper } from 'shared/commonStyles';

import NewBot from './New';
import Details from './Details';
import Listing from './Listing';

const StepHandler: FC<any> = (props: any): any => {
  const {
    selectedBot,
    selectedStep,
    isWelcomeOpen,
    selectedMarket,
    setSelectedBot,
    setSelectedStep,
    setIsWelcomeOpen,
    setSelectedMarket,
  } = props;
  switch (selectedStep) {
    case 1:
      return (
        <Listing
          selectedStep={selectedStep}
          isWelcomeOpen={isWelcomeOpen}
          setSelectedBot={setSelectedBot}
          setSelectedStep={setSelectedStep}
          setIsWelcomeOpen={setIsWelcomeOpen}
        />
      );
    case 2:
      return (
        <NewBot
          selectedMarket={selectedMarket}
          setSelectedStep={setSelectedStep}
          setSelectedMarket={setSelectedMarket}
        />
      );
    case 3:
      return (
        <Details
          selectedBot={selectedBot}
          selectedMarket={selectedMarket}
          setSelectedStep={setSelectedStep}
        />
      );
    default:
      return (
        <Listing
          isWelcomeOpen={isWelcomeOpen}
          setSelectedStep={setSelectedStep}
          setIsWelcomeOpen={setIsWelcomeOpen}
        />
      );
  }
};

const Bot: FC<{}> = (): any => {
  const [selectedStep, setSelectedStep] = useState(1);
  const [selectedBot, setSelectedBot] = useState(null);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState('BTCUSDT');

  return (
    <ScreenWrapper>
      <StepHandler
        selectedBot={selectedBot}
        selectedStep={selectedStep}
        isWelcomeOpen={isWelcomeOpen}
        setSelectedBot={setSelectedBot}
        selectedMarket={selectedMarket}
        setSelectedStep={setSelectedStep}
        setIsWelcomeOpen={setIsWelcomeOpen}
        setSelectedMarket={setSelectedMarket}
      />
    </ScreenWrapper>
  );
};

export default Bot;
