import React, { FC, Fragment, useState } from 'react';

import { apiClient } from 'shared/services/api';
import StorageConstants from 'shared/constants/StorageConstants';
import {
  InlineItems,
  UserPicture,
  SecondarySmallButton,
} from 'shared/commonStyles';
import {
  profilePhotoEndpoint,
  uploadUserProfilePhotoEndpoint,
  deleteUserProfilePhotoEndpoint,
} from 'shared/endPoints';

import Toast from 'components/widgets/Toast';
import Button from 'components/widgets/Button';

const ProfileComponent: FC<any> = (): any => {
  const [photoSrc, setPhotoSrc] = useState(
    () => localStorage.getItem(StorageConstants.USER_PHOTO) || ''
  );
  const [openProfileInfoUpdate, setOpenProfileInfoUpdate] = useState(false);
  const [toast, setToast] = useState({
    status: true,
    text: '',
    head: '',
  });

  const upload = (): void => {
    document.getElementById('upload-input')?.click();
  };

  const toggleProfileInfoUpdate = (): void => {
    setOpenProfileInfoUpdate(!openProfileInfoUpdate);
  };

  const submitPhoto = (event: any): void => {
    const data = new FormData();
    data.append('image', event.target.files[0], event.target.files[0].name);
    data.append('name', event.target.files[0].name);

    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    apiClient(userToken)
      .post(uploadUserProfilePhotoEndpoint, data)
      .then((response: any): void => {
        toggleProfileInfoUpdate();
        setPhotoSrc(response.data.data);
        setToast({
          status: true,
          text: 'Profile Photo Uploaded Successfully',
          head: 'Success',
        });
        getProfilePhoto();
      })
      .catch((err: any): void => {
        toggleProfileInfoUpdate();
        setToast({
          status: false,
          text: err.response.data.message,
          head: 'Failed',
        });
      });
  };

  const deletePhoto = (): void => {
    const userData = localStorage.getItem(StorageConstants.USER_DATA);
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    const user = !!userData && JSON.parse(userData);
    const clientID = user.userId;
    apiClient(userToken)
      .delete(deleteUserProfilePhotoEndpoint, {
        id: clientID,
      })
      .then((): void => {
        toggleProfileInfoUpdate();
        setPhotoSrc('');
        setToast({
          status: true,
          text: 'Profile Photo Deleted Successfully',
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
  };

  const getProfilePhoto = (): void => {
    const userToken = localStorage.getItem(StorageConstants.AUTH_TOKEN);
    apiClient(userToken)
      .get(profilePhotoEndpoint)
      .then((response: any): void => {
        if (response?.data?.data) {
          setPhotoSrc(response.data.data);
          localStorage.setItem(StorageConstants.USER_PHOTO, response.data.data);
        }
      })
      .catch((): void => {});
  };

  return (
    <Fragment>
      <Toast
        heading={toast.head}
        text={toast.text}
        open={openProfileInfoUpdate}
        icon={toast.status ? 'tick' : 'failed'}
        toggle={toggleProfileInfoUpdate}
      />
      <InlineItems justify="center" top="30px">
        <UserPicture
          width="220px"
          height="220px"
          onClick={upload}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'static/svgs/avataaars.svg';
          }}
          src={photoSrc || 'static/svgs/avataaars.svg'}
        />
        <input
          type="file"
          id="upload-input"
          style={{ display: 'none' }}
          onChange={(event: any): void => submitPhoto(event)}
        />
      </InlineItems>
      <InlineItems justify="center" top="20px">
        <Button
          label="Upload"
          onClick={upload}
          icon="upload.svg"
          marginRight="15px"
        />
        <SecondarySmallButton
          borderColor="red"
          textColor="red"
          onClick={deletePhoto}
        >
          Remove
          <img src="/static/svgs/delete.svg" alt="icon-Profile-delete" />
        </SecondarySmallButton>
      </InlineItems>
    </Fragment>
  );
};

export default ProfileComponent;
