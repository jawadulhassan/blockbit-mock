import React, { FC } from 'react';
import { CustomInput } from 'reactstrap';

const Checkbox: FC<any> = (props: any): any => {
  const { name, checked, onChange, index } = props;
  return (
    <CustomInput
      name={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      id={`cb-3-${index}`}
    />
  );
};

export default Checkbox;
