import React from 'react';
import { Link } from 'react-router-dom';

import {
  Logo,
  LogoWrap,
  HeaderFixed,
  FlexContainer,
  UnAuthHeaderList,
} from 'shared/commonStyles';

import Button from 'components/widgets/Button';
import LanguageDropdown from 'components/widgets/LanguageDropdown';

function UnAuthHeader() {
  return (
    <HeaderFixed>
      <Link to="/login">
        <LogoWrap>
          <Logo src="static/svgs/header-logo.svg" alt="icon-logo" />
        </LogoWrap>
      </Link>

      <div className="nav-opener">
        <span />
      </div>
      <FlexContainer>
        <UnAuthHeaderList>
          <a href="https://blockbit.io/">
            <div className="navbar-item">Features</div>
          </a>
        </UnAuthHeaderList>
        <UnAuthHeaderList>
          <a href="https://blockbit.io/">
            <div className="navbar-item">Exchanges</div>
          </a>
        </UnAuthHeaderList>
        <UnAuthHeaderList>
          <a href="https://blockbit.io/">
            <div className="navbar-item">Membership</div>
          </a>
        </UnAuthHeaderList>
        <UnAuthHeaderList>
          <a href="https://blockbit.io/">
            <div className="navbar-item">Learn</div>
          </a>
        </UnAuthHeaderList>
        <UnAuthHeaderList>
          <Link className="navbar-item" to="/login">
            <Button label="Try it now" />
          </Link>
        </UnAuthHeaderList>
        <UnAuthHeaderList>
          <LanguageDropdown />
        </UnAuthHeaderList>
      </FlexContainer>
    </HeaderFixed>
  );
}

export default UnAuthHeader;
