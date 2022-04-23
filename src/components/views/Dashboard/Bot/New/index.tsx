import React, { FC, Fragment } from 'react';

import { FlexRow } from 'shared/commonStyles';

import TopStatsBar from 'components/widgets/TopStatsBar';
import ScreenHeader from 'components/widgets/ScreenHeader';
import TechnicalAnalysis from 'components/widgets/TechnicalAnalysis';

import Graph from './Graph';
import DataForm from './DataForm';

const NewBot: FC<any> = ({
  selectedMarket,
  setSelectedStep,
  setSelectedMarket,
}): any => {
  return (
    <Fragment>
      <ScreenHeader
        header="Bot"
        subheading="Bot Create"
        headingClickHandler={(): any => setSelectedStep(1)}
        subheadingClickHandler={(): any => setSelectedStep(2)}
      />
      <TopStatsBar selectedMarket={selectedMarket} />
      <Graph selectedMarket={selectedMarket} />
      <FlexRow width="100%" marginTop="21px" justifyContent="space-between">
        <div style={{ width: '68%' }}>
          <DataForm
            setSelectedStep={setSelectedStep}
            setSelectedMarket={setSelectedMarket}
          />
        </div>
        <div style={{ width: '30%' }}>
          <TechnicalAnalysis selectedMarket={selectedMarket} />
        </div>
      </FlexRow>
    </Fragment>
  );
};

export default NewBot;
