import React, { useState, FC, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import StorageConstants from 'shared/constants/StorageConstants';
import { FirebaseAuthProvider } from 'shared/contexts/firebaseContext';

import Dashboard from 'containers/Dashboard';
import { AuthHeader } from 'components/views/Header';
import ErrorBoundary from 'components/widgets/ErrorBoundary';

const DashboardHandler: FC<any> = ({ signOut, user: authUser }: any): any => {
  const userData = localStorage.getItem(StorageConstants.USER_DATA);
  const { userId } = !!userData && JSON.parse(userData);
  const ENDPOINT = `http://173.249.36.93:3002/?clientID=${userId}`;

  const history = useHistory();
  const { addToast, removeAllToasts } = useToasts();

  const [user, setUser] = useState('');
  const [didMount, setDidMount] = useState(false);
  const [selectedTab, setSelectedTab] = useState('settings');

  function notificationHandler(content: any, type: any = 'info'): any {
    addToast(content, {
      appearance: type,
      autoDismiss: true,
    });
  }

  useEffect((): void => {
    const socket = socketIOClient(ENDPOINT);
    socket.removeAllListeners();
    socket.on('connect', (): void => {
      console.log('Notification Socket Connected.');
      socket.emit('notification', `Hello From Notification Socket`);
    });
    socket.on(
      'notifications',
      async (result: any): Promise<any> => {
        removeAllToasts();
        notificationHandler(result?.message, 'info');
      }
    );

    socket.on('disconnect', (): void => {
      socket.removeAllListeners('notifications');
      socket.removeAllListeners('disconnect');
      console.log('Notification Socket Disconnected');
    });
  });

  useEffect((): any => {
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    if (!userData) {
      history.push(ROUTE_CONSTANTS.LOGIN);
    }
    setUser(userData && JSON.parse(userData));
    setDidMount(true);
    return (): void => setDidMount(false);
  }, [history]);

  if (!didMount) {
    return null;
  }

  return (
    <ErrorBoundary>
      <FirebaseAuthProvider value={{ signOut, user: authUser }}>
        <AuthHeader user={user} selectedTab={selectedTab} />
        <Dashboard selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </FirebaseAuthProvider>
    </ErrorBoundary>
  );
};

export default DashboardHandler;
