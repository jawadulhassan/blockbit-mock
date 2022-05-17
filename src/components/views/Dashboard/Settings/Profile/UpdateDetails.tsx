import React, { FC, useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';

import {
  FlexRow,
  FlexColumnWrap,
  ColoredTextAligned,
  HorizontalSeparator,
} from 'shared/commonStyles';

import Toast from 'components/widgets/Toast';
import TextInput from 'components/widgets/TextInput';
import PopUpComponent from 'components/modals/Popups';

// TODO: Replace all the form functionality with react-hook-form

const ProfileComponent: FC<any> = (): any => {
  const { register, errors, handleSubmit } = useForm();

  const [email, setEmail] = useState('');
  const [, setOldPass] = useState('');
  const [, setNewPass] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openProfileInfoUpdate, setOpenProfileInfoUpdate] = useState(false);
  const [toast] = useState({
    status: true,
    text: '',
    head: '',
  });

  const toggleEmail = (): void => {
    if (showEmail) {
      console.log('toggleEmail');
    } else {
      setShowEmail(!showEmail);
    }
  };

  const togglePassword = (): void => {
    if (showPass) {
      console.log('userChangePasswordSubmit');
    } else {
      setShowPass(!showPass);
    }
  };

  const toggleDeleteProfilePopup = (): void => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const toggleProfileInfoUpdate = (): void => {
    setOpenProfileInfoUpdate(!openProfileInfoUpdate);
  };

  const submitName = handleSubmit(() => {
    console.log('submitName');
  });

  const KeyPressUserInfo = (event): void => {
    if (event.key === 'Enter') {
      submitName();
    }
  };

  const KeyPressEmail = (event): void => {
    if (event.key === 'Enter') {
      console.log('KeyPressEmail');
    }
  };

  return (
    <Fragment>
      <PopUpComponent
        svg="delete-small"
        buttonColor="#EE101F"
        open={openDeleteModal}
        heading="Delete Profile?"
        buttonTextColor="#FFFFFF"
        onClick={() => console.log('acceptDeleteProfile')}
        buttonText="Delete my profile"
        toggle={toggleDeleteProfilePopup}
        text="Your all trades data wll be permanently erased. We will email you a link shortly. Follow this link to delete your account."
      />
      <Toast
        text={toast.text}
        heading={toast.head}
        open={openProfileInfoUpdate}
        toggle={toggleProfileInfoUpdate}
        icon={toast.status ? 'tick' : 'failed'}
      />
      <TextInput
        name="firstName"
        value={firstName}
        transparent={true}
        placeholder="First Name"
        isError={errors.firstName}
        register={register({ required: 'Required' })}
        onKeyPress={(event): void => KeyPressUserInfo(event)}
        onChange={(event: any): void => {
          setFirstName(event.target.value);
        }}
      />
      <TextInput
        name="lastName"
        value={lastName}
        paddingTop="0px"
        transparent={true}
        placeholder="Last Name"
        isError={errors.lastName}
        register={register({ required: 'Required' })}
        onKeyPress={(event): void => KeyPressUserInfo(event)}
        onChange={(event: any): void => {
          setLastName(event.target.value);
        }}
      />
      <FlexRow>
        <FlexColumnWrap flex={1}>
          <ColoredTextAligned text="left" color="#041F60">
            Email
          </ColoredTextAligned>
        </FlexColumnWrap>
        <FlexColumnWrap flex={1}>
          <ColoredTextAligned
            pointer
            text="right"
            color="#1CE0E2"
            onClick={toggleEmail}
          >
            {!showEmail ? 'Change' : 'Update'}
          </ColoredTextAligned>
        </FlexColumnWrap>
      </FlexRow>
      <FlexRow>
        {!showEmail ? (
          <HorizontalSeparator />
        ) : (
          <TextInput
            name="email"
            value={email}
            paddingTop="0px"
            transparent={true}
            isError={errors.email}
            placeholder="youremail@email.com"
            onKeyPress={(event): void => KeyPressEmail(event)}
            onChange={(event): void => setEmail(event.target.value)}
            register={register({
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
          />
        )}
      </FlexRow>

      <FlexRow>
        <FlexColumnWrap flex={1}>
          <ColoredTextAligned text="left" color="#041F60">
            Password
          </ColoredTextAligned>
        </FlexColumnWrap>
        <FlexColumnWrap flex={1}>
          <ColoredTextAligned
            pointer={true}
            text="right"
            color="#1CE0E2"
            onClick={togglePassword}
          >
            {!showPass ? 'Change' : 'Update'}
          </ColoredTextAligned>
        </FlexColumnWrap>
      </FlexRow>
      <FlexRow>
        {!showPass ? (
          <HorizontalSeparator />
        ) : (
          <>
            <FlexColumnWrap flex={1}>
              <TextInput
                type="password"
                paddingTop="0px"
                name="oldPassword"
                transparent={true}
                placeholder="Old password"
                isError={errors.oldPassword}
                onChange={(event) => setOldPass(event.target.value)}
                register={register({
                  required: 'Required',
                })}
              />
            </FlexColumnWrap>

            <FlexColumnWrap flex={0.2}></FlexColumnWrap>
            <FlexColumnWrap flex={1}>
              <TextInput
                type="password"
                paddingTop="0px"
                transparent={true}
                name="newPassword"
                placeholder="New Password"
                isError={errors.newPassword}
                onChange={(event) => setNewPass(event.target.value)}
                register={register({
                  required: 'Required',
                })}
              />
            </FlexColumnWrap>
          </>
        )}
      </FlexRow>

      <FlexRow>
        <FlexColumnWrap flex={1}>
          <ColoredTextAligned text="left" color="#041F60">
            Delete Profile
          </ColoredTextAligned>
        </FlexColumnWrap>
        <FlexColumnWrap flex={1}>
          <ColoredTextAligned
            pointer
            text="right"
            color="#F33501"
            onClick={toggleDeleteProfilePopup}
          >
            Delete
          </ColoredTextAligned>
        </FlexColumnWrap>
      </FlexRow>
      <FlexRow>
        <HorizontalSeparator />
      </FlexRow>
    </Fragment>
  );
};

export default ProfileComponent;
