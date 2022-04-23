import React from 'react';

import { SocialButton } from './style';

function Social(props) {
  const { primary, onClick, opacity, label, iconProp, marginTop } = props;
  return (
    <SocialButton {...{ marginTop, primary, onClick, opacity }}>
      {!!iconProp && (
        <div className="mr-2">
          <i className={`fab fa-${iconProp}`}></i>
        </div>
      )}
      {label}
    </SocialButton>
  );
}

export default Social;
