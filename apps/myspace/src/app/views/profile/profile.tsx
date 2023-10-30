import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface ProfileProps {}

export function Profile(props: ProfileProps) {
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="reverse-mode">
          <div
            className="right-part overflow-auto dashboard-part"
            style={{ height: '100%' }}
          >
            <div className="row page-titles">
              <div className="col-md-12">
                <div className="mb-4">
                  <ol className="breadcrumb mb-0 p-0 bg-transparent">
                    <li className="breadcrumb-item">
                      <Link to={'/dashboard'}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active d-flex align-items-center">
                      Dashboard
                    </li>
                  </ol>
                </div>
                <div className="content">
                  <div className="mb-9">
                    <div className="row g-6">
                      <div className="col-md-4   col-12">
                        <div className="card blue-border m4-5">
                          <div className="hover-actions-trigger d-flex align-items-center position-relative my-2">
                            <div className="p-3">
                              <input
                                className="d-none"
                                id="upload-settings-porfile-picture"
                                type="file"
                              />
                              <label
                                className="avatar avatar-4xl status-online feed-avatar-profile cursor-pointer"
                                htmlFor="upload-settings-porfile-picture"
                              >
                                <img
                                  className="rounded-circle img-thumbnail bg-white shadow-sm"
                                  src="/apps/myspace/src/assets/images/profile.png"
                                  width="200"
                                  alt=""
                                />
                              </label>
                            </div>
                            <div className="mb-2 align-items-center">
                              <h3 className="me-0">Ansolo Lazinatov</h3>
                              <p className="fw-normal fs-0 p-0 m-0">
                                Sofware Engineer{' '}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg bg-white rounded p-4">
                          <div className="border-bottom border-dashed pb-3 mb-4">
                            <h4 className="mb-2">
                              Who will be able to see your profile?
                            </h4>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                id="onlyMe"
                                type="radio"
                                checked={true}
                                name="profiileVisibility"
                              />
                              <label
                                className="form-check-label fs-0"
                                htmlFor="onlyMe"
                              >
                                Only me
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                id="myFollowers"
                                type="radio"
                                name="profiileVisibility"
                              />
                              <label
                                className="form-check-label fs-0"
                                htmlFor="myFollowers"
                              >
                                My followers
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                id="everyone"
                                type="radio"
                                name="profiileVisibility"
                              />
                              <label
                                className="form-check-label fs-0"
                                htmlFor="everyone"
                              >
                                Everyone
                              </label>
                            </div>
                          </div>
                          <div className="border-bottom border-dashed pb-3 mb-4">
                            <h5 className="text-900 mb-3">Who can tag you?</h5>
                            <div className="form-check">
                              <input
                                className="form-check-input mb-2"
                                id="tagGroupMembers"
                                type="radio"
                                checked={true}
                                name="tagPermission"
                              />
                              <label
                                className="form-check-label fs-0"
                                htmlFor="tagGroupMembers"
                              >
                                Group Members
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input mb-2"
                                id="tagEveryone"
                                type="radio"
                                name="tagPermission"
                              />
                              <label
                                className="form-check-label fs-0"
                                htmlFor="tagEveryone"
                              >
                                Everyone
                              </label>
                            </div>
                          </div>
                          <div className="mb-2">
                            <div className="form-check mb-2 form-switch">
                              <input
                                className="form-check-input"
                                id="showPhone"
                                type="checkbox"
                                checked={true}
                                name="showPhone"
                              />
                              <label
                                className="form-check-label fs-0"
                                htmlFor="showPhone"
                              >
                                Show your phone number
                              </label>
                            </div>
                            <div className="form-check mb-2 form-switch">
                              <input
                                className="form-check-input"
                                id="permitFollow"
                                type="checkbox"
                                checked={true}
                                name="permitFollow"
                              />
                              <label
                                className="form-check-label fs-0"
                                htmlFor="permitFollow"
                              >
                                Permit users to follow you.
                              </label>
                            </div>
                            <div className="form-check mb-2 form-switch">
                              <input
                                className="form-check-input"
                                id="showPhone"
                                type="checkbox"
                                checked={true}
                                name="showPhone"
                              />
                              <label
                                className="form-check-label fs-0"
                                htmlFor="showPhone"
                              >
                                Show your phone number
                              </label>
                            </div>
                            <div className="form-check mb-2 form-switch">
                              <input
                                className="form-check-input"
                                id="permitFollow"
                                type="checkbox"
                                checked={true}
                                name="permitFollow"
                              />
                              <label
                                className="form-check-label fs-0"
                                htmlFor="permitFollow"
                              >
                                Permit users to follow you.
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8 col-12">
                        <div className="border-bottom rounded border-300 mb-4">
                          <div className="p-4 bg-white border rounded mb-6 box-shadow">
                            <h4 className="mb-2">Personal Information</h4>
                            <div className="row g-3">
                              <div className="col-12 col-sm-6">
                                <div className="form-icon-container">
                                  <div className="form-floating">
                                    <input
                                      className="form-control"
                                      id="firstName"
                                      type="text"
                                      placeholder="First Name"
                                    />
                                    <label
                                      className="text-700 form-icon-label"
                                      htmlFor="firstName"
                                    >
                                      First Name
                                    </label>
                                  </div>
                                  <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                                </div>
                              </div>
                              <div className="col-12 col-sm-6">
                                <div className="form-icon-container">
                                  <div className="form-floating">
                                    <input
                                      className="form-control"
                                      id="lastName"
                                      type="text"
                                      placeholder="Last Name"
                                    />
                                    <label
                                      className="text-700 form-icon-label"
                                      htmlFor="lastName"
                                    >
                                      Last Name
                                    </label>
                                  </div>
                                  <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                                </div>
                              </div>
                              <div className="col-12 col-sm-6">
                                <div className="form-icon-container">
                                  <div className="form-floating">
                                    <input
                                      className="form-control"
                                      id="emailSocial"
                                      type="email"
                                      placeholder="Email"
                                    />
                                    <label
                                      className="text-700 form-icon-label"
                                      htmlFor="emailSocial"
                                    >
                                      Enter Your Email
                                    </label>
                                  </div>
                                  <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                                </div>
                              </div>
                              <div className="col-12 col-sm-6">
                                <div className="form-icon-container">
                                  <div className="form-floating">
                                    <input
                                      className="form-control"
                                      id="phone"
                                      type="tel"
                                      placeholder="Phone"
                                    />
                                    <label
                                      className="text-700 form-icon-label"
                                      htmlFor="phone"
                                    >
                                      Enter Your Phone
                                    </label>
                                  </div>
                                  <span className="fa-solid fa-phone text-900 fs--1 form-icon"></span>
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-icon-container">
                                  <div className="form-floating">
                                    <textarea
                                      className="form-control"
                                      id="info"
                                      style={{ height: '115px' }}
                                      placeholder="Info"
                                    ></textarea>
                                    <label
                                      className="text-700 form-icon-label"
                                      htmlFor="info"
                                    >
                                      Info
                                    </label>
                                  </div>
                                  <span className="fa-solid fa-circle-info text-900 fs--1 form-icon"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3 gx-3 mb-6 gy-6 gy-sm-3">
                            <div className="col-12 col-md-6">
                              <div className="p-4 bg-white mr-3 rounded border box-shadow">
                                <h4 className="mb-2">Company Info</h4>
                                <div className="form-icon-container mb-3">
                                  <div className="form-floating">
                                    <input
                                      className="form-control"
                                      id="companyName"
                                      type="text"
                                      placeholder="Company Name"
                                    />
                                    <label
                                      className="text-700 form-icon-label"
                                      htmlFor="companyName"
                                    >
                                      Company Name
                                    </label>
                                  </div>
                                  <span className="fa-solid fa-building text-900 fs--1 form-icon"></span>
                                </div>
                                <div className="form-icon-container">
                                  <div className="form-floating">
                                    <input
                                      className="form-control"
                                      id="website"
                                      type="text"
                                      placeholder="Website"
                                    />
                                    <label
                                      className="text-700 form-icon-label"
                                      htmlFor="website"
                                    >
                                      Website
                                    </label>
                                  </div>
                                  <span className="fa-solid fa-globe text-900 fs--1 form-icon"></span>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="p-4 bg-white ml-3 rounded border box-shadow">
                                <h4 className="mb-2">Change Password</h4>
                                <div className="form-icon-container mb-3">
                                  <div className="form-floating">
                                    <input
                                      className="form-control"
                                      id="oldPassword"
                                      type="password"
                                      placeholder="Old password"
                                    />
                                    <label
                                      className="text-700 form-icon-label"
                                      htmlFor="oldPassword"
                                    >
                                      Old Password
                                    </label>
                                  </div>
                                  <span className="fa-solid fa-lock text-900 fs--1 form-icon"></span>
                                </div>
                                <div className="form-icon-container mb-3">
                                  <div className="form-floating">
                                    <input
                                      className="form-control"
                                      id="newPassword"
                                      type="password"
                                      placeholder="New password"
                                    />
                                    <label
                                      className="text-700 form-icon-label"
                                      htmlFor="newPassword"
                                    >
                                      New Password
                                    </label>
                                  </div>
                                  <span className="fa-solid fa-key text-900 fs--1 form-icon"></span>
                                </div>
                                <div className="form-icon-container">
                                  <div className="form-floating">
                                    <input
                                      className="form-control"
                                      id="newPassword2"
                                      type="password"
                                      placeholder="Confirm New password"
                                    />
                                    <label
                                      className="text-700 form-icon-label"
                                      htmlFor="newPassword2"
                                    >
                                      Confirm New Password
                                    </label>
                                  </div>
                                  <span className="fa-solid fa-key text-900 fs--1 form-icon"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-end my-4">
                            <div>
                              <button className="btn btn-secondary me-2">
                                Cancel Changes
                              </button>
                              <button className="btn btn-success">
                                Save Information
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="mt-2 p-4 bg-white">
                        <h4 className="text-black">Transfer Ownership</h4>
                        <p className="text-700">
                          Transfer this account to another person or to a
                          company repository.
                        </p>
                        <button className="btn btn-warning">Transfer</button>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="mt-2 p-4 bg-white">
                        <h4 className="text-black">Account Deletion</h4>
                        <p className="text-700">
                          Transfer this account to another person or to a
                          company repository.
                        </p>
                        <button className="btn btn-danger">
                          Delete account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  className="card setting-toggle"
                  href="#settings-offcanvas"
                  data-bs-toggle="offcanvas"
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
