import React, { useState, FC } from 'react';

import { ScreenWrapper } from 'shared/commonStyles';

import New from './New';
import Home from './Home';
import Results from './Results';

const StepHandler: FC<any> = (props: any): any => {
  const { userQuota, selectedStep, setUserQuota, setSelectedStep } = props;
  switch (selectedStep) {
    case 1:
      return (
        <Home
          {...{
            userQuota,
            setUserQuota,
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
  const [userQuota, setUserQuota] = useState({
    usedTests: 0,
    availableTests: 0,
    allowedMaxTests: 0,
  });
  return (
    <ScreenWrapper>
      <StepHandler
        {...{
          userQuota,
          selectedStep,
          setUserQuota,
          setSelectedStep,
        }}
      />
    </ScreenWrapper>
  );
};

export default BackTesting;
