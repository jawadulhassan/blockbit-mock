import React, { FC, useState } from 'react';

import {
  FlexRow,
  BolderText,
  FlexColumn,
  BorderedBottom,
} from 'shared/commonStyles';

import RingStep from 'components/widgets/RingStep';
import FullPageLoader from 'components/widgets/ContentLoaders/FullPageLoading';

import { ComponentBox } from '../styles';

interface IProject {
  tileName: string;
  tileValue: number;
}

const BotsStatus: FC<{}> = () => {
  const [isLoading] = useState(false);
  const [tilesList] = useState<IProject[] | []>([
    {
      tileName: 'Active',
      tileValue: 5,
    },
    {
      tileName: 'Stop',
      tileValue: 3,
    },
    {
      tileName: 'Open Trade',
      tileValue: 7,
    },
    {
      tileName: 'Closed Trade',
      tileValue: 1,
    },
  ]);

  if (isLoading) return <FullPageLoader />;
  return (
    <ComponentBox height="331px">
      <BorderedBottom>
        <FlexRow justifyContent="space-between" alignItems="center">
          <BolderText fontSize="20px" lineHeight="27px">
            Bots
          </BolderText>
        </FlexRow>
      </BorderedBottom>
      <FlexRow
        width="100%"
        marginTop="15px"
        marginBottom="10px"
        alignItems="center"
        justifyContent="space-around"
      >
        <FlexColumn alignItems="center">
          <img alt="bot" className="mb-2" src="/static/svgs/colorful-bot.svg" />
        </FlexColumn>
        <RingStep
          label="Active"
          color="#1CE0E2"
          progress={tilesList[0].tileValue}
        />
        <RingStep
          label="Stop"
          color="#61D7F8"
          progress={tilesList[1].tileValue}
        />
        <RingStep
          color="#429DDB"
          label="Open Trade"
          progress={tilesList[2].tileValue}
        />
        <RingStep
          color="#294077"
          label="Closed Trade"
          progress={tilesList[3].tileValue}
        />
      </FlexRow>
    </ComponentBox>
  );
};

export default BotsStatus;
