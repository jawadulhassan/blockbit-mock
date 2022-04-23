import React, { FC } from 'react';

import { BolderText, FlexColumn, ProfitPercentage } from 'shared/commonStyles';

import { CardWrapper } from './styles';

const CardWidget: FC<any> = (props: any): any => {
  const { alteration, label = 'none', value, icon } = props;
  return (
    <CardWrapper>
      <FlexColumn width="120%">
        <BolderText fontSize="20px" lineHeight="27px">
          {label}
        </BolderText>
        <BolderText
          fontSize="18px"
          fontWeight={700}
          lineHeight="33px"
          marginTop="14px"
        >
          {value}
        </BolderText>
      </FlexColumn>
      <FlexColumn alignItems="flex-end">
        <img src={`/static/svgs/${icon}.svg`} alt="icon-small" />
        <ProfitPercentage
          marginTop="22px"
          color={alteration > 0 ? '#00DA9D' : '#F33501'}
        >
          {`${alteration}%`}
        </ProfitPercentage>
      </FlexColumn>
    </CardWrapper>
  );
};

export default CardWidget;
