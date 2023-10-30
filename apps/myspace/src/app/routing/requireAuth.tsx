import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '../layout/header/header';
import { Sidebar } from '../layout/sidebar/sidebar';
import { useState } from 'react';

let path = window.location.pathname;
if (path === '/') {
  path = '/dashboard';
}

function RequireAuth() {
  const auth = localStorage.getItem('isLoggedIn');

  const [toggleMenu, setToggleMenu] = useState<boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [showSideBarOnMobile, setShowSideBarOnMobile] =
    useState<boolean>(false);

  const handleSideBar = () => {
    if (toggleMenu) {
      setToggleMenu(false);
      setIsCollapsed(false);
    } else {
      setToggleMenu(true);
      setIsCollapsed(true);
    }
  };

  const handleSidebarForMobile = () => {
    if (showSideBarOnMobile) setShowSideBarOnMobile(false);
    else setShowSideBarOnMobile(true);
  };

  return auth === 'true' ? (
    <div id="main-wrapper" className={!isCollapsed ? 'mini-sidebar' : ''}>
      <Header
        toggleMenu={toggleMenu}
        handleSideBar={handleSideBar}
        setToggleMenu={setToggleMenu}
        handleSidebarForMobile={handleSidebarForMobile}
        showSideBarOnMobile={showSideBarOnMobile}
        setShowSideBarOnMobile={setShowSideBarOnMobile}
      />
      <Sidebar
        showSideBarOnMobile={showSideBarOnMobile}
        handleSidebarForMobile={handleSidebarForMobile}
      />
      <div
        className="right-part overflow-auto dashboard-part"
        style={{ height: '100%' }}
      >
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

function WithoutLogin() {
  const auth = localStorage.getItem('isLoggedIn');
  return auth === 'true' ? <Navigate to={path} /> : <Outlet />;
}

export { RequireAuth, WithoutLogin };
