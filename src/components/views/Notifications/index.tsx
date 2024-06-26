import React, { useEffect, useRef } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import useOutsideClick from '../../widgets/Hooks/useOutsideClick';

import {
  Text,
  HeaderBar,
  HeaderLabel,
  MainContent,
  MainWrapper,
  HeaderContent,
  NotificationDate,
  IndividualNotification,
} from './notificationsStyles';

interface INotification {
  id: number;
  messageText: string;
  createdUnixTimeStamp: Date;
}

interface IProps {
  notificationList: Array<INotification>;
  toggleNotifications: () => {};
  getUserNotifications: () => {};
  displayNotifications: boolean;
}

const Notifications: React.FC<IProps> = ({
  notificationList,
  toggleNotifications,
  displayNotifications,
  getUserNotifications,
}) => {
  const ref = useRef();
  const unmounted = useRef(false);

  useEffect(() => {
    readAllNotifications();
    return (): void => {
      unmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useOutsideClick(ref, () => {
    if (displayNotifications) {
      toggleNotifications();
    }
  });

  const timeDistance = (time) => {
    // return formatDistanceToNow(new Date(time * 1000), {
    return formatDistanceToNow(new Date(time), {
      addSuffix: true,
    });
  };

  const readAllNotifications = (): void => {
    const clientID = 7;
    const requestBody = {
      externalUserId: clientID,
    };

    console.log({ requestBody });
  };

  return (
    <MainWrapper ref={ref}>
      <HeaderBar>
        <HeaderContent>
          <HeaderLabel>Notifications</HeaderLabel>
          <img
            src="/static/svgs/close.svg"
            onClick={toggleNotifications}
            alt="close-icon"
            style={{
              cursor: 'pointer',
              padding: '10px 29px',
              justifyContent: 'flex-end',
            }}
          />
        </HeaderContent>
      </HeaderBar>
      <MainContent>
        {notificationList.map((item) => (
          <IndividualNotification key={item.id}>
            <Text>{item.messageText}</Text>
            <NotificationDate>
              {timeDistance(item.createdUnixTimeStamp)}
            </NotificationDate>
          </IndividualNotification>
        ))}
      </MainContent>
    </MainWrapper>
  );
};

export default Notifications;
