import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { ROUTE_CONSTANTS } from 'shared/constants/Routes';
import StorageConstants from 'shared/constants/StorageConstants';
import FirebaseAuthContext from 'shared/contexts/firebaseContext';
import { ListItems, SideBarNav, AsideWrapper } from 'shared/commonStyles';

import NavOptions from '../../../components/widgets/NavOptions';

import TabList from './TabList';

function Aside(props) {
  const { selectedTab, setSelectedTab } = props;

  const history = useHistory();
  let firebaseAuth = useContext(FirebaseAuthContext);

  function handleClick(event, route) {
    event.preventDefault();
    setSelectedTab(route);
  }

  function handleLogout() {
    firebaseAuth.signOut();
    return new Promise(function () {
      setTimeout(function () {
        clearAuthData();
      }, 1000);
    });
  }

  const clearAuthData = () => {
    localStorage.setItem(StorageConstants.AUTH_TOKEN, '');
    localStorage.setItem(StorageConstants.USER_DATA, '');
    history.push(ROUTE_CONSTANTS.LOGIN);
  };

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
        <ListItems onClick={handleLogout}>
          <NavOptions icon="static/svgs/lock.svg" label="Log out" />
        </ListItems>
      </SideBarNav>
    </AsideWrapper>
  );
}

export default Aside;
