import React, { useState, Fragment, FC } from 'react';
import Zoom from 'react-reveal/Zoom';
import { useForm } from 'react-hook-form';
import capitalize from 'lodash/capitalize';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import PasswordStrengthBar from 'react-password-strength-bar';

import { apiClient } from 'shared/services/api';
import {
  resetCodeEndpoint,
  resetPasswordEndpoint,
  forgetPasswordEndpoint,
} from 'shared/endPoints';
import {
  Resend,
  ModalText,
  FlexedRow,
  MainHeader,
  FlexedFixer,
  Highlighted,
  ShowPassword,
  ErrorMessage,
} from 'shared/commonStyles';

import Button from 'components/widgets/Button';
import TextInput from 'components/widgets/TextInput';

const EnterEmail: FC<any> = ({
  toggle,
  setUserEmail,
  setDisplayStep,
}: any): any => {
  const { handleSubmit, register, errors } = useForm();

  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values: any): void => {
    setIsSubmitting(true);
    apiClient(null)
      .post(forgetPasswordEndpoint, values)
      .then((): void => {
        setDisplayStep(2);
        setUserEmail(values.email);
        setIsSubmitting(false);
      })
      .catch((err: any): void => {
        const errorMessage = err.response.data.message;
        setIsError(errorMessage);
        setIsSubmitting(false);
      });
  };

  return (
    <Fragment>
      <ModalHeader
        style={{
          border: 'none',
        }}
        toggle={(): void => {
          toggle();
          setDisplayStep(1);
        }}
      />
      <ModalBody className="modal-adjustment">
        <MainHeader>Forgot Password</MainHeader>
        <ModalText>
          Please enter your email address. We will send you and email to reset
          your password.
          {!!isError && <ErrorMessage>{isError}</ErrorMessage>}
          <TextInput
            isError={errors.email}
            width="70%"
            name="email"
            placeholder="Email"
            register={register({
              required: true,
              pattern: {
                message: 'Please enter valid email',
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              },
            })}
          />
          <Button
            marginTop="15px"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            label={`${isSubmitting ? 'Sending...' : 'Send'}`}
          />
        </ModalText>
      </ModalBody>
    </Fragment>
  );
};

const EnterCode: FC<any> = ({
  toggle,
  userEmail,
  setDisplayStep,
  setResponseToken,
}: any): any => {
  const { handleSubmit, register, errors } = useForm();

  // const [timer, setTimer] = useState(30);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values: any): void => {
    setIsSubmitting(true);
    const dataObj = {
      ...values,
      email: userEmail,
    };
    apiClient(null)
      .post(resetCodeEndpoint, dataObj)
      .then((response: any): void => {
        setResponseToken(response.data.token);
        setDisplayStep(3);
        setIsSubmitting(false);
      })
      .catch((err: any): void => {
        const errorMessage = err.response.data.message;
        setIsError(errorMessage);
        setIsSubmitting(false);
      });
  };

  //   useEffect(() => {
  //     window.setInterval(() => {
  //         setTimer((time) => time - 1);
  //       }, 1000);
  //     }
  //   }, []);

  return (
    <Zoom>
      <ModalHeader
        style={{ border: 'none' }}
        toggle={(): void => {
          toggle();
          setDisplayStep(1);
        }}
      />
      <img
        className="left-arrow"
        src="/static/svgs/back_arrow.svg"
        alt="icon-back-arrow"
        onClick={(): void => setDisplayStep(1)}
      />
      <ModalBody className="modal-adjustment">
        <MainHeader>Enter Security Code</MainHeader>

        <ModalText>
          <FlexedFixer>
            Please Check your<Highlighted> {userEmail}</Highlighted> email for a
            code.
          </FlexedFixer>
          <TextInput
            isError={errors.code}
            width="80%"
            name="code"
            placeholder="Enter Code"
            register={register({
              required: 'Required',
            })}
          />
          <div className="align-self-start ml-5 mt-1">
            {!!isSubmitting && <Highlighted>Verifying...</Highlighted>}
            {!!isError && (
              <ErrorMessage marginTop="0px">{capitalize(isError)}</ErrorMessage>
            )}
          </div>

          <Resend>
            Didn't get a code?
            {/* <Highlighted>{timer}s</Highlighted> */}
          </Resend>
          <Button
            marginTop="15px"
            icon="arrow.svg"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            label={`${isSubmitting ? 'Continuing...' : 'Continue'}`}
          />
        </ModalText>
      </ModalBody>
    </Zoom>
  );
};

