import React, { FC, useState } from 'react';

import Dashboard from 'containers/Dashboard';

import { AuthHeader } from 'components/views/Header';
// import ErrorBoundary from 'components/widgets/ErrorBoundary';

const DashboardHandler: FC<any> = (): any => {
  const [selectedTab, setSelectedTab] = useState('exchanges');
  return (
    <>
      <AuthHeader selectedTab={selectedTab} />
      <Dashboard selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </>
  );
};

export default DashboardHandler;
