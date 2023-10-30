import { ChangeEvent, useState, useMemo, useEffect } from 'react';
import { leaveRequest } from '../../../../types/types';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { ToastrService } from '../../../../services/Toastr';
import { useQuery, useMutation } from '@apollo/client';
import { leavesQuery } from '../../../../services/graphql/leaveQueries';
import { Modal } from 'react-bootstrap';
import Leaveapply from '../leaveapply/leaveapply';
import Popup from '../../../popup/popup';
import { toast } from 'react-toastify';
import { LeavesMutation } from '../../../../services/graphql/leaveMutation';
import { RequestedForTypes } from '../../../../constants/Static';
/* eslint-disable-next-line */
export interface LeavestableProps { }

export function MyLeaves(props: LeavestableProps) {
  const [resetPaginationToggle, setResetPaginationToggle] =
    useState<boolean>(false);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
  });
  const [sorting, setSorting] = useState({
    column: 'leaveRequestId',
    direction: 'asc',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmployeeModal, setShowEmployeeModal] = useState<boolean>(false);
  const [leaveRequestId, setLeaveRequestId] = useState<any>(null);
  const [show, setShow] = useState(false)
  const [popupFunction, setPopupFunction] = useState('');
  const [openTab, setOpenTab] = useState<string>("Leaves");
  const [WFHData, setWFHData] = useState<Array<Object>>([])
  const handleClose = () => setShow(false);

  // fetching leave list from graphql endpoint
  let test = null;
  if (test === null) {
    test = useQuery(leavesQuery.GET_MY_lEAVES);
  }
  // const { data, loading, error } = useQuery(leavesQuery.GET_MY_lEAVES);

  const { data, loading, error } = test;
  const [cancelLeave] = useMutation(LeavesMutation.cancelLeaveRequest, {
    refetchQueries: [leavesQuery.GET_MY_lEAVES],
  });


  const handleDeleteLeave = async (leaveRequestId: number) => {
    console.log("leaveRequestId", leaveRequestId)
    await cancelLeave({
      variables: {
        leaveRequestId: leaveRequestId as number
      }
    }
    ).then((result) => {
      console.log("result", result)
      setShow(false)
      toast.success(` Leave cancelled  successfully`)
    }).catch((error) => {
      toast.success(`Something went wrong`)
    })
  }


  const displayPopup = (leaveRequestId: number, action: string) => {
    console.log("leaveRequestId", leaveRequestId)
    setLeaveRequestId(leaveRequestId)
    setPopupFunction(action);
    setShow(true);
  };

  const columns: TableColumn<leaveRequest>[] = [
    {
      name: 'From',
      selector: (row) =>
        (row.from && new Date(row.from).toLocaleDateString()) || '',
      sortable: true,
      sortField: 'from',
    },
    {
      name: 'To',
      selector: (row) =>
        (row.to && new Date(row.to).toLocaleDateString()) || '',
      sortable: true,
      sortField: 'to',
    },
    {
      name: 'Days',
      selector: (row) => (row.days ? row.days : ''),
      sortable: true,
      sortField: 'name',
    },
    {
      name: 'Leave Status',
      selector: (row) => row.leaveStatusCode || '',
      cell: (row) =>
        row.leaveStatusCode === 'APPROVED' ? (
          <span className="badge bg-light-success text-success rounded-pill">
            {row.leaveStatusCode}
          </span>
        ) : row.leaveStatusCode === 'PENDING' ? (
          <span className="badge bg-light-warning text-warning rounded-pill">
            {row.leaveStatusCode}
          </span>
        ) : row.leaveStatusCode === 'REJECTED' ? (
          <span className="badge bg-light-danger text-danger rounded-pill">
            {row.leaveStatusCode}
          </span>
        ) : (
          <span className="badge bg-light-danger text-danger rounded-pill">
            {row.leaveStatusCode}
          </span>
        ),
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => (row.leaveRequestId ? row.leaveRequestId : ''),
      cell: (row: any) => (
        <>  
          <button style={{ border: 'none', backgroundColor: 'white' }}
            onClick={() => { setLeaveRequestId(row.leaveRequestId), setShowEmployeeModal(true) }}>
            <i className="material-icons pr-5">edit</i>
          </button>
          <button style={{ border: 'none', backgroundColor: 'white' }}>
            <i className="material-icons pl-5" onClick={() => displayPopup(row.leaveRequestId, 'delete')}>delete_outline</i>
          </button>
        </>
      ),
    },
  ];

  const handleSort = async (
    column: TableColumn<leaveRequest>,
    sortDirection: string
  ) => {
    console.log(column, sortDirection);

    if (column.sortField)
      setSorting({ column: column.sortField, direction: sortDirection });
  };

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, page });
  };

  const handlePerRowsChange = (perPage: number) => {
    setPagination({ ...pagination, perPage });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };
  const handleTab = (e: any) => {
    setOpenTab(e.target.name);
  }
  // component for searching as per datatable documentation
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (searchQuery) {
        setResetPaginationToggle(!resetPaginationToggle);
        setSearchQuery('');
      }
    };
    // const handleChangeRequestFor = (e: any) => {
    //   const selectedId = e.target.value;
    //   const selectedName = RequestedForTypes.find((item) => item.id === selectedId)?.name;
    //   console.log("selectedName", selectedName)
    //   setpageName(selectedName || '');
    // }
    return (
      <>

        {/* <div className='d-flex'>
          <div className="form-floating">
            <input
              className="form-control search-box"
              type="search"
              placeholder="Search"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleSearch(e.target.value);
              }}
              value={searchQuery}
            />
            <label className="text-700 form-icon-label" htmlFor="timepicker2">
              Search
            </label>
          </div>

        </div> */}
        <div className="d-flex align-items-center">
          <div className="ms-auto">
            {/* <Link
              to="/leaveapply"
              className="btn btn-sm btn-success p-2 px-3 mb-0"
            >
              Apply for leave
            </Link> */}
            <button
              onClick={() => {
                setShowEmployeeModal(true);
                setLeaveRequestId(null);
              }}
              className="btn btn-sm btn-success p-2 px-3 mb-0"
            >
              <i className="material-icons text-white lh-175">add</i>
            </button>
          </div>
        </div >
      </>
    );
  }, [searchQuery, resetPaginationToggle]);

  return (
    <>
      <div className="page-wrapper">
        <div className="container-fluid">
          <div className="reverse-mode">
            <div
              className="overflow-hidden dashboard-part"
              style={{ height: '100%' }}
            >
              <div className="row page-titles">
                <div className="col-md-12">
                  <div className="mb-0">
                    {/* <ol className="breadcrumb mb-0 p-0 bg-transparent">
                      <li className="breadcrumb-item">
                        <Link to="/dashboard">Home</Link>
                      </li>
                      <li className="breadcrumb-item active d-flex align-items-center">
                        Leave Requests
                      </li>
                    </ol> */}
                    <ol className="breadcrumb mb-0 p-0 bg-transparent">
                      <li className="breadcrumb-item active d-flex align-items-center">
                        <p className='fw-bolder mb-0'>{openTab}</p>
                      </li>
                    </ol>
                  </div>
                </div>
                {/* <div className="col-md-12">
                <div className="d-flex align-items-center">
                  {/* <div>
                    <h3 className="text-dark mb-0">Leave Request List</h3>
                  </div> */}
                {/* <div className="ms-auto"> */}
                {/* link to navigate */}
                {/* <Link
                      to="/leaveapply"
                      className="btn btn-sm btn-success p-2 px-3 mb-0"
                    >
                      Apply for leave
                    </Link>
                  </div>
                </div>
              </div> */}
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="row" style={{ maxWidth: '1150px' }}>
                    <div className="col-md-12 col-12">
                      <div className="form-icon-container">
                        <div className="w-100 ">
                          {subHeaderComponentMemo}
                          <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button className={openTab == "Leaves" ? "nav-link active" : "nav-link "} name="Leaves" id="home-tab" onClick={(e) => handleTab(e)} data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Leaves</button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button className={openTab == "WFH" ? "nav-link active" : "nav-link "} id="profile-tab" name="WFH" onClick={(e) => handleTab(e)} data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">WFH</button>
                            </li>
                          </ul>
                          {/* <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
                          </div> */}
                        </div>
                        <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                      </div>
                    </div>
                  </div>
                  {loading && (
                    <div className="col-lg-12">
                      <p className="text-center">loading...</p>
                    </div>
                  )}
                  {error && (
                    <div className="col-lg-12">
                      <p className="text-center">{error?.message}</p>
                    </div>
                  )}
                  {data && (
                    <div className="col-lg-12">
                      <div className="table-responsive mt-3 no-wrap">
                        {data && (openTab == "Leaves") && (<DataTable
                          columns={columns}
                          data={(data?.myLeaves.result as leaveRequest[]) || []}
                          pagination
                        // paginationServer
                        // paginationDefaultPage={pagination.page}
                        // paginationPerPage={pagination.perPage}
                        // paginationTotalRows={data.leaveRequestList.length}
                        // paginationResetDefaultPage={resetPaginationToggle}
                        // onChangePage={handlePageChange}
                        // onChangeRowsPerPage={handlePerRowsChange}
                        // onSort={handleSort}
                        // sortServer
                        />
                        )}

                        {openTab == "WFH" && WFHData.length > 0 && (
                          <div className="col-lg-12">
                            <div className="table-responsive mt-3 no-wrap">
                              <DataTable
                                columns={columns}
                                data={(data?.myLeaves.result as leaveRequest[]) || []}
                                pagination
                              // paginationServer
                              // paginationDefaultPage={pagination.page}
                              // paginationPerPage={pagination.perPage}
                              // paginationTotalRows={data.leaveRequestList.length}
                              // paginationResetDefaultPage={resetPaginationToggle}
                              // onChangePage={handlePageChange}
                              // onChangeRowsPerPage={handlePerRowsChange}
                              // onSort={handleSort}
                              // sortServer
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showEmployeeModal}
        onHide={() => setShowEmployeeModal(false)}
        className="leave_modal"
      >
        <Modal.Header>
          <div className="modal-header d-flex w-100 p-1">
            <div>
              <h4 className="mb-0">{leaveRequestId ? `Update ${openTab} Request ` : `Apply for ${openTab} `}</h4>
            </div>

            <div>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowEmployeeModal(false)}
              ></button>
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <Leaveapply leaveRequestId={leaveRequestId} showEmployeeModal={showEmployeeModal}
            setShowEmployeeModal={setShowEmployeeModal}
          ></Leaveapply>
        </Modal.Body>
      </Modal>

      <form>
        <Popup
          show={show}
          setShow={setShow}
          title={popupFunction === 'delete' ? 'Delete' : 'Edit'}
          body={
            popupFunction === 'delete' ? (
              'Are you sure want to delete ?'
            ) : (
              <p>react node want to add</p>
            )
          }
          popupAction={
            <button
              type="submit"
              className={
                popupFunction === 'delete'
                  ? 'btn btn-danger'
                  : 'btn btn-primary'
              }
              onClick={() => popupFunction === 'delete' ? handleDeleteLeave(leaveRequestId) : handleClose}
            >
              {popupFunction === 'delete' ? 'Delete' : 'Update'}
            </button>
          }
        />
      </form>
    </>
  );
}

export default MyLeaves;
