import React, { FC, useState } from 'react';
import { format } from 'date-fns';

import {
  FlexRow,
  Divider,
  BolderText,
  BorderedBottom,
  ProfitPercentage,
} from 'shared/commonStyles';

import Calender from 'components/widgets/Calender';
import FullPageLoader from 'components/widgets/ContentLoaders/FullPageLoading';

import { ComponentBox, SmallStatus } from '../styles';

import AssetsGraph from './Graph';

interface IAssets {
  tileValue: number;
  tilePercentage: number;
  data: object[];
}

const CryptoAssets: FC<{}> = () => {
  const [assetsData] = useState<IAssets>({
    tileValue: 567901.73,
    tilePercentage: -1.8,
    data: [],
  });
  const [isLoading] = useState(false);

  const dateSelectionHandler = ({ start, end }) => {
    const startDate = format(new Date(start), 'yyyy-MM-dd');
    const endDate = format(new Date(end), 'yyyy-MM-dd');

    if (startDate && endDate) {
      console.log('startDate, endDate', startDate, endDate);
    }
  };

  if (isLoading) return <FullPageLoader />;
  return (
    <ComponentBox>
      <BorderedBottom>
        <FlexRow justifyContent="space-between" alignItems="center">
          <FlexRow alignItems="center">
            <BolderText fontSize="20px" lineHeight="27px">
              Assets
            </BolderText>
            <SmallStatus>
              <BolderText fontSize="24px" lineHeight="33px" marginBottom="0px">
                {`$ ${assetsData.tileValue}`}
              </BolderText>
              <Divider />
              <ProfitPercentage
                fontSize="20px"
                marginRight="7px"
                color={assetsData.tilePercentage > 0 ? '#00DA9D' : '#F33501'}
              >
                {`${assetsData.tilePercentage}%`}
              </ProfitPercentage>
              {assetsData.tilePercentage > 0 ? (
                <img src="/static/svgs/up-arrow.svg" alt="icon-small" />
              ) : (
                <img src="/static/svgs/down-arrow.svg" alt="icon-small" />
              )}
              {assetsData.tilePercentage > 0 ? (
                <img
                  src="/static/svgs/small-up-swiggly.svg"
                  alt="swiggly"
                  className="ml-2"
                />
              ) : (
                <img
                  src="/static/svgs/down-swiggly.svg"
                  alt="swiggly"
                  className="ml-2"
                />
              )}
            </SmallStatus>
          </FlexRow>
          <Calender dateSelectionHandler={dateSelectionHandler} />
        </FlexRow>
      </BorderedBottom>
      {!!assetsData.data && (
        <AssetsGraph heightProp="363px" chartData={assetsData.data} />
      )}
    </ComponentBox>
  );
};

export default CryptoAssets;
