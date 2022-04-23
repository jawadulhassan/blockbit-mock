import React, { FC, Fragment } from 'react';

import {
  FlexRow,
  FlexColumnWrap,
  LeftAlignedContainer,
} from 'shared/commonStyles';

import ProfileImageComponent from './Image';
import UserInfoComponent from './UpdateDetails';

const ProfileComponent: FC<any> = (): any => {
  return (
    <Fragment>
      <FlexRow>
        <FlexColumnWrap flex={3}>
          <LeftAlignedContainer>
            <UserInfoComponent />
          </LeftAlignedContainer>
        </FlexColumnWrap>
        <FlexColumnWrap flex={2}>
          <LeftAlignedContainer>
            <ProfileImageComponent />
          </LeftAlignedContainer>
        </FlexColumnWrap>
      </FlexRow>
    </Fragment>
  );
};

export default ProfileComponent;
