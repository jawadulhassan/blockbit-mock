import React, { FC } from 'react';

import {
  FlexRow,
  LightText,
  BolderText,
  FlexColumn,
  NumberWrapper,
} from 'shared/commonStyles';

const Pointers: FC<any> = (props: any): any => {
  const { number, label, description, onClick } = props;
  return (
    <FlexColumn className="text-left mb-4 pointer" onClick={onClick}>
      {!!number ? (
        <FlexRow className="mb-2 align-items-center">
          <NumberWrapper>{number}</NumberWrapper>
          <BolderText color="#429DDB">{label}</BolderText>
        </FlexRow>
      ) : (
        <BolderText color="#429DDB">{label}</BolderText>
      )}
      <LightText>{description}</LightText>
    </FlexColumn>
  );
};

export default Pointers;
