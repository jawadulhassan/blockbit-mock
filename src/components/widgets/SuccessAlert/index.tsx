import React, { FC } from 'react';

import { FlexRow, LightText } from 'shared/commonStyles';

import { MainWrapper } from './styles';

const SuccessAlert: FC<any> = ({ message, setDisplaySuccess }: any): any => {
  return (
    <MainWrapper>
      <FlexRow alignItems="center">
        <img
          src="/static/svgs/small-tick.svg"
          alt="tick-icon"
          className="mr-3"
        />
        <LightText fontSize="14px" lineHeight="19px">
          {message}
        </LightText>
      </FlexRow>
      <img
        src="/static/svgs/cancel.svg"
        alt="cancel-icon"
        className="pointer"
        onClick={(): any => setDisplaySuccess(false)}
      />
    </MainWrapper>
  );
};

export default SuccessAlert;
