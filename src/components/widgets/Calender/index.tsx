import React, { useState, FC, useRef } from 'react';
import SimpleReactCalendar from 'simple-react-calendar';

import { LightText } from 'shared/commonStyles';

import useOutsideClick from '../Hooks/useOutsideClick';

import { CalenderWrapper, DateBadge } from './styles';

const Calender: FC<any> = ({ dateSelectionHandler }): any => {
  const ref = useRef();
  const [showCalender, setShowCalender] = useState(false);

  const toggleCalender = (): any => setShowCalender(!showCalender);

  useOutsideClick(ref, () => {
    if (showCalender) {
      toggleCalender();
    }
  });

  return (
    <div style={{ position: 'relative' }}>
      <DateBadge onClick={toggleCalender}>
        <LightText fontSize="14px">Date</LightText>
        <img src="/static/svgs/down-caret.svg" alt="down-icon" />
      </DateBadge>
      {showCalender && (
        <CalenderWrapper ref={ref}>
          <SimpleReactCalendar
            activeMonth={new Date()}
            mode="range"
            blockClassName="date_picker"
            onSelect={({ start, end }) => {
              toggleCalender();
              dateSelectionHandler({ start, end });
            }}
          />
        </CalenderWrapper>
      )}
    </div>
  );
};

export default Calender;
