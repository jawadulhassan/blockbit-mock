import React from 'react';

import Bot from 'components/views/Dashboard/Bot';
import Learn from 'components/views/Dashboard/Learn';
import History from 'components/views/Dashboard/History';
import Settings from 'components/views/Dashboard/Settings';
import Exchanges from 'components/views/Dashboard/Exchanges';
import Portfolio from 'components/views/Dashboard/Portfolio';
import BackTesting from 'components/views/Dashboard/BackTesting';
import Dashboard from 'components/views/Dashboard/DashboardPanel';

function TabBodyContent({ selectedTab }) {
  switch (selectedTab) {
    case 'dashboard':
      return <Dashboard />;
    case 'portfolio':
      return <Portfolio />;
    case 'bot':
      return <Bot />;
    case 'exchanges':
      return <Exchanges />;
    case 'history':
      return <History />;
    case 'learn':
      return <Learn />;
    case 'settings':
      return <Settings />;
    case 'backtesting':
      return <BackTesting />;
    default:
      return null;
  }
}

export default TabBodyContent;
