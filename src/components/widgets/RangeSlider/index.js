import React, { useState, useEffect } from 'react';

import { FlexColumnWrap, FlexRow } from 'shared/commonStyles';
import './index.css';

const settings = {
  fill: '#041f60',
  background: '#f0eeee',
};

//TODO: Need to replace this slider

const RangeSlider = ({ value, min, max, step }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const slider = document.querySelector('.slider');
    applyFill(slider);
  }, []);

  const applyFill = (slider) => {
    const percentage =
      (100 * (slider.value - slider.min)) / (slider.max - slider.min);
    setPercent(percentage);
    const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${
      settings.background
    } ${percentage + 0.1}%)`;
    slider.style.background = bg;
  };

  return (
    <div className="slider-container">
      <FlexRow>
        <FlexColumnWrap>
          <p>{min}</p>
        </FlexColumnWrap>
        <FlexColumnWrap>
          <p className="text-right">{max}</p>
        </FlexColumnWrap>
      </FlexRow>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left:
              percent > 70 ? '70%' : percent < 20 ? '10%' : `${percent - 10}%`,
            marginTop: '-39px',
          }}
        >
          <p>{`${value} Days Left`}</p>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        labels={`${min},${max}`}
        value={value}
        className="slider"
        onChange={() => console.log('')}
      />
    </div>
  );
};

export default RangeSlider;
