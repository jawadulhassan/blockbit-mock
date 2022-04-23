import React, { Fragment, FC } from 'react';

import {
  PlayIcon,
  LightText,
  BolderText,
  FlexColumn,
  LargeDivider,
} from 'shared/commonStyles';

import Pointers from 'components/widgets/Pointers';

const StepsLearning: FC<any> = ({ steps, title, description }: any): any => {
  return (
    <FlexColumn>
      <BolderText className="m-3" fontSize="20px" lineHeight="27px">
        <b>{title}</b>
      </BolderText>
      <div className="learn-wrapper">
        <LightText fontSize="18px" lineHeight="25px">
          {description}
        </LightText>
      </div>
      <div style={{ position: 'relative' }}>
        <img src="/static/svgs/video-thumbnail.svg" alt="screen-icon" />
        <PlayIcon src="/static/svgs/play-icon.svg" alt="play-icon" />
      </div>

      <div className="steps-divider">
        <LargeDivider height="0px" width="244px" />
      </div>
      <div className="learn-wrapper">
        <BolderText className="m-3" fontSize="20px" lineHeight="27px">
          <b>Steps</b>
        </BolderText>
        {steps.map(
          ({ step, number, description: desc }: any, index: any): any => (
            <Fragment key={index}>
              <Pointers label={step} number={number} description={desc} />
            </Fragment>
          )
        )}
      </div>
    </FlexColumn>
  );
};

export default StepsLearning;
