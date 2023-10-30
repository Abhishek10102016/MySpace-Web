import React, {
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
  Dispatch,
} from 'react';
import oneImg from '/apps/myspace/src/assets/images/1.jpg';

import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { useDispatch } from 'react-redux';
import { addUserPermissions, resetUserPersissions } from '../../../store/slices/userSlice';
import { ApolloClient, useApolloClient, useQuery } from '@apollo/client';
import { userQueries } from '../../../services/graphql/userQueries'
import { userDetails } from '../../../types/types';


/* eslint-disable-next-line */
export interface HeaderProps {
  toggleMenu: boolean;
  setToggleMenu?: Dispatch<SetStateAction<boolean>>;
  handleSideBar: MouseEventHandler;
  handleSidebarForMobile: MouseEventHandler;
  showSideBarOnMobile: boolean;
  setShowSideBarOnMobile: Dispatch<SetStateAction<boolean>>;
}

export function Header(props: HeaderProps) {
  const navigate = useNavigate();
  const {
    toggleMenu,
    handleSideBar,
    handleSidebarForMobile,
    showSideBarOnMobile,
    setShowSideBarOnMobile,
  } = props;
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const userData = useAppSelector(state => state.user.userDetails);
  const { data, loading, error } = useQuery(userQueries.GET_USER_DETAILS);
  const apolloClient = useApolloClient()

  const dispatch = useDispatch();

  const handleProfileModel = () => {
    if (isProfileOpen) setIsProfileOpen(false);
    else {
      setIsProfileOpen(true);
      setShowSideBarOnMobile(false);
    }
  };

  const handleLogout = () => {
    dispatch(resetUserPersissions(null));
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    apolloClient.clearStore()
    navigate('/');
  };



  useEffect(() => {
    if (data) {
      dispatch(addUserPermissions(data.userPermissions.result as userDetails))
    }
    if (isProfileOpen && !showSideBarOnMobile) {
      setIsProfileOpen(true);
    } else {
      setIsProfileOpen(false);
    }
  }, [showSideBarOnMobile, isProfileOpen, userData]);

  return (
    <header className="topbar">
      <nav className="navbar top-navbar navbar-expand-md navbar-dark">
        <div className="navbar-header show-phone">
          <button
            className="nav-toggler waves-effect waves-light d-block d-md-none border-0 bg-transparent"
            onClick={handleSidebarForMobile}
          >
            <i className="material-icons menu-search">menu</i>
          </button>

          <Link className="navbar-brand" to="/dashboard">
            <span className="logo-text ">
              <h2 className="dark-logo fw-bold">MySpace</h2>
              <h2 className="light-logo fw-bold">MySpace</h2>
            </span>
          </Link>
          <button
            className={`nav-link dropdown-toggle waves-effect waves-dark ${isProfileOpen ? 'show' : ''
              }`}
            onClick={handleProfileModel}
            style={{ border: 'none', backgroundColor: 'white' }}
          >
            <div className="d-flex align-items-center">
              <div>
                <img
                  src={oneImg}
                  alt="user"
                  width={30}
                  className="profile-pic rounded-circle"
                />
              </div>
              <div className="d-flex align-items-center">
                <h6 className="mb-0 text-dark ml-2 phone-none">{userData?.name}</h6>
                <i className="material-icons">arrow_drop_down</i>
              </div>
            </div>
          </button>
          <div
            className={`dropdown-menu dropdown-menu-end user-dd ${isProfileOpen ? 'show' : ''
              }`}
          >
            <div className="d-flex no-block align-items-center p-4 bg-primary text-white mb-2">
              <div>
                <img
                  src={oneImg}
                  alt="user"
                  className="rounded-circle"
                  width={60}
                />
              </div>
              <div className="ms-2">
                <h4 className="mb-0 text-white">{userData?.name}</h4>
                <p className="mb-0 profile_id">{userData?.email}</p>
              </div>
            </div>
            <button className="dropdown-item">
              <div className="d-flex align-items-center">
                <div>
                  <i className="material-icons ">person</i>
                </div>
                <div className="ml-2">My Profile</div>
              </div>
            </button>
            <div className="dropdown-divider" />
            <button className="dropdown-item">
              <div className="d-flex align-items-center">
                <div>
                  <i className="material-icons ">account_balance</i>
                </div>
                <div className="ml-2">My Balance</div>
              </div>
            </button>
            <div className="dropdown-divider" />
            <button className="dropdown-item">
              <div className="d-flex align-items-center">
                <div>
                  <i className="material-icons ">inbox</i>
                </div>
                <div className="ml-2">Inbox</div>
              </div>
            </button>
            <div className="dropdown-divider" />
            <button className="dropdown-item">
              <div className="d-flex align-items-center">
                <div>
                  <i className="material-icons ">settings</i>
                </div>
                <div className="ml-2">Account Setting</div>
              </div>
            </button>
            <div className="dropdown-divider" />
            <button className="dropdown-item" onClick={handleLogout}>
              <div className="d-flex align-items-center">
                <div>
                  <i className="material-icons ">logout</i>
                </div>
                <div className="ml-2">Logout</div>
              </div>
            </button>
          </div>
        </div>
        <div
          className={`navbar-collapse collapse ${showProfile ? 'show' : ''}`}
          id="navbarSupportedContent"
        >
          <Link className="navbar-brand me-4 phone-none" to="/dashboard">
            <span className="logo-text">
              <h2 className="dark-logo fw-bold">MySpace</h2>
            </span>
          </Link>
          <ul className="navbar-nav form-check me-auto phone-none">
            <li className="nav-item">
              <a className="nav-link sidebartoggler d-none d-md-block waves-effect waves-dark border-0 bg-transparent">
                <div className="form-check mb-2 form-switch">
                  <button
                    className={`form-check-input bg-transparent ${toggleMenu ? 'checked' : ''
                      }`}
                    id="showPhone"
                    onClick={(e) => {
                      handleSideBar(e);
                    }}
                  >
                    <i className="material-icons menu-icon">menu</i>
                  </button>
                </div>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav justify-content-end">
            <li className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle waves-effect waves-dark ${isProfileOpen ? 'show' : ''
                  }`}
                onClick={handleProfileModel}
                style={{ border: 'none', backgroundColor: 'white' }}
              >
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      src={oneImg}
                      alt="user"
                      width={30}
                      className="profile-pic rounded-circle"
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <h6 className="mb-0 text-dark ml-2 phone-none">
                      {userData?.name}
                    </h6>
                    <i className="material-icons">arrow_drop_down</i>
                  </div>
                </div>
              </button>
              <div
                className={`dropdown-menu dropdown-menu-end user-dd ${isProfileOpen ? 'show' : ''
                  }`}
              >
                <div className="d-flex no-block align-items-center p-4 bg-primary text-white mb-2">
                  <div>
                    <img
                      src={oneImg}
                      alt="user"
                      className="rounded-circle"
                      width={60}
                    />
                  </div>
                  <div className="ms-2">
                    <h4 className="mb-0 text-white">{userData?.name}</h4>
                    <p className="m-0 profile_id">{userData?.email}</p>
                  </div>
                </div>
                <button className="dropdown-item">
                  <div className="d-flex align-items-center">
                    <div>
                      <i className="material-icons ">person</i>
                    </div>
                    <div className="ml-2">My Profile</div>
                  </div>
                </button>
                <div className="dropdown-divider" />
                <button className="dropdown-item">
                  <div className="d-flex align-items-center">
                    <div>
                      <i className="material-icons ">account_balance</i>
                    </div>
                    <div className="ml-2">My Balance</div>
                  </div>
                </button>
                <div className="dropdown-divider" />
                <button className="dropdown-item">
                  <div className="d-flex align-items-center">
                    <div>
                      <i className="material-icons ">inbox</i>
                    </div>
                    <div className="ml-2">Inbox</div>
                  </div>
                </button>
                <div className="dropdown-divider" />
                <button className="dropdown-item">
                  <div className="d-flex align-items-center">
                    <div>
                      <i className="material-icons ">settings</i>
                    </div>
                    <div className="ml-2">Account Setting</div>
                  </div>
                </button>
                <div className="dropdown-divider" />
                <button className="dropdown-item" onClick={handleLogout}>
                  <div className="d-flex align-items-center">
                    <div>
                      <i className="material-icons ">logout</i>
                    </div>
                    <div className="ml-2">Logout</div>
                  </div>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
