import React, { FC, useEffect, useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { apiClient } from 'shared/services/api';
import {
  FlexRow,
  FlexColumnWrap,
  ColoredTextAligned,
  HorizontalSeparator,
} from 'shared/commonStyles';
import {
  deleteUserEndpoint,
  changePasswordEndpoint,
  updateUserInfoEndpoint,
  updateUserEmailEndpoint,
} from 'shared/endPoints';

import Toast from 'components/widgets/Toast';
import TextInput from 'components/widgets/TextInput';
import PopUpComponent from 'components/modals/Popups';
import StorageConstants from 'shared/constants/StorageConstants';

// TODO: Replace all the form functionality with react-hook-form

const ProfileComponent: FC<any> = (): any => {
  const { register, errors, handleSubmit } = useForm();

  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openProfileInfoUpdate, setOpenProfileInfoUpdate] = useState(false);
  const [toast, setToast] = useState({
    status: true,
    text: '',
    head: '',
  });

  const toggleEmail = (): void => {
    if (showEmail) {
      userEmailSubmit();
    } else {
      setShowEmail(!showEmail);
    }
  };

  const togglePassword = (): void => {
    if (showPass) {
      userChangePasswordSubmit();
    } else {
      setShowPass(!showPass);
    }
  };

  const toggleDeleteProfilePopup = (): void => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const acceptDeleteProfile = (): void => {
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    apiClient(userToken)
      .delete(deleteUserEndpoint, {
        id: JSON.parse(userId),
      })
      .then((): void => {
        toggleDeleteProfilePopup();
        toggleProfileInfoUpdate();
        setToast({
          status: true,
          text: 'Profile Deleted Successfully',
          head: 'Success',
        });
      })
      .catch((err: any): void => {
        toggleDeleteProfilePopup();
        toggleProfileInfoUpdate();
        setToast({
          status: false,
          text: err.response.data.message,
          head: 'Failed',
        });
      });
  };

  const toggleProfileInfoUpdate = (): void => {
    setOpenProfileInfoUpdate(!openProfileInfoUpdate);
  };

  useEffect(() => {
    const user_data: any = localStorage.getItem(StorageConstants.USER_DATA);
    const user_id = JSON.parse(user_data).userId;
    const fname: any = JSON.parse(user_data).name;
    const email: any = JSON.parse(user_data).email;
    setFirstName(fname.split(' ')[0]);
    setLastName(fname.split(' ')[1]);
    setUserId(user_id);
    setEmail(email);
  }, []);

  const submitUserInfo = (): void => {
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    apiClient(userToken)
      .post(updateUserInfoEndpoint, {
        first_name: firstName,
        last_name: lastName,
      })
      .then((): void => {
        toggleProfileInfoUpdate();
        const newUserData = {
          name: `${firstName ? firstName : ''} ${
            lastName ? lastName : ''
          }`.trim(),
          email: email,
          userId: userId,
        };
        localStorage.setItem(
          StorageConstants.USER_DATA,
          JSON.stringify(newUserData)
        );
        setToast({
          status: true,
          text: 'Profile Info Updated Successfully',
          head: 'Success',
        });
      })
      .catch((): void => {
        toggleProfileInfoUpdate();
        setToast({
          status: false,
          text: 'Profile Info Could not be Updated',
          head: 'Failed',
        });
      });
  };

  const submitName = handleSubmit(() => {
    submitUserInfo();
  });

  const KeyPressUserInfo = (event): void => {
    if (event.key === 'Enter') {
      submitName();
    }
  };

  const KeyPressEmail = (event): void => {
    if (event.key === 'Enter') {
      userEmailSubmit();
    }
  };

  const userEmailSubmit = handleSubmit((): void => {
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    apiClient(userToken)
      .post(updateUserEmailEndpoint, email)
      .then((): void => {
        toggleProfileInfoUpdate();
        setShowEmail(!showEmail);
        setEmail('');
        setToast({
          status: true,
          text: 'Email Updated Successfully',
          head: 'Success',
        });
      })
      .catch((): void => {
        toggleProfileInfoUpdate();
        setToast({
          status: false,
          text: 'Email Could not be Updated',
          head: 'Failed',
        });
      });
  });

  const userChangePasswordSubmit = handleSubmit((): void => {
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    apiClient(userToken)
      .post(changePasswordEndpoint, {
        old_password: oldPass,
        password: newPass,
        password_confirmation: newPass,
      })
      .then((): void => {
        toggleProfileInfoUpdate();
        setShowPass(!showPass);
        setEmail('');
        setToast({
          status: true,
          text: 'Password Changed Successfully',
          head: 'Success',
        });
      })
      .catch((err: any): void => {
        toggleProfileInfoUpdate();
        setToast({
          status: false,
          text: err.response.data.message,
          head: 'Failed',
        });
      });
  });

  return (
    <Fragment>
      <PopUpComponent
        svg="delete-small"
        buttonColor="#EE101F"
        open={openDeleteModal}
        heading="Delete Profile?"
        buttonTextColor="#FFFFFF"
        onClick={acceptDeleteProfile}
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
