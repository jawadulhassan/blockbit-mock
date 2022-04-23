import React from 'react';

import './Toggler.css';

// import { TogglerWrapper } from './styles';
const absStyle = { position: 'absolute', top: 20, right: 20 };
function Toggler(props) {
  const { isOn, handleToggle } = props;
  return (
    <div style={!props.nostyle ? absStyle : props.nostyle}>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={
          props.sm ? 'react-switch-checkbox-sm' : 'react-switch-checkbox'
        }
        id={`react-switch-new-${props.id}`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && '#1CE0E2' }}
        className={props.sm ? 'react-switch-label-sm' : 'react-switch-label'}
        htmlFor={`react-switch-new-${props.id}`}
      >
        <span
          className={
            props.sm ? 'react-switch-button-sm' : 'react-switch-button'
          }
        />
      </label>
    </div>
  );
}

export default Toggler;
