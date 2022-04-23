import React, { FC } from 'react';

import {
  PlayIcon,
  LightText,
  BolderText,
  FlexColumn,
} from 'shared/commonStyles';

const SimpleLearning: FC<any> = ({ title, description }: any): any => {
  return (
    <FlexColumn>
      <BolderText className="m-3" fontSize="20px" lineHeight="27px">
        <b>{title}</b>
      </BolderText>
      <div style={{ width: '48%', marginBottom: 20, alignSelf: 'center' }}>
        <LightText fontSize="18px" lineHeight="25px">
          {description}
        </LightText>
      </div>
      <div style={{ position: 'relative' }}>
        <img src="/static/svgs/video-thumbnail.svg" alt="screen-icon" />
        <PlayIcon src="/static/svgs/play-icon.svg" alt="play-icon" />
      </div>
    </FlexColumn>
  );
};

export default SimpleLearning;
