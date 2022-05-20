import React, { useState, useEffect, Fragment } from 'react';

import Dashboard from 'containers/Dashboard';

import { AuthHeader } from 'components/views/Header';
import ErrorBoundary from 'components/widgets/ErrorBoundary';

const DashboardHandler = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };
  console.log({ width });
  return (
    <ErrorBoundary>
      {width <= 786 ? (
        <div className="is-error">Not mobile (desktop or laptop or tablet)</div>
      ) : (
        <Fragment>
          <AuthHeader selectedTab={selectedTab} />
          <Dashboard
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </Fragment>
      )}
    </ErrorBoundary>
  );
};

export default DashboardHandler;
