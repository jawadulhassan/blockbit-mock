import React, { FC } from 'react';

// import DashboardView from '../../components/Dashboard';
import { FlexRow, MainContentWrapper } from 'shared/commonStyles';
import { SelectedTabProvider } from 'shared/contexts/selectedTabContext';

import Aside from './Aside';
import TabBodyContent from './TabBodyContent';

const Dashboard: FC<any> = ({ selectedTab, setSelectedTab }: any): any => {
  return (
    <SelectedTabProvider value={{ setSelectedTab }}>
      <FlexRow>
        <Aside selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <MainContentWrapper>
          <TabBodyContent selectedTab={selectedTab} />
        </MainContentWrapper>
      </FlexRow>
    </SelectedTabProvider>
  );
};

export default Dashboard;
