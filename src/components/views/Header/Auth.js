import React, { useState } from 'react';
import capitalize from 'lodash/capitalize';
import { Link } from 'react-router-dom';

import {
  FlexRow,
  FreeIcon,
  LogoWrap,
  Separation,
  ListOfUsers,
  ImageMessage,
  AuthSubHeader,
  AuthHeaderFixed,
  AuthFlexContainer,
} from 'shared/commonStyles';

import Button from 'components/widgets/Button';

import Notifications from '../Notifications';

function AuthHeader({ selectedTab }) {
  const [notificationList, setNotificationList] = useState([]);
  const [displayNotifications, setDisplayNotifications] = useState(false);
  const [hasUnReadNotifications, setHasUnReadNotifications] = useState(false);

  const toggleNotifications = () =>
    setDisplayNotifications(!displayNotifications);

  const handleLogout = () => {
    console.log('Logout!!');
  };

  console.log(setNotificationList, setHasUnReadNotifications);

  return (
    <AuthHeaderFixed>
      <FlexRow alignItems="center">
        <Link to="/">
          <LogoWrap>
            <img src="static/svgs/un_authHeader_logo.svg" alt="icon-logo" />
          </LogoWrap>
        </Link>
        <FlexRow alignItems="center" marginLeft={'80px'}>
          <img src="static/svgs/lines.svg" alt="icon-logo" />
          <AuthSubHeader>{`${capitalize(selectedTab)}`}</AuthSubHeader>
        </FlexRow>
      </FlexRow>

      <AuthFlexContainer>
        {/* <img src="static/svgs/message.svg" alt="icon-message" />
        <Separation /> */}
        <img
          className="pointer"
          alt="icon-notification"
          onClick={toggleNotifications}
          style={{ marginRight: '8px' }}
          src={`static/svgs/${
            hasUnReadNotifications ? 'notification' : 'notification-read'
          }.svg`}
        />
        <Separation />
        <ImageMessage
          width={'40px'}
          height={'40px'}
          alt="icon-user"
          borderRadius={'20px'}
          border={'1px solid transparent'}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'static/svgs/avataaars.svg';
          }}
          src={'static/svgs/avataaars.svg'}
        />
        <ListOfUsers>Jones</ListOfUsers>
        <FreeIcon src="static/svgs/free.svg" alt="icon-free" />
        <Button label="Log out" marginLeft="15px" onClick={handleLogout} />
      </AuthFlexContainer>
      {displayNotifications && (
        <Notifications
          notificationList={notificationList}
          toggleNotifications={toggleNotifications}
          displayNotifications={displayNotifications}
          getUserNotifications={() => console.log('Notification read!!')}
        />
      )}
    </AuthHeaderFixed>
  );
}

export default AuthHeader;
