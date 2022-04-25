import React, { FC, useState } from 'react';

import Dashboard from 'containers/Dashboard';
import ErrorBoundary from 'components/widgets/ErrorBoundary';

const DashboardHandler: FC<any> = (): any => {
  const [selectedTab, setSelectedTab] = useState('backtesting'); 
  return (
    <ErrorBoundary>
      <Dashboard  selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
    </ErrorBoundary>
  );
};

export default DashboardHandler;
