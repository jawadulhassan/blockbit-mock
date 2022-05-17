import React from 'react';

import { ListItems, SideBarNav, AsideWrapper } from 'shared/commonStyles';

import NavOptions from '../../../components/widgets/NavOptions';

import TabList from './TabList';

function Aside(props) {
  const { selectedTab, setSelectedTab } = props;

  function handleClick(event, route) {
    event.preventDefault();
    setSelectedTab(route);
  }

  return (
    <AsideWrapper>
      <SideBarNav>
        {TabList.map(({ label, icon, key }, index) => (
          <ListItems
            key={`aside-${index}`}
            style={{
              background: selectedTab === key && 'rgba(255, 255, 255, 0.2)',
            }}
            onClick={(event) => handleClick(event, key)}
          >
            <NavOptions icon={icon} label={label} />
          </ListItems>
        ))}
      </SideBarNav>
    </AsideWrapper>
  );
}

export default Aside;
