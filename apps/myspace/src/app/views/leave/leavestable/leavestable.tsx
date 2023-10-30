import { ChangeEvent, useState, useMemo } from 'react';
import { leaveRequestModel } from '../../../../types/types';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { ToastrService } from '../../../../services/Toastr';
import { useQuery, useMutation } from '@apollo/client';
import { leavesQuery } from '../../../../services/graphql/leaveQueries';
import { PrefilledStatus } from "../../../../constants/PrefilledConstants";
import { useAppSelector } from '../../../../../../myspace/src/store/hooks';
import { GetLeavesForApproverQuery, GetLeavesQuery } from 'apps/myspace/src/types/graphql';
import ApplyLeavePopup from '../approve-reject-leave-popup/approve-reject-leave-popup';
/* eslint-disable-next-line */
export interface LeavestableProps { }

export function Leavestable(props: LeavestableProps) {
  const [resetPaginationToggle, setResetPaginationToggle] = useState<boolean>(false);

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
  });
  const [sorting, setSorting] = useState({
    column: 'leaveRequestId',
    direction: 'asc',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const userData = useAppSelector(state => state.user.userDetails);
  const [leaveApplyModal, setLeaveApplyModal] = useState<boolean>(false);
  const [leaveRequestId, setLeaveRequestId] = useState<any>(null);
  const [openTab, setOpenTab] = useState<string>("Leaves")
  const [WFHData, setWFHData] = useState<Array<Object>>([])
  const roles = PrefilledStatus.Roles;

  var leaveList = null;
  var data: any = null;
  const columnsForApprover: TableColumn<leaveRequestModel>[] = [
    {
      name: 'Name',
      selector: (row) => (row.name ? row.name : ''),
      sortable: true,
      sortField: 'name',
    },
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
      name: 'Status',
      selector: (row) => row.status || '',
      cell: (row) =>
        row.status === 'APPROVED' ? (
          <span className="badge bg-light-success text-success rounded-pill">
            {row.status}
          </span>
        ) : (
          <span className="badge bg-light-info text-info rounded-pill">
            {row.status}
          </span>
        ),
    },
    {
      name: 'Action',
      selector: (row) => (row.leaveRequestId ? row.leaveRequestId : ''),
      cell: (row) => (
        <>
          <Link to={`/employee/edit/${row.leaveRequestId}`}>
            <i className="material-icons pr-5">edit </i>
          </Link>
          <button style={{ border: 'none', backgroundColor: 'white' }}>
            <i className="material-icons pl-5">delete_outline</i>
          </button>
        </>
      ),
    }
  ];
  const columnsForAdmin: TableColumn<leaveRequestModel>[] = [
    // {
    //   name: 'Id',
    //   selector: (row) => (row.leaveRequestId ? row.leaveRequestId : ''),
    //   sortable: true,
    //   sortField: 'leaveRequestId',
    // },
    {
      name: 'Name',
      selector: (row) => (row.name ? row.name : ''),
      sortable: true,
      sortField: 'name',
    },
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
      name: 'Requested To',
      selector: (row) => (row.requestedTo ? row.requestedTo : ''),
      sortable: true,
      sortField: 'requestedTo',
    },
    {
      name: 'Status',
      selector: (row) => row.status || '',
      cell: (row) =>
        row.status === 'APPROVED' ? (
          <span className="badge bg-light-success text-success rounded-pill">
            {row.status}
          </span>
        ) : row.status === 'PENDING' ? (
          <span className="badge bg-light-warning text-warning rounded-pill">
            {row.status}
          </span>
        ) : row.status === 'REJECTED' ? (
          <span className="badge bg-light-danger text-danger rounded-pill">
            {row.status}
          </span>
        ) : (
          <span className="badge bg-light-danger text-danger rounded-pill">
            {row.status}
          </span>
        ),
    },
    {
      name: 'Action',
      selector: (row) => (row.leaveRequestId ? row.leaveRequestId : ''),
      cell: (row) => (
        <>
          <button style={{ border: 'none', backgroundColor: 'white' }}
            onClick={() => handleLeaveApplyPopup(row?.leaveRequestId)}>
            <i className="material-icons pr-5">edit</i>
          </button>
          <button style={{ border: 'none', backgroundColor: 'white' }}>
            <i className="material-icons pl-5">delete_outline</i>
          </button>
        </>
      ),
    }
  ];
  let columns: TableColumn<leaveRequestModel>[] = [];

  //Getting data based on the Role
  if (userData.role === (roles.DeliveryManager || roles.SalesManager || roles.ITManger || roles.AccountManager)) {
    leaveList = useQuery(leavesQuery.GET_LEAVES_FOR_APPROVER, {
      variables: {
        commonRequest: {
          pageCount: pagination.page,
          rowCount: pagination.perPage,
          sortBy: sorting.column,
          orderBy: sorting.direction,
          searchBy: searchQuery,
        },
      },
    })
    data = leaveList.data?.leaveRequestListForApprover;
    columns = columnsForApprover;
  }
  else {
    leaveList = useQuery(leavesQuery.GET_LEAVE_LIST, {
      variables: {
        commonRequest: {
          pageCount: pagination.page,
          rowCount: pagination.perPage,
          sortBy: sorting.column,
          orderBy: sorting.direction,
          searchBy: searchQuery,
        },
      },
    });
    data = leaveList.data?.leaveRequestList;
    columns = columnsForAdmin;
  }

  const { loading, error } = leaveList;
  const handleLeaveApplyPopup = (leaveRequestId: any) => {
    console.log("leaveRequestId", leaveRequestId)
    setLeaveApplyModal(true)
    setLeaveRequestId(leaveRequestId)
  }

  const handleSort = async (
    column: TableColumn<leaveRequestModel>,
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
    setOpenTab(e.target.name)
  }
  // component for searching as per datatable documentation
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (searchQuery) {
        setResetPaginationToggle(!resetPaginationToggle);
        setSearchQuery('');
      }
    };
    return (
      <>
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
        <div>
          <button
            className="btn btn-sm btn-success-outline pby px-3"
            onClick={handleClear}
          >
            <i className="material-icons icon-search">search</i>
          </button>
        </div>
      </>
    );
  }, [searchQuery, resetPaginationToggle]);

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
                <div className="mb-4">
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
              <div className="col-md-12">
                <div className="d-flex align-items-center">
                  <div className="ms-auto">
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row" style={{ maxWidth: '1150px' }}>
                  <div className="col-md-2 col-6">
                    <div className="form-icon-container">
                      {/* <div className="d-flex">{subHeaderComponentMemo}</div> */}
                      <div className="">

                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                          <li className="nav-item" role="presentation">
                            <button className={openTab == "Leaves" ? "nav-link active" : "nav-link "} id="home-tab" onClick={(e) => handleTab(e)} name="Leaves" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Leaves</button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button className={openTab == "WFH" ? "nav-link active" : "nav-link "} onClick={(e) => handleTab(e)} name="WFH" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">WFH</button>
                          </li>
                        </ul>
                        {/* <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"></div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"></div>
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
                {data && openTab == "Leaves" && (
                  <div className="col-lg-12">
                    <div className="table-responsive mt-3 no-wrap">
                      <DataTable
                        columns={columns}
                        data={(data?.result.leaveRequestList as leaveRequestModel[]) || []}
                        pagination
                        paginationServer
                        paginationDefaultPage={pagination.page}
                        paginationPerPage={pagination.perPage}
                        paginationTotalRows={data?.result.totalCount}
                        paginationResetDefaultPage={resetPaginationToggle}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onSort={handleSort}
                        sortServer
                      />
                    </div>
                  </div>
                )}
                {openTab == "WFH" && (WFHData && WFHData.length > 0) && (
                  <div className="col-lg-12">
                    <div className="table-responsive mt-3 no-wrap">
                      {/* <DataTable
                        columns={columns}
                        data={(data?.result.leaveRequestList as leaveRequestModel[]) || []}
                        pagination
                        paginationServer
                        paginationDefaultPage={pagination.page}
                        paginationPerPage={pagination.perPage}
                        paginationTotalRows={data?.result.totalCount}
                        paginationResetDefaultPage={resetPaginationToggle}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onSort={handleSort}
                        sortServer
                      /> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {leaveApplyModal &&
        <ApplyLeavePopup
          leaveRequestId={leaveRequestId}
          leaveApplyModal={leaveApplyModal}
          setLeaveApplyModal={setLeaveApplyModal}
        />}
    </div>
  );
}

export default Leavestable;
