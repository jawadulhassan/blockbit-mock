import React, { FC, Fragment, useState } from 'react';

import {
  InlineItems,
  UserPicture,
  SecondarySmallButton,
} from 'shared/commonStyles';

import Toast from 'components/widgets/Toast';
import Button from 'components/widgets/Button';

const ProfileComponent: FC<any> = (): any => {
  const [openProfileInfoUpdate, setOpenProfileInfoUpdate] = useState(false);
  const [toast] = useState({
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
          src="static/svgs/avataaars.svg"
        />
        <input type="file" id="upload-input" style={{ display: 'none' }} />
      </InlineItems>
      <InlineItems justify="center" top="20px">
        <Button
          label="Upload"
          onClick={upload}
          icon="upload.svg"
          marginRight="15px"
        />
        <SecondarySmallButton borderColor="red" textColor="red">
          Remove
          <img src="/static/svgs/delete.svg" alt="icon-Profile-delete" />
        </SecondarySmallButton>
      </InlineItems>
    </Fragment>
  );
};

export default ProfileComponent;
