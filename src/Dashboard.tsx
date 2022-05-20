import React, { FC, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import Dashboard from 'containers/Dashboard';

import { AuthHeader } from 'components/views/Header';
import ErrorBoundary from 'components/widgets/ErrorBoundary';

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const DashboardHandler: FC<any> = (): any => {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  return (
    <ErrorBoundary>
      <Mobile>
        <div className="is-error">Not mobile (desktop or laptop or tablet)</div>
      </Mobile>
      <Default>
        <AuthHeader selectedTab={selectedTab} />
        <Dashboard selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </Default>
    </ErrorBoundary>
  );
};

export default DashboardHandler;