const EnterNewPassword: FC<any> = ({
  toggle,
  responseToken,
  setDisplayStep,
}: any): any => {
  const { handleSubmit, register, errors } = useForm();

  const [isError, setIsError] = useState(false);
  const [passwordState, setPasswordState] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordState, setConfirmPasswordState] = useState('');
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const onSubmit = (values: any): void => {
    setIsSubmitting(true);
    apiClient(responseToken)
      .post(resetPasswordEndpoint, values)
      .then((): void => {
        setDisplayStep(4);
        setIsSubmitting(false);
      })
      .catch((err: any): void => {
        const errorMessage = err.response.data.message;
        setIsError(errorMessage);
        setIsSubmitting(false);
      });
  };

  const toggleNewPasswordVisibility = (): void => {
    setPasswordShown(passwordShown ? false : true);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  };

  const passwordInputAdded =
    confirmPasswordState !== '' && passwordState !== '';
  const passwordDoNotMatches =
    !!passwordInputAdded &&
    confirmPasswordState.length >= passwordState.length &&
    confirmPasswordState !== passwordState;

  return (
    <Zoom>
      <ModalHeader
        style={{
          border: 'none',
        }}
        toggle={(): void => {
          toggle();
          setDisplayStep(1);
        }}
      />
      <ModalBody className="modal-adjustment">
        <MainHeader>Change Password</MainHeader>
        <ModalText>
          {!!isError && <ErrorMessage>{isError}</ErrorMessage>}
          <FlexedRow FlexedWidth={true}>
            <TextInput
              isError={errors.password}
              type={passwordShown ? 'text' : 'password'}
              width="100%"
              name="password"
              onChange={(event: any): void => {
                setPasswordState(event.target.value);
              }}
              placeholder="New Password*"
              register={register({
                required: 'Required',
              })}
            />
            <ShowPassword
              showErrorRequired={errors.password}
              onClick={toggleNewPasswordVisibility}
              src="/static/svgs/show_pass.svg"
              alt="icon-show_password"
            />
          </FlexedRow>
          <div style={{ width: '80%' }}>
            {passwordState !== '' && (
              <div style={{ marginTop: -20 }}>
                <PasswordStrengthBar password={passwordState} />
              </div>
            )}
          </div>

          <FlexedRow FlexedWidth={true}>
            <TextInput
              isError={errors.password_confirmation}
              type={confirmPasswordShown ? 'text' : 'password'}
              width="100%"
              name="password_confirmation"
              onChange={(event: any): void => {
                setConfirmPasswordState(event.target.value);
              }}
              placeholder="Confirm Password"
              register={register({
                required: 'Required',
              })}
            />
            <ShowPassword
              showErrorRequired={errors.password_confirmation}
              onClick={toggleConfirmPasswordVisibility}
              src="/static/svgs/show_pass.svg"
              alt="icon-show_password"
            />
          </FlexedRow>
          {!!passwordDoNotMatches && (
            <ErrorMessage>Passwords do not match.</ErrorMessage>
          )}
          <Button
            marginTop="15px"
            icon="arrow.svg"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            label={`${isSubmitting ? 'Updating...' : 'Update'}`}
          />
        </ModalText>
      </ModalBody>
    </Zoom>
  );
};

const Thanking: FC<any> = ({ toggle }: any): any => {
  return (
    <Zoom>
      <ModalHeader style={{ border: 'none' }} toggle={(): any => toggle()} />
      <ModalBody className="modal-adjustment">
        <ModalText>
          <img
            style={{ paddingBottom: '3%' }}
            src="/static/svgs/tick.svg"
            alt="icon-successful"
          />
          <MainHeader>Success!</MainHeader>
          Your password is successfully updated.
          <Button label="Ok" marginTop="15px" onClick={(): any => toggle()} />
        </ModalText>
      </ModalBody>
    </Zoom>
  );
};

const ForgotModal: FC<any> = ({ open, toggle }: any): any => {
  const [userEmail, setUserEmail] = useState('');
  const [displayStep, setDisplayStep] = useState(1);
  const [responseToken, setResponseToken] = useState('');

  return (
    <Modal isOpen={open} centered={true} style={{ width: '90%' }}>
      <StepHandler
        {...{
          toggle,
          userEmail,
          displayStep,
          setUserEmail,
          responseToken,
          setDisplayStep,
          setResponseToken,
        }}
      />
    </Modal>
  );
};
export default ForgotModal;

const StepHandler: FC<any> = (props: any): any => {
  const {
    toggle,
    userEmail,
    displayStep,
    setUserEmail,
    responseToken,
    setDisplayStep,
    setResponseToken,
  } = props;
  switch (displayStep) {
    case 1:
      return <EnterEmail {...{ setDisplayStep, toggle, setUserEmail }} />;
    case 2:
      return (
        <EnterCode
          {...{ setDisplayStep, toggle, userEmail, setResponseToken }}
        />
      );
    case 3:
      return (
        <EnterNewPassword {...{ setDisplayStep, toggle, responseToken }} />
      );
    case 4:
      return <Thanking {...{ setDisplayStep, toggle }} />;
    default:
      return <EnterEmail {...{ setDisplayStep, toggle }} />;
  }
};
