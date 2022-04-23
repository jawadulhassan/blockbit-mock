import React, { useState, FC, useEffect, Fragment } from 'react';
import Zoom from 'react-reveal/Zoom';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import { apiClient } from 'shared/services/api';
import { shareBacktestResults } from 'shared/endPoints';
import StorageConstants from 'shared/constants/StorageConstants';
import {
  FlexRow,
  ModalText,
  MainHeader,
  BolderText,
  ErrorMessage,
} from 'shared/commonStyles';

import Button from 'components/widgets/Button';
import TextInput from 'components/widgets/TextInput';

const ShareBacktest: FC<any> = ({ open, toggle, resultID }: any): any => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Modal
      isOpen={open}
      centered={true}
      style={{ maxWidth: '700px', height: '360px', width: '80%' }}
    >
      <ModalHeader className="border-less" toggle={toggle} />
      <ModalBody style={{ padding: '7% 11%' }}>
        {!isSuccess ? (
          <EnterEmail {...{ setIsSuccess, resultID }} />
        ) : (
          <Success toggle={toggle} setIsSuccess={setIsSuccess} />
        )}
      </ModalBody>
    </Modal>
  );
};

export default ShareBacktest;

const Success: FC<any> = ({ toggle, setIsSuccess }: any): any => {
  return (
    <Zoom>
      <div className="modal-body-wrapper">
        <img
          src="/static/svgs/tick.svg"
          alt="icon-successful"
          className="p-2"
        />
        <MainHeader>Success!</MainHeader>
        <FlexRow>
          <BolderText>Backtesting </BolderText>&nbsp;results has been sent to
          your email address.
        </FlexRow>
        <Button
          label="Ok"
          marginTop="15px"
          onClick={() => {
            setIsSuccess(false);
            toggle();
          }}
        />
      </div>
    </Zoom>
  );
};

const EnterEmail: FC<any> = ({ setIsSuccess, resultID }: any): any => {
  const { addToast } = useToasts();
  const { handleSubmit, register, errors } = useForm();

  const [isError, setIsError] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const user = !!userData && JSON.parse(userData);
    setUserEmail(user.email);
  }, []);

  function notificationHandler(content: any, type: any = 'info'): any {
    addToast(content, {
      appearance: type,
      autoDismiss: true,
    });
  }

  const shareResults = (values) => {
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    setIsSubmitting(true);
    apiClient(userToken)
      .get(`${shareBacktestResults}?id=${resultID}&email=${values.email}`)
      .then((): void => {
        setIsSubmitting(false);
        notificationHandler(
          'Backtest results has been sent on your provided email address.',
          'success'
        );
        setIsSuccess(true);
      })
      .catch((err: any): void => {
        const errorMessage = err?.response?.data?.message;
        setIsSubmitting(false);
        setIsError(errorMessage);
        notificationHandler(errorMessage, 'error');
      });
  };

  return (
    <Fragment>
      <div className="modal-body-wrapper">
        <img
          src="/static/svgs/share-icon.svg"
          alt="share-icon"
          className="p-2"
        />
        <MainHeader>Share</MainHeader>
        <ModalText>
          Please enter your email address. We will send you an email to see your
          results.
        </ModalText>
        {!!isError && <ErrorMessage>{isError}</ErrorMessage>}
        <TextInput
          name="email"
          value={userEmail}
          placeholder={`Email`}
          onChange={(event) => setUserEmail(event.target.value)}
          isError={errors.email}
          register={register({
            required: true,
            pattern: {
              message: 'Please enter valid email',
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            },
          })}
        />
        {!!errors?.email?.message && (
          <ErrorMessage>{errors?.email?.message}</ErrorMessage>
        )}
        <Button
          type="submit"
          icon="arrow.svg"
          marginTop="15px"
          disabled={isSubmitting}
          onClick={handleSubmit(shareResults)}
          label={`${isSubmitting ? 'Sending...' : 'Send'}`}
        />
      </div>
    </Fragment>
  );
};
