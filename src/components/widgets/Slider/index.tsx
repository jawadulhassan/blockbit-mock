import React, { FC } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

import { FlexColumn } from 'shared/commonStyles';

const SliderWidget: FC<any> = (props: any): any => {
  const {
    width,
    label,
    sliderMin,
    sliderMax,
    totalValue,
    sliderValue,
    handleChange,
    threeOptions,
    sliderPercentage,
  } = props;

  return (
    <FlexColumn width={width}>
      {!!label && <div className="dropdown-label mb-2">{label}</div>}
      {!!sliderMin && (
        <div className="flexed-between">
          <span className="small-text">{sliderMin}</span>
          {!!totalValue && (
            <span className="highlighted-text">{`Total $${totalValue}`}</span>
          )}
          {!!sliderPercentage && (
            <span className="highlighted-text">{`${sliderPercentage}%`}</span>
          )}
          {!!threeOptions && <span className="small-text">{threeOptions}</span>}
          <span className="small-text">{sliderMax}</span>
        </div>
      )}
      <Slider
        min={0}
        max={100}
        tooltip={false}
        value={sliderValue}
        onChange={handleChange}
        step={threeOptions && 50}
      />
    </FlexColumn>
  );
};

export default SliderWidget;
