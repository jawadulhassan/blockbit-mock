import React from 'react';
import { Label } from 'reactstrap';

import { Input, InputWrapper } from './styles';

function DateInput(props) {
  const {
    min,
    max,
    type,
    name,
    label,
    value,
    register,
    onChange,
    onKeyPress,
    placeholder,
    defaultValue,
  } = props;

  return (
    <InputWrapper>
      {!!label && <Label htmlFor={name}>{label}</Label>}
      <Input
        {...{
          min,
          max,
          type,
          name,
          value,
          onChange,
          onKeyPress,
          placeholder,
          defaultValue,
        }}
        onFocus={(e) => (e.currentTarget.type = 'date')}
        onBlur={(e) => (e.currentTarget.type = 'text')}
        ref={register}
      />
    </InputWrapper>
  );
}

export default DateInput;
