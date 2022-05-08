import React, { FC } from 'react';

import Button from 'components/widgets/Button';
import { FlexRow, Highlighted } from 'shared/commonStyles';

import { MainWrapper, HeaderLabel } from './styles';

const ScreenHeader: FC<any> = (props: any): any => {
  const {
    header,
    onClick,
    withCaret,
    buttonLabel,
    subheading = null,
    headingClickHandler,
    subheadingClickHandler,
  } = props;

  return (
    <MainWrapper>
      <FlexRow>
        <HeaderLabel onClick={headingClickHandler}>{header}</HeaderLabel>
        {!!subheading && (
          <Highlighted marginLeft="15px" marginRight="15px">
            /
          </Highlighted>
        )}
        {!!subheading && (
          <HeaderLabel onClick={subheadingClickHandler}>
            {subheading}
          </HeaderLabel>
        )}
      </FlexRow>

      {!!buttonLabel && (
        <Button
          onClick={onClick}
          label={buttonLabel}
          disabled={true}
          icon={withCaret && 'arrow.svg'}
        />
      )}
    </MainWrapper>
  );
};

export default ScreenHeader;
