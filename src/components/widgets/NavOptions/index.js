import React from 'react';

import { FlexRow, AsideText, AsideImage } from 'shared/commonStyles';

function NavOptions(props) {
  const { label, icon } = props;
  return (
    <FlexRow padding="16px 33px" alignItems="center">
      <AsideImage src={icon} alt={`${icon}-aside`} />
      <AsideText>{label}</AsideText>
    </FlexRow>
  );
}

export default NavOptions;
