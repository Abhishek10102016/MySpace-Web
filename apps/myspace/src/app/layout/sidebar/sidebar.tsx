import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { PrefilledStatus } from "../../../../../../apps/myspace/src/constants/PrefilledConstants"
import { useAppSelector } from '../../../store/hooks';

/* eslint-disable-next-line */
export interface SidebarProps {
  showSideBarOnMobile: boolean;
  handleSidebarForMobile: MouseEventHandler<HTMLAnchorElement>;
}

export function Sidebar(props: SidebarProps) {
  const { showSideBarOnMobile, handleSidebarForMobile } = props;
  const path = window.location.pathname;
  const userData = useAppSelector(state => state.user.userDetails);
  const roles = PrefilledStatus.Roles;

  return (
    <aside
      className={`left-sidebar ${showSideBarOnMobile ? 'show-left-sidebar' : ''
        }`}
    >
      <div className="scroll-sidebar ps-container">
        <div className="flex-shrink-0 p-3 bg-white" style={{ width: 240 }}>
          <ul className="list-unstyled ps-0">
            <li className="mb-1">
              <Link
                className={`btn btn-toggle align-items-center rounded collapsed border-0 px-2 ${path.includes('/dashboard') ? 'btn-active' : ''
                  }`}
                to={'/dashboard'}
                onClick={handleSidebarForMobile}
              >
                <i className="material-icons pr-5">dashboard_customize</i>{' '}
                Dashboard
              </Link>
            </li>
            {(userData?.role === roles.Admin || userData?.role === roles.SuperAdmin || userData?.role === roles.HRExecutive || userData?.role === roles.HRManager) && (
              <>
                <li className="mb-1">
                  <Link
                    className={`btn btn-toggle align-items-center rounded collapsed px-2 border-0 ${path.includes('/employees') ? 'btn-active' : ''
                      }`}
                    to={'/employees'}
                    onClick={handleSidebarForMobile}
                  >
                    <i className="material-icons pr-5">person</i> Employees
                  </Link>
                </li>

                <li className="mb-1">
                  <Link
                    className={`btn btn-toggle align-items-center rounded collapsed px-2 border-0 ${path.includes('/department') ? 'btn-active' : ''
                      }`}
                    to={'/department'}
                    onClick={handleSidebarForMobile}
                  >
                    <i className="material-icons pr-5">home_repair_service</i> Department
                  </Link>
                  <div
                    className="collapse ul-creative"
                    id="dashboard-collapse"
                    style={{}}
                  ></div>
                </li>
              </>
            )}
            {(userData?.role !== roles.DeliveryExecuive && userData?.role !== roles.SalesExecutive && userData?.role !== roles.AccountExecutive && userData?.role !== roles.ITExecutive) && (
              <li className="mb-1">
                <Link
                  className={`btn btn-toggle align-items-center rounded collapsed px-2 border-0 ${path.includes('/leaves') ? 'btn-active' : ''
                    }`}
                  to={'/leaves'}
                  onClick={handleSidebarForMobile}
                >
                  <i className="material-icons pr-5">free_cancellation</i> Leaves
                </Link>
                <div
                  className="collapse ul-creative"
                  id="dashboard-collapse"
                  style={{}}
                ></div>
              </li>
            )}
            <li className="mb-1">
              <Link
                className={`btn btn-toggle align-items-center rounded collapsed px-2 border-0 ${(path.includes('/myleaves') || path.includes('/leaveapply')) ? 'btn-active' : ''
                  }`}
                to={'/myleaves'}
                onClick={handleSidebarForMobile}
              >
                <i className="material-icons pr-5">free_cancellation</i> My Leaves / WFH
              </Link>
              <div
                className="collapse ul-creative"
                id="dashboard-collapse"
                style={{}}
              ></div>
            </li>
            <li className="mb-1">
              <Link
                className={`btn btn-toggle align-items-center rounded collapsed px-2 border-0 ${path.includes('/mydetails') ||
                  path.includes('/bankdetails')
                  ? 'btn-active'
                  : ''
                  }`}
                to={'/mydetails'}
                onClick={handleSidebarForMobile}
              >
                <i className="material-icons pr-5">info</i> My Details
              </Link>
              <div
                className="collapse ul-creative"
                id="dashboard-collapse"
                style={{}}
              ></div>
            </li>
            <li className="border-top my-2" />
            <li className="mb-1">
              <div
                className="collapse ul-creative"
                id="account-collapse"
                style={{}}
              >
              </div>
            </li>
          </ul>
        </div>
        <div></div>
      </div>
    </aside>
  );
}

export default Sidebar;
