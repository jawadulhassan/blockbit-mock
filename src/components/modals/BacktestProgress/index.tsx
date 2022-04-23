import React, { useState, useEffect, FC, Fragment } from 'react';
import Zoom from 'react-reveal/Zoom';
import ReactLoading from 'react-loading';
import socketIOClient from 'socket.io-client';
import { useToasts } from 'react-toast-notifications';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import { apiClient } from 'shared/services/api';
import { shareBacktestResults } from 'shared/endPoints';
import { LightText, MainHeader } from 'shared/commonStyles';
import StorageConstants from 'shared/constants/StorageConstants';

import Button from 'components/widgets/Button';

const BacktestProgress: FC<any> = ({ open, setSelectedStep }: any): any => {
  const userData = localStorage.getItem(StorageConstants.USER_DATA);
  const user = !!userData && JSON.parse(userData);
  const ENDPOINT = `http://173.249.36.93:3002/?clientID=${user.userId}`;

  const [progress, setProgress] = useState('');
  const [resultID, setResultID] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect((): void => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('connect', (): void => {
      console.log('Progress Socket Connected');
      socket.emit('notification', `Hello From ${user.name}`);
    });
    socket.on('notifications', (result: any): void => {
      setProgress(result.message);
      if (result.message === '100%') {
        setResultID(result.additionalInfo);
        setIsSuccess(true);
      }
    });
    socket.on('disconnect', (): void => {
      console.log('Progress Socket Disconnected');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ENDPOINT, user]);

  return (
    <Modal
      isOpen={open}
      centered={true}
      style={{ maxWidth: '700px', width: '80%' }}
    >
      <ModalHeader
        className="border-less"
        toggle={(): any => setSelectedStep(1)}
      />
      <ModalBody style={{ padding: '7% 11%' }}>
        {isSuccess ? (
          <Success
            resultID={resultID}
            userEmail={user?.email}
            setSelectedStep={setSelectedStep}
          />
        ) : (
          <Progress progress={progress} />
        )}
      </ModalBody>
    </Modal>
  );
};

export default BacktestProgress;

const Progress: FC<any> = ({ progress }: any): any => {
  return (
    <Zoom>
      <div className="modal-body-wrapper">
        {progress === 99 ? (
          <Fragment>
            <img
              src="/static/svgs/tick.svg"
              alt="icon-successful"
              className="p-2"
            />
            <MainHeader>Results!</MainHeader>
            Complete ... 100%
          </Fragment>
        ) : (
          <Fragment>
            <ReactLoading
              type="spinningBubbles"
              color="#1CE0E2"
              height={50}
              width={50}
            />
            <MainHeader>Results!</MainHeader>
            <LightText>{`Progress ... ${progress}`}</LightText>
          </Fragment>
        )}
      </div>
    </Zoom>
  );
};

const Success: FC<any> = ({
  resultID,
  userEmail,
  setSelectedStep,
}: any): any => {
  const { addToast } = useToasts();

  useEffect(() => {
    shareResults(resultID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultID]);

  const shareResults = (id) => {
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    apiClient(userToken)
      .get(`${shareBacktestResults}?id=${id}&email=${user.email}`)
      .then((): void => {
        notificationHandler(
          'Backtest results has been sent on your provided email address.',
          'success'
        );
      })
      .catch((err: any): void => {
        const errorMessage = err?.response?.data?.message;
        notificationHandler(errorMessage, 'error');
      });
  };

  function notificationHandler(content: any, type: any = 'info'): any {
    addToast(content, {
      appearance: type,
      autoDismiss: true,
    });
  }

  return (
    <Zoom>
      <div className="modal-body-wrapper">
        <img
          src="/static/svgs/letter-icon.svg"
          alt="icon-letter"
          className="p-2"
        />
        <LightText textAlign="center">
          We will send&nbsp;<strong>results</strong>&nbsp;on your&nbsp;
          <strong>{userEmail}</strong>&nbsp;email address.
        </LightText>
        <Button
          label="Ok"
          marginTop="15px"
          onClick={(): any => setSelectedStep(1)}
        />
      </div>
    </Zoom>
  );
};
