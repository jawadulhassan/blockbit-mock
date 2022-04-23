import React, { FC, useState } from 'react';

import { ScreenWrapper, SettingsWrapper } from 'shared/commonStyles';

import TabNavs from 'components/widgets/TabsNavigation';
import ScreenHeader from 'components/widgets/ScreenHeader';

import UpdatesComp from './Updates';
import ProfileDetails from './Profile';
import NotificationComp from './Notification';
import SubscriptionComponent from './Subscriptions';
import PaymentInfoComp from './Subscriptions/PaymentInfo';

const Settings: FC<{}> = (): any => {
  const [screen, setScreen] = useState('Settings');
  const toggleScreen = (newScreen): void => {
    setScreen(newScreen);
  };

  return (
    <ScreenWrapper>
      <ScreenHeader
        header="Settings"
        subheading={screen === 'Payment' ? 'Payment' : null}
        headingClickHandler={(): any => setScreen('Settings')}
        subheadingClickHandler={(): any => setScreen('Payment')}
      />
      <SettingsWrapper>
        {screen === 'Settings' && (
          <TabNavs
            tabOption={[
              { title: 'Profile Details', comp: <ProfileDetails /> },
              {
                title: 'Subscription',
                comp: <SubscriptionComponent toggleScreen={toggleScreen} />,
              },
              { title: 'Updates', comp: <UpdatesComp /> },
              { title: 'Notifications', comp: <NotificationComp /> },
            ]}
          />
        )}
        {screen === 'Payment' && <PaymentInfoComp />}
      </SettingsWrapper>
    </ScreenWrapper>
  );
};

export default Settings;
