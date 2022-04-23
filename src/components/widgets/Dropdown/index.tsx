import React, { FC } from 'react';
import { Input, Label } from 'reactstrap';
import upperFirst from 'lodash/upperFirst';

import { FlexColumn } from 'shared/commonStyles';

const Dropdown: FC<any> = (props: any): any => {
  const {
    name,
    width,
    label,
    options,
    register,
    onChange,
    marginTop,
    isNotRequired,
  } = props;

  return (
    <FlexColumn width={width} marginTop={marginTop}>
      {!!label && (
        <Label htmlFor={name} className="dropdown-label">
          {label}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        type="select"
        onChange={onChange}
        className="dropdown-input"
        innerRef={register(
          !isNotRequired && {
            required: 'Required',
          }
        )}
      >
        {options.map((value: any, index: any): any => (
          <option key={`opt-${index}`} value={value}>
            {upperFirst(value)}
          </option>
        ))}
      </Input>
    </FlexColumn>
  );
};

export default Dropdown;
