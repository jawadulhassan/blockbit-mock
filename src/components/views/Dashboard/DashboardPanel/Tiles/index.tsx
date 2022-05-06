import React, { FC, useState } from 'react';

import { FlexRow } from 'shared/commonStyles';

import CardWidget from 'components/widgets/CardWidget';
import TilesLoader from 'components/widgets/ContentLoaders/TilesLoading';

interface IProject {
  tileName: string;
  tilePercentage: number;
  tileValue: number;
}

const Tiles: FC<{}> = () => {
  const [isLoading] = useState(false);
  const [tilesList] = useState<IProject[] | []>([
    {
      tileName: 'Pnl',
      tileValue: 5234,
      tilePercentage: -1.2,
    },
    {
      tileName: 'Trade Volume',
      tileValue: 97810,
      tilePercentage: 3.2,
    },
    {
      tileName: 'Fee',
      tileValue: 35,
      tilePercentage: 5,
    },
  ]);

  if (isLoading) return <TilesLoader />;
  return (
    <FlexRow width="100%" marginTop="21px" justifyContent="space-between">
      <CardWidget
        label="Pnl"
        value={`$ ${tilesList[0]?.tileValue}`}
        icon="pnl-icon"
        alteration={`${tilesList[0]?.tilePercentage}`}
      />
      <CardWidget
        label="Trade Volume"
        value={`$ ${tilesList[1]?.tileValue}`}
        icon="trade-icon"
        alteration={`${tilesList[1]?.tilePercentage}`}
      />
      <CardWidget
        label="Fee"
        value={`$ ${tilesList[2]?.tileValue}`}
        icon="fee-icon"
        alteration={`${tilesList[2]?.tilePercentage}`}
      />
    </FlexRow>
  );
};

export default Tiles;
