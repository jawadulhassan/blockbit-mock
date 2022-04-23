import React, { useState, Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

import { apiClient } from 'shared/services/api';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import StorageConstants from 'shared/constants/StorageConstants';
import { loginEndpoint, socialLoginEndpoint } from 'shared/endPoints';
import {
  Image,
  Linked,
  Heading,
  SubWrapper,
  Highlighted,
  MainWrapper,
  ErrorMessage,
  LeftSubWrapper,
  ForgettingLink,
  RightSubWrapper,
  FlexedColumnCentered,
} from 'shared/commonStyles';

import Button from 'components/widgets/Button';
import TextInput from 'components/widgets/TextInput';
import ForgotModal from 'components/modals/ForgetPassword';

import { UnAuthHeader } from '../../Header';

const Login = ({ user, signInWithGoogle, signInWithFacebook }) => {
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();

  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggle = () => setOpen(!open);

  useEffect(() => {
    localStorage.setItem(StorageConstants.AUTH_TOKEN, '');
    localStorage.setItem(StorageConstants.USER_DATA, '');
  }, []);

  useEffect(() => {
    if (!!user) {
      loginWithSocial(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loginWithSocial = (user) => {
    const values = {
      jwt_token: user?.ya,
      name: user?.displayName,
      email: user?.email,
      uid: user?.uid,
    };
    apiClient(null)
      .post(socialLoginEndpoint, values)
      .then((response) => {
        const {
          token,
          user: { id, email, first_name, last_name },
        } = response?.data;
        const newUserData = {
          name: `${first_name ? first_name : ''} ${
            last_name ? last_name : ''
          }`.trim(),
          email: email,
          userId: id,
        };
        localStorage.setItem(StorageConstants.AUTH_TOKEN, token);
        localStorage.setItem(
          StorageConstants.USER_DATA,
          JSON.stringify(newUserData)
        );
        history.push(ROUTE_CONSTANTS.DASHBOARD);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const onSubmit = (values) => {
    setIsSubmitting(true);
    apiClient(null)
      .post(loginEndpoint, values)
      .then((response) => {
        const {
          token,
          user: { id, email, first_name, last_name },
        } = response?.data;
        const newUserData = {
          name: `${first_name ? first_name : ''} ${
            last_name ? last_name : ''
          }`.trim(),
          email: email,
          userId: id,
        };
        localStorage.setItem(StorageConstants.AUTH_TOKEN, token);
        localStorage.setItem(
          StorageConstants.USER_DATA,
          JSON.stringify(newUserData)
        );
        history.push(ROUTE_CONSTANTS.DASHBOARD);
        setIsSubmitting(false);
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.message;
        setIsError(errorMessage);
        setIsSubmitting(false);
      });
  };

  return (
    <Fragment>
      <UnAuthHeader />
      <MainWrapper>
        <SubWrapper>
          <LeftSubWrapper>
            <Image src="/static/svgs/auth_abstract.svg" alt="small-icon" />
          </LeftSubWrapper>
          <RightSubWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Heading>Log in</Heading>
              {!!isError && <ErrorMessage>{isError}</ErrorMessage>}
              <TextInput
                name="email"
                placeholder="Email"
                isError={errors.email}
                register={register({
                  required: 'Required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  },
                })}
              />
              <TextInput
                type="password"
                name="password"
                isError={errors.password}
                placeholder="Password"
                register={register({
                  required: 'Required',
                })}
              />
              <ForgettingLink>
                <Highlighted onClick={toggle}>Forgot password?</Highlighted>
              </ForgettingLink>
              <ForgotModal open={open} toggle={toggle} />
              <FlexedColumnCentered>
                <Button
                  type="submit"
                  icon="arrow.svg"
                  marginTop="15px"
                  disabled={isSubmitting}
                  onClick={handleSubmit(onSubmit)}
                  label={`${isSubmitting ? 'Logging...' : 'Login'}`}
                />
                <Linked>
                  Create a new account ?
                  <Link to={ROUTE_CONSTANTS.REGISTER_USER}>
                    <Highlighted> Sign Up</Highlighted>
                  </Link>
                </Linked>
                {/* <div id="or">OR</div>
                <div id="social">Login with:</div>
                <FlexRow
                  marginTop="20px"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <div onClick={signInWithGoogle} className="google-button" />
                  &nbsp;
                  <div
                    onClick={signInWithFacebook}
                    className="facebook-button"
                  />
                </FlexRow> */}
              </FlexedColumnCentered>
            </form>
          </RightSubWrapper>
        </SubWrapper>
      </MainWrapper>
    </Fragment>
  );
};

export default Login;
