import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import {
  Image,
  Heading,
  SubWrapper,
  MainWrapper,
  LeftSubWrapper,
  RightSubWrapper,
  LightText,
} from 'shared/commonStyles';
// import {
//   verifyEmailEndpoint,
//   resendEmailEndpoint,
// } from 'shared/endPoints';

import Button from 'components/widgets/Button';

import { UnAuthHeader } from '../../Header';

//TODO: Replace the static call with Service one.

function VerifiedUser(props) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const queryString = require('query-string');
    const parsed = queryString.parse(props.location.search);
    setToken(parsed.token);
  }, [props]);

  if (!token) return null;
  return <MainHandler {...{ token }} />;
}

function MainHandler({ token }) {
  const [userEmail, setUserEmail] = useState('');
  const [isResendEmail, setIsResendEmail] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);

  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  useEffect(() => {
    axios
      .put('https://api.blockbit.ideofuzion.com/verify', null, config)
      .then((response) => {
        setUserEmail(response.email);
        setIsUserVerified(true);
      })
      .catch((err) => {
        setUserEmail(err?.response?.data?.email);
      });
  }, [config]);

  function ResendEmail() {
    axios
      .post(
        'https://api.blockbit.ideofuzion.com/verify/resend',
        { email: userEmail },
        config
      )
      .then(() => {
        console.log('Re-sent!');
        setIsResendEmail(true);
      });
  }

  if (isUserVerified) {
    return (
      <Fragment>
        <UnAuthHeader />
        <MainWrapper>
          <SubWrapper>
            <LeftSubWrapper>
              <Image src="/static/svgs/auth_abstract.svg" alt="small-icon" />
            </LeftSubWrapper>
            <RightSubWrapper>
              <Heading>Ready? Go!</Heading>
              <LightText>
                <strong>Welcome to BlockBit!</strong>&nbsp;you are now a part of
                the <strong>Automated Crypto Trading Platform.</strong>
              </LightText>
              <Link to="/login">
                <Button marginTop="26px" label="Go to Login" icon="arrow.svg" />
              </Link>
            </RightSubWrapper>
          </SubWrapper>
        </MainWrapper>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <UnAuthHeader />
      <MainWrapper>
        <SubWrapper>
          <LeftSubWrapper>
            <Image src="/static/svgs/auth_abstract.svg" alt="small-icon" />
          </LeftSubWrapper>
          <RightSubWrapper>
            <Heading>
              Please Check your email box to verify user account.
            </Heading>
            {!!isResendEmail && <p>Email has been sent successfully.</p>}
            <p>Your account has been verified. </p>
            <Button
              marginTop="26px"
              label="Re-send Email"
              icon="arrow.svg"
              onClick={ResendEmail}
            />
          </RightSubWrapper>
        </SubWrapper>
      </MainWrapper>
    </Fragment>
  );
}

export default VerifiedUser;
