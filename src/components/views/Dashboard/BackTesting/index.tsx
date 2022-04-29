import React, { useState, FC } from 'react';

import { ScreenWrapper } from 'shared/commonStyles';

import New from './New';
import Home from './Home';
import Results from './Results';

const StepHandler: FC<any> = (props: any): any => {
  const { userQuota, selectedStep, setSelectedStep } = props;
  switch (selectedStep) {
    case 1:
      return (
        <Home
          {...{
            userQuota,
            setSelectedStep,
          }}
        />
      );
    case 2:
      return <New {...{ setSelectedStep, selectedStep, userQuota }} />;
    case 3:
      return <Results />;
    default:
      return <Home />;
  }
};

const BackTesting: FC<{}> = (): any => {
  const [selectedStep, setSelectedStep] = useState(1);
  const [userQuota] = useState({
    usedTests: 5,
    availableTests: 15,
    allowedMaxTests: 10,
  });
  return (
    <ScreenWrapper>
      <StepHandler
        {...{
          userQuota,
          selectedStep,
          setSelectedStep,
        }}
      />
    </ScreenWrapper>
  );
};

export default BackTesting;
