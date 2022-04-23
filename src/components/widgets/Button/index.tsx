import React, { FC } from 'react';

import { Button, ButtonIcon } from 'shared/commonStyles';

const ButtonWidget: FC<any> = (props: any): any => {
  const {
    type,
    icon,
    label,
    width,
    onClick,
    disabled,
    marginTop,
    marginLeft,
    marginRight,
  } = props;

  return (
    <Button
      type={type}
      width={width}
      onClick={onClick}
      disabled={disabled}
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
      opacity={disabled ? 0.25 : 1}
    >
      {label}
      {!!icon && (
        <ButtonIcon src={`/static/svgs/${icon}`} alt={`${`icon-${icon}`}`} />
      )}
    </Button>
  );
};

export default ButtonWidget;
