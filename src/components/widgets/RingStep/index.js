import React from 'react';

import { FlexColumn } from 'shared/commonStyles';
import Progress from '../ProgressRing';
import { RingLabel } from './styles';

const RingStep = ({
  progress = 0,
  className = null,
  label = 'Active',
  color = '#1CE0E2',
  background = 'rgba(196, 196, 196, 0.28)',
}) => {
  const newProgress = progress * 10;
  return (
    <FlexColumn alignItems="center">
      <Progress
        reduction={0}
        hideBall={true}
        strokeWidth={12}
        className={className}
        progress={newProgress}
        background={background}
        style={{ position: 'relative' }}
        gradient={[
          { stop: 0.0, color: color },
          { stop: 1, color: color },
        ]}
      />
      <RingLabel>{label}</RingLabel>
    </FlexColumn>
  );
};

export default RingStep;
