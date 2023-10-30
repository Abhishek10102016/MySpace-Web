import { useQuery } from "@apollo/client";
import { userQueries } from "../../../services/graphql/userQueries";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../src/store/hooks";
import { addUserPermissions } from "../../../../src/store/slices/userSlice";
import { userDetails } from "apps/myspace/src/types/types";

/* eslint-disable-next-line */
export interface DashboardProps { }

export function Dashboard(props: DashboardProps) {

  const dispatch = useAppDispatch();
  const { data, loading, error } = useQuery(userQueries.GET_USER_DETAILS);

  if (data) {
    dispatch(addUserPermissions(data.userPermissions.result as userDetails))
  }

  const userData = useAppSelector(state => state.user.userDetails);
  const [userData1, setUserData1] = useState(userData)
  return (

    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="reverse-mode">
          <div
            className="overflow-hidden dashboard-part"
            style={{ height: '100%' }}
          >
            <div className="row page-titles">
              <div className="col-md-12">
                <div className="mb-2 d-flex justify-content-between align-items-center">
                  <div>
                    <ol className="breadcrumb mb-0 p-0 bg-transparent">
                      <li className="breadcrumb-item">
                        <a href="table.html">Home</a>
                      </li>
                      <li className="breadcrumb-item active d-flex align-items-center">
                        Dashboard
                      </li>
                    </ol>
                  </div>

                  <div />
                  <ol>
                    <div className="page-title-actions">
                      <div className="d-inline-block pe-3">
                        <select
                          id="custom-inp-top"
                          className="form-select-sm form-select"
                        >
                          <option>Select period...</option>
                          <option>Last Week</option>
                          <option>Last Month</option>
                          <option>Last Year</option>
                        </select>
                      </div>
                    </div>
                  </ol>
                </div>
              </div>
              <div className="col-md-12">
                <div className="TabsAnimation-appear-done TabsAnimation-enter-done">
                  <div className="app-page-title app-page-title-simple">
                    <div className="row">
                      <div className="col-md-6 col-lg-3">
                        <div className="widget-chart widget-chart2 text-start mb-3 card-btm-border card-shadow-primary border-primary card">
                          <div className="widget-chat-wrapper-outer">
                            <div className="widget-chart-content">
                              <div className="widget-title opacity-5 text-uppercase">
                                New accounts
                              </div>
                              <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                                <div className="widget-chart-flex align-items-center">
                                  <div>
                                    <span className="opacity-10 text-success pe-2">
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="angle-up"
                                        className="svg-inline--fa fa-angle-up "
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"
                                        />
                                      </svg>
                                    </span>
                                    234
                                    <small className="opacity-5 ps-1">%</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3">
                        <div className="widget-chart widget-chart2 text-start mb-3 card-btm-border card-shadow-danger border-danger card">
                          <div className="widget-chat-wrapper-outer">
                            <div className="widget-chart-content">
                              <div className="widget-title opacity-5 text-uppercase">
                                Total Expenses
                              </div>
                              <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                                <div className="widget-chart-flex align-items-center">
                                  <div>
                                    <span className="opacity-10 text-danger pe-2">
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="angle-down"
                                        className="svg-inline--fa fa-angle-down "
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                                        />
                                      </svg>
                                    </span>
                                    71
                                    <small className="opacity-5 ps-1">%</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3">
                        <div className="widget-chart widget-chart2 text-start mb-3 card-btm-border card-shadow-warning border-warning card">
                          <div className="widget-chat-wrapper-outer">
                            <div className="widget-chart-content">
                              <div className="widget-title opacity-5 text-uppercase">
                                Company Value
                              </div>
                              <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                                <div className="widget-chart-flex align-items-center">
                                  <div>
                                    <small className="opacity-5 pe-1">$</small>
                                    1,45M
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3">
                        <div className="widget-chart widget-chart2 text-start mb-3 card-btm-border card-shadow-success border-success card">
                          <div className="widget-chat-wrapper-outer">
                            <div className="widget-chart-content">
                              <div className="widget-title opacity-5 text-uppercase">
                                New Employees
                              </div>
                              <div className="widget-numbers mt-2 fsize-4 mb-0 w-100">
                                <div className="widget-chart-flex align-items-center">
                                  <div>
                                    <small className="text-success pe-1">
                                      +
                                    </small>
                                    34
                                    <small className="opacity-5 ps-1">
                                      hires
                                    </small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
