import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, Link } from 'react-router-dom';

import { apiClient } from 'shared/services/api';
import { changePasswordEndpoint } from 'shared/endPoints';
import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import StorageConstants from 'shared/constants/StorageConstants';
import {
  Image,
  Linked,
  Heading,
  SubWrapper,
  MainWrapper,
  FormWrapper,
  ErrorMessage,
  LeftSubWrapper,
  RightSubWrapper,
} from 'shared/commonStyles';

import Button from 'components/widgets/Button';
import TextInput from 'components/widgets/TextInput';

function ChangePassword() {
  const { handleSubmit, register, errors } = useForm();

  const [isError, setIsError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values) => {
    setIsSubmitting(true);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    apiClient(userToken)
      .post(changePasswordEndpoint, values)
      .then((response) => {
        console.log({ response });
        setIsSuccess(true);
        setIsSubmitting(false);
      })
      .catch((err) => {
        const errorMessage = err.response.data.message;
        setIsError(errorMessage);
        setIsSubmitting(false);
      });
  };

  if (isSuccess) {
    return <Redirect to={ROUTE_CONSTANTS.LOGIN} />;
  }
  return (
    <MainWrapper>
      <SubWrapper>
        <LeftSubWrapper>
          <Heading>Change Password</Heading>
          {!!isError && <ErrorMessage>{isError}</ErrorMessage>}
          <FormWrapper>
            <TextInput
              iconProp="lock"
              type="currentPassword"
              name="currentPassword"
              placeholder="Current Password*"
              ref={register({
                required: 'Required',
              })}
            />
            {errors.currentPassword && 'Current Password is required'}

            <TextInput
              iconProp="lock"
              type="newPassword"
              name="newPassword"
              placeholder="New Password*"
              ref={register({
                required: 'Required',
              })}
            />
            {errors.newPassword && 'New Password is required'}

            <TextInput
              iconProp="lock"
              type="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password*"
              ref={register({
                required: 'Required',
              })}
            />
            {errors.confirmPassword && 'Confirm Password is required'}
            <Button
              marginTop="15px"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              label={`${isSubmitting ? 'Updating...' : 'Update'}`}
            />
          </FormWrapper>
          <Linked>
            <Link to={ROUTE_CONSTANTS.LOGIN}>Login</Link>
          </Linked>
        </LeftSubWrapper>
        <RightSubWrapper>
          <Image src="/static/photos/login-screen.PNG" alt="small-icon" />
        </RightSubWrapper>
      </SubWrapper>
    </MainWrapper>
  );
}

export default ChangePassword;
