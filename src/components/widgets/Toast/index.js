import React, { useEffect } from 'react';

import './index.css';

const Toast = (props) => {
  const { open, toggle, icon, heading, text } = props;
  const random = Math.random();

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (open) {
          toggle();
        }
      }, 3000);
    }
  }, [open, toggle]);

  return (
    <div key={random} className={`toast-container ${open ? 'show' : ''}`}>
      <div className="row close-icon">
        <img
          src="/static/svgs/close.svg"
          style={{ cursor: 'pointer' }}
          onClick={toggle}
          alt="icon"
        />
      </div>
      <div className="row">
        <div className="col-2 img-toast">
          <img
            style={{ width: '20px', height: 'auto' }}
            src={`/static/svgs/${icon}.svg`}
            alt="icon"
          />
        </div>
        <div className="col">
          <p className="toast-heading">{heading}</p>
          <p className="toast-text">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;
