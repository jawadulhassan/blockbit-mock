import React, { FC, useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import { FlexContainerTwentyFivePad } from 'shared/commonStyles';

import './tab-styles.css';

const Settings: FC<any> = (props: any): any => {
  const [selectedTab, setSelectedTab] = useState(1);

  const toggle = (event: any): any => setSelectedTab(event);
  return (
    <React.Fragment>
      <FlexContainerTwentyFivePad center={props.center}>
        <Nav>
          {props.tabOption.map((event: any, item: any): any => (
            <NavItem key={item} onClick={(): void => toggle(item)}>
              <NavLink className={`${selectedTab === item && 'active'}`}>
                {event.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </FlexContainerTwentyFivePad>
      <FlexContainerTwentyFivePad>
        <TabContent className="pl-3 w-100" activeTab={selectedTab}>
          {props.tabOption.map((event: any, item: any): any => (
            <TabPane key={item} tabId={item}>
              {event.comp}
            </TabPane>
          ))}
        </TabContent>
      </FlexContainerTwentyFivePad>
    </React.Fragment>
  );
};

export default Settings;
