import React, { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Label, CustomInput } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';

import { apiClient } from 'shared/services/api';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import StorageConstants from 'shared/constants/StorageConstants';
import { registerEndpoint, socialLoginEndpoint } from 'shared/endPoints';
import {
  Image,
  Linked,
  Heading,
  // FlexRow,
  FlexedRow,
  SubWrapper,
  Highlighted,
  MainWrapper,
  ErrorMessage,
  ShowPassword,
  LeftSubWrapper,
  RightSubWrapper,
  FlexedColumnCentered,
} from 'shared/commonStyles';

import Button from 'components/widgets/Button';
import TextInput from 'components/widgets/TextInput';
import RegistrationSuccess from 'components/modals/RegistrationSuccess';

import { UnAuthHeader } from '../../Header';

const Registration = ({ user, signInWithGoogle, signInWithFacebook }) => {
  const history = useHistory();

  const { handleSubmit, register, errors, reset } = useForm();

  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');
  // const [isRegistered, setIsRegistered] = useState(null);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [passwordState, setPasswordState] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [isWeakPassword, setIsWeakPassword] = useState(false);
  const [confirmPasswordState, setConfirmPasswordState] = useState('');
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  useEffect(() => {
    if (!!user) {
      const values = {
        jwt_token: user?.ya,
        name: user?.displayName,
        email: user?.email,
        uid: user?.uid,
      };
      apiClient(null)
        .post(socialLoginEndpoint, values)
        .then((response) => {
          const newUserData = {
            name: `${response?.data?.user?.first_name}`,
            email: response?.data?.user?.email,
            userId: response?.data?.user?.id,
          };
          localStorage.setItem(
            StorageConstants.AUTH_TOKEN,
            response?.data?.token
          );
          localStorage.setItem(
            StorageConstants.USER_DATA,
            JSON.stringify(newUserData)
          );
          history.push(ROUTE_CONSTANTS.DASHBOARD);
        })
        .catch((error) => {
          console.log({ error });
        });
    }
    // eslint-
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const toggle = () => setOpen(!open);
  const onSubmit = (values) => {
    setIsSubmitting(true);
    setUserFirstName(values.first_name);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    apiClient(userToken)
      .post(registerEndpoint, values)
      .then((response) => {
        // const message = response?.data?.message;
        // setIsRegistered(message);
        setIsSubmitting(false);
        reset({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          password_confirmation: '',
          term_and_condition: true,
        });
        setPasswordState('');
        toggle();
      })
      .catch((err) => {
        const errorMessage = err.response.data.message;
        setIsError(errorMessage);
        setIsSubmitting(false);
      });
  };

  const onTermsToggle = (event) => {
    const { checked } = event.target;
    setTermsAgreed(checked);
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(confirmPasswordShown ? false : true);
  };

  const passwordInputAdded =
    confirmPasswordState !== '' && passwordState !== '';
  const passwordDoNotMatches = !!passwordInputAdded
    ? confirmPasswordState !== passwordState
    : false;

  return (
    <Fragment>
      <UnAuthHeader />
      <MainWrapper>
        <RegistrationSuccess
          open={open}
          toggle={toggle}
          firstName={userFirstName}
        />
        <SubWrapper>
          <LeftSubWrapper>
            <Image src="/static/svgs/auth_abstract.svg" alt="small-icon" />
          </LeftSubWrapper>
          <RightSubWrapper>
            <Heading>Sign Up</Heading>
            {/* {!!isRegistered && <div className="is-success">{isRegistered}</div>} */}
            <FlexedRow>
              <TextInput
                isError={errors.first_name}
                name="first_name"
                width="50%"
                placeholder="First Name*"
                register={register({
                  required: 'Required',
                })}
              />
              <TextInput
                isError={errors.last_name}
                name="last_name"
                width="50%"
                dividerInput={true}
                placeholder="Last Name*"
                register={register({
                  required: 'Required',
                })}
              />
            </FlexedRow>
            <TextInput
              isError={errors.email}
              name="email"
              placeholder="Email*"
              register={register({
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              })}
            />
            <FlexedRow>
              <TextInput
                isError={errors.password}
                type={passwordShown ? 'text' : 'password'}
                name="password"
                onChange={(event) => {
                  setPasswordState(event.target.value);
                }}
                placeholder="Password*"
                register={register({
                  required: 'Required',
                })}
              />
              <ShowPassword
                showErrorRequired={errors.password}
                onClick={togglePasswordVisibility}
                src="/static/svgs/show_pass.svg"
                alt="icon-show_password"
              />
            </FlexedRow>
            {passwordState !== '' && (
              <div style={{ marginTop: -20 }}>
                <PasswordStrengthBar
                  password={passwordState}
                  onChangeScore={(score) => {
                    if (score < 2) {
                      setIsWeakPassword(true);
                    }
                    if (score >= 2) {
                      setIsWeakPassword(false);
                    }
                  }}
                />
              </div>
            )}
            <FlexedRow>
              <TextInput
                isError={errors.password_confirmation}
                type={confirmPasswordShown ? 'text' : 'password'}
                name="password_confirmation"
                onChange={(event) => {
                  setConfirmPasswordState(event.target.value);
                }}
                placeholder="Confirm Password*"
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
            {!!isError && <ErrorMessage>{isError}</ErrorMessage>}
            {!!passwordDoNotMatches && (
              <ErrorMessage>Passwords do not match.</ErrorMessage>
            )}
            <FlexedRow>
              <CustomInput
                name="term_and_condition"
                type="checkbox"
                id="cb-3"
                onChange={(event) => onTermsToggle(event)}
                // innerRef={register()}
              />
              <Label for="term_and_condition" className="checkbox-term">
                &nbsp;I agree to the <Highlighted>Terms of Service</Highlighted>
                " " & <Highlighted>Privacy Policy</Highlighted>" "
              </Label>
            </FlexedRow>
            <FlexedColumnCentered>
              <Button
                marginTop="15px"
                icon="arrow.svg"
                onClick={handleSubmit(onSubmit)}
                disabled={
                  !termsAgreed || isWeakPassword || passwordDoNotMatches
                }
                label={`${isSubmitting ? 'Signing Up...' : 'Sign Up'}`}
              />
              <Linked>
                Already have account?
                <Link to={ROUTE_CONSTANTS.LOGIN}>
                  <Highlighted> Login</Highlighted>
                </Link>
              </Linked>
              {/* <div id="or">OR</div>
              <div id="social">Sign up with:</div>
              <FlexRow
                marginTop="20px"
                alignItems="center"
                justifyContent="space-between"
              >
                <div onClick={signInWithGoogle} className="google-button" />
                &nbsp;
                <div onClick={signInWithFacebook} className="facebook-button" />
              </FlexRow> */}
            </FlexedColumnCentered>
          </RightSubWrapper>
        </SubWrapper>
      </MainWrapper>
    </Fragment>
  );
};

export default Registration;
