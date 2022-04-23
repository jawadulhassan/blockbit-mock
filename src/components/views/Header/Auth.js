import React, { useContext, useState, useEffect } from 'react';
import capitalize from 'lodash/capitalize';
import { Link, useHistory } from 'react-router-dom';

import { apiClient } from 'shared/services/api';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import StorageConstants from 'shared/constants/StorageConstants';
import FirebaseAuthContext from 'shared/contexts/firebaseContext';
import { userNotificationsEndpoint } from 'shared/endPoints';
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

function AuthHeader({ user, selectedTab }) {
  const history = useHistory();
  let firebaseAuth = useContext(FirebaseAuthContext);

  const [notificationList, setNotificationList] = useState([]);
  const [displayNotifications, setDisplayNotifications] = useState(false);
  const [hasUnReadNotifications, setHasUnReadNotifications] = useState(false);

  useEffect(() => {
    getUserNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  const toggleNotifications = () =>
    setDisplayNotifications(!displayNotifications);

  const handleLogout = () => {
    firebaseAuth.signOut();
    return new Promise(function () {
      setTimeout(function () {
        clearAuthData();
      }, 1000);
    });
  };

  const clearAuthData = () => {
    localStorage.setItem(StorageConstants.AUTH_TOKEN, '');
    localStorage.setItem(StorageConstants.USER_DATA, '');
    history.push(ROUTE_CONSTANTS.LOGIN);
  };

  const getUserNotifications = () => {
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    const clientId = user.userId;
    apiClient(userToken)
      .get(`${userNotificationsEndpoint}?externalUserId=${clientId}`)
      .then((response) => {
        const list = response?.data?.data?.records;
        const isUnRead = list?.some((item) => item.isSeen === false);
        setNotificationList(list);
        setHasUnReadNotifications(isUnRead);
      })
      .catch(() => {});
  };

  const userData = localStorage.getItem(StorageConstants.USER_DATA);
  const userName = !!userData && JSON.parse(userData).name;
  const photoSrc = localStorage.getItem(StorageConstants.USER_PHOTO) || '';

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
          src={photoSrc || 'static/svgs/avataaars.svg'}
        />
        <ListOfUsers>{userName}</ListOfUsers>
        <FreeIcon src="static/svgs/free.svg" alt="icon-free" />
        <Button label="Log out" marginLeft="15px" onClick={handleLogout} />
      </AuthFlexContainer>
      {displayNotifications && (
        <Notifications
          notificationList={notificationList}
          toggleNotifications={toggleNotifications}
          displayNotifications={displayNotifications}
          getUserNotifications={getUserNotifications}
        />
      )}
    </AuthHeaderFixed>
  );
}

export default AuthHeader;
