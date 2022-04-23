import React from 'react';
import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

function LanguageDropdown() {
  return (
    <div>
      <UncontrolledDropdown setActiveFromChild>
        <DropdownToggle caret tag="a" className="navbar-item">
          <img src="static/svgs/world.svg" alt="world-icon" className="mr-2" />
          Eng
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem active>English</DropdownItem>
          <DropdownItem>Spanish</DropdownItem>
          <DropdownItem>French</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
}

export default LanguageDropdown;
