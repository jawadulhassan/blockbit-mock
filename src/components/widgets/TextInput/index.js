import React from 'react';
import { Label } from 'reactstrap';

import { InputWrapper, Input } from './styles';

function TextInput(props) {
  const {
    min,
    max,
    name,
    label,
    width,
    value,
    isError,
    onChange,
    register,
    paddingTop,
    onKeyPress,
    transparent,
    placeholder,
    defaultValue,
    dividerInput,
    smallerInput,
    type = 'text',
  } = props;
  return (
    <InputWrapper
      width={width}
      isError={isError}
      paddingTop={paddingTop}
      transparent={transparent}
      dividerInput={dividerInput}
      smallerInput={smallerInput}
    >
      {!!label && (
        <Label htmlFor={name} className="dropdown-label mb-3">
          {label}
        </Label>
      )}
      <Input
        min={min}
        max={max}
        type={type}
        name={name}
        value={value}
        ref={register}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </InputWrapper>
  );
}
export default TextInput;
