import { ChangeEvent, useState, useMemo } from 'react';
import { Modal } from 'react-bootstrap';
import { employeeService } from '../../../../services/API/Employee';
import { IRegisterFormValues, employee } from '../../../../types/types';
import {
  regMiddleName,
  emailRegex,
  passwordRegex,
  regName,
} from '../../../../constants/regex';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Popup } from '../../../popup/popup';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastrService } from '../../../../services/Toastr';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_ALL_EMPLOYEES,

} from '../../../../services/graphql/employeeQueries';
import { REGISTER_EMPLOYEE } from '../../../../services/graphql/employeeMutations';
import { toast } from 'react-toastify';

/* eslint-disable-next-line */
export interface EmployeelistProps { }

const validationSchema: ZodType<IRegisterFormValues> = z.object({
  firstName: z
    .string()
    .nonempty('First Name is required')
    .refine((val) => regName.test(val), { message: 'Enter Valid First Name' }),

  middleName: z
    .string()
    .refine((val) => regMiddleName.test(val), { message: 'Enter valid name' }),

  lastName: z
    .string()
    .nonempty('Last Name is required')
    .refine((val) => regName.test(val), {
      message: 'Enter Valid Last Name',
    }),

  email: z
    .string()
    .nonempty('email is required')
    .refine((val) => emailRegex.test(val), {
      message: 'please enter valid email',
    }),

  userName: z.string().nonempty('please enter username'),

  password: z
    .string()
    .nonempty('Please set password')
    .refine((val) => passwordRegex.test(val), {
      message:
        'password must have at least one number and both lower and uppercase letters and special characters',
    }),
});

export function Employeelist(props: EmployeelistProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>({
    resolver: zodResolver(validationSchema),
  });

  const [resetPaginationToggle, setResetPaginationToggle] =
    useState<boolean>(false);

  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
  });
  const [sorting, setSorting] = useState({
    column: 'firstName',
    direction: 'asc',
  });
  const [searchQuery, setSearchQuery] = useState('');

  // fetching employee list from graphql endpoint
  const { data, loading, error } = useQuery(GET_ALL_EMPLOYEES, {
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

  // fetching total count from graphql endpoint
  // const { data: count } = useQuery(GET_TOTAL_COUNT);
  // if (count) console.log(count);

  // Mutation for employee registration
  const [addEmployee] = useMutation(REGISTER_EMPLOYEE, {
    refetchQueries: [GET_ALL_EMPLOYEES],
  });

  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(0);
  const [popupFunction, setPopupFunction] = useState('');
  const [showEmployeeModal, setEmployeeModal] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const displayPopup = (id: number, action: string) => {
    setUserId(id);
    setPopupFunction(action);
    handleShow();
  };

  const handleEmployeeModal = () => {
    if (showEmployeeModal) {
      setEmployeeModal(false);
    } else {
      setEmployeeModal(true);
    }
  };

  const columns: TableColumn<employee>[] = [
    {
      name: 'EmployeeId',
      selector: (row) => row.employeeId,
      sortable: true,
      sortField: 'employeeId',
    },
    {
      name: 'Name',
      selector: (row) =>
        row.middleName
          ? row.firstName + row.middleName + row.lastName
          : row.firstName + ' ' + row.lastName,
      sortable: true,
      sortField: 'firstName',
    },
    {
      name: 'DOB',
      selector: (row) =>
        (row.dateOfBirth && new Date(row.dateOfBirth).toLocaleDateString()) ||
        '',
      sortable: true,
      sortField: 'dateOfBirth',
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      sortField: 'email',
    },
    {
      name: 'Gender',
      selector: (row) => row.gender,
    },
    {
      name: 'Marital Status',
      selector: (row) => row.maritalStatus,
    },
    {
      name: 'Nationality',
      selector: (row) => row.nationality,
    },
    {
      name: 'Status',
      selector: (row) => (row.status && row.status) || '',
      cell: (row) =>
        row.status === 'Active' ? (
          <span className="badge bg-light-success text-success rounded-pill">
            Active
          </span>
        ) : (
          <span className="badge bg-light-info text-info rounded-pill">
            Inactive
          </span>
        ),
    },
    {
      name: 'Action',

      selector: (row) => row.userId,
      cell: (row) => (
        <>
          <Link to={`/employee/${row.employeeId}`}>
            <i className="material-icons pr-5">edit </i>
          </Link>
          <button
            style={{ border: 'none', backgroundColor: 'white' }}
            onClick={() => displayPopup(row.userId, 'delete')}
          >
            <i className="material-icons pl-5">delete_outline</i>
          </button>
        </>
      ),
    },
  ];

  const submitEmployeeRegistrationForm: SubmitHandler<
    IRegisterFormValues
  > = async (data) => {
    await addEmployee({
      variables: {
        request: data,
      },
    })
      .then((res) => {
        if (!res.data?.registerEmployee.result) {
          if (res.data?.registerEmployee.errorMessage !== undefined && res.data?.registerEmployee.errorMessage !== null)
            ToastrService.error(res.data?.registerEmployee.errorMessage[0]);
          else {
            ToastrService.error("msg")
          }
        }
        else {
          ToastrService.success('Employee added successfully');
          setEmployeeModal(false);
        }
      })
      .catch((err) => {
        ToastrService.error('Failed');
      });
  };

  const handleDelete = async () => {
    await employeeService
      .deleteEmployee(userId)
      .then((res) => {
        ToastrService.success('Employee deactivated successfully');

        handleClose();
      })
      .catch((err) => {
        ToastrService.error('Error occurred' + err);
      });
  };

  const handleSort = async (
    column: TableColumn<employee>,
    sortDirection: string
  ) => {
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
                  <div className="mb-4">
                    <ol className="breadcrumb mb-0 p-0 bg-transparent">
                      <li className="breadcrumb-item">
                        <Link to="/dashboard">Home</Link>
                      </li>
                      <li className="breadcrumb-item active d-flex align-items-center">
                        Employees
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="d-flex align-items-center">
                    <div>
                      <h3 className="text-dark mb-0">Employee List</h3>
                    </div>
                    <div className="ms-auto">
                      <button
                        className="btn btn-sm btn-success p-2 px-3 mb-0"
                        onClick={handleEmployeeModal}
                      >
                        <i className="material-icons text-white lh-175">add</i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="row" style={{ maxWidth: '1150px' }}>
                    <div className="col-md-2 col-6">
                      <div className="form-icon-container">
                        <div className="d-flex">{subHeaderComponentMemo}</div>
                        <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                      </div>
                    </div>
                    <div className="col-md-2 col-6">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className="form-control"
                            id="timepicker2"
                            type="date"
                            placeholder="Joining Date"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="timepicker2"
                          >
                            Joining Date
                          </label>
                        </div>
                        <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                      </div>
                    </div>
                    <div className="col-md-2 col-6">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <select
                            className="form-select"
                            id="floatingSelect"
                            aria-label="Floating label select example"
                          >
                            <option value={0}>Salect your Status </option>
                            <option value="1">Active </option>
                            <option value="2">Inactive</option>
                          </select>
                          <label htmlFor="floatingSelect"> Status</label>
                        </div>
                        <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                      </div>
                    </div>
                    <div className="col-md-2 col-6">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <select
                            className="form-select"
                            id="floatingSelect"
                            aria-label="Floating label select example"
                          >
                            <option value="0">Select your Job Role </option>
                            <option value="1">UI Designer </option>
                            <option value="2">Web Designer</option>
                            <option value="3">Ux Designer</option>
                          </select>
                          <label htmlFor="floatingSelect">Job Role</label>
                        </div>
                        <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                      </div>
                    </div>
                    <div className="col-md-2 col-12">
                      <div className="text-center width-50">
                        <button className="btn btn-outline-success apply-btn">
                          Apply
                        </button>
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
                        <DataTable
                          columns={columns}
                          data={(data?.employeeList.result.employeeList as employee[]) || []}
                          pagination
                          paginationServer
                          paginationDefaultPage={pagination.page}
                          paginationPerPage={pagination.perPage}
                          paginationTotalRows={data.employeeList.result.totalCount}
                          paginationResetDefaultPage={resetPaginationToggle}
                          onChangePage={handlePageChange}
                          onChangeRowsPerPage={handlePerRowsChange}
                          onSort={handleSort}
                          sortServer
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* employee register modal */}
      <Modal
        show={showEmployeeModal}
        onHide={() => setEmployeeModal(false)}
        className="emp_modal"
      >
        <Modal.Header>
          <div className="modal-header d-flex w-100">
            <div>
              <h4 className="mb-0">Personal Information</h4>
            </div>

            <div>
              <button
                type="button"
                className="btn-close"
                onClick={() => setEmployeeModal(false)}
              ></button>
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className="modal-body">
            <form
              autoComplete="off"
              onSubmit={handleSubmit(submitEmployeeRegistrationForm)}
            >
              <div className="mb-3">
                <div className="form-group mb-3">
                  <div className="form-icon-container">
                    <div
                      className={`${errors.firstName
                        ? 'input-control error'
                        : 'input-control'
                        }`}
                    >
                      <div className="form-floating">
                        <input
                          className="form-control"
                          id="firstName"
                          type="text"
                          placeholder="Employee Name"
                          {...register('firstName')}
                        />

                        <label
                          className="text-700 form-icon-label"
                          htmlFor="firstName"
                        >
                          First Name
                        </label>
                      </div>

                      <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>

                      {errors.firstName && (
                        <p className="error-text">
                          {errors.firstName?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-group mb-3">
                  <div className="form-icon-container">
                    <div
                      className={`${errors.middleName
                        ? 'input-control error'
                        : 'input-control'
                        }`}
                    >
                      <div className="form-floating">
                        <input
                          className="form-control"
                          id="middleName"
                          type="text"
                          placeholder="Middle Name"
                          {...register('middleName')}
                        />

                        <label
                          className="text-700 form-icon-label"
                          htmlFor="middleName"
                        >
                          Middle Name
                        </label>
                      </div>

                      <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>

                      {errors.middleName && (
                        <p className="error-text">
                          {errors.middleName?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-group mb-3">
                  <div className="form-icon-container">
                    <div
                      className={`${errors.lastName
                        ? 'input-control error'
                        : 'input-control'
                        }`}
                    >
                      <div className="form-floating">
                        <input
                          className="form-control"
                          id="lastName"
                          type="text"
                          placeholder="Last Name"
                          {...register('lastName')}
                        />

                        <label
                          className="text-700 form-icon-label"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                      </div>

                      <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>

                      {errors.lastName && (
                        <p className="error-text">{errors.lastName?.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-icon-container">
                  <div
                    className={`${errors.email ? 'input-control error' : 'input-control'
                      }`}
                  >
                    <div className="form-floating">
                      <input
                        className="form-control"
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...register('email')}
                      />

                      <label
                        className="text-700 form-icon-label"
                        htmlFor="email"
                      >
                        Enter Your Email
                      </label>
                    </div>

                    <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>

                    {errors.email && (
                      <p className="error-text">{errors.email?.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-group mb-3">
                  <div className="form-icon-container">
                    <div
                      className={`${errors.userName
                        ? 'input-control error'
                        : 'input-control'
                        }`}
                    >
                      <div className="form-floating">
                        <input
                          className="form-control"
                          id="userName"
                          type="text"
                          placeholder="User Name"
                          {...register('userName')}
                          autoComplete="new-password"
                        />

                        <label
                          className="text-700 form-icon-label"
                          htmlFor="text"
                        >
                          User Name
                        </label>
                      </div>

                      <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>

                      {errors.userName && (
                        <p className="error-text">{errors.userName?.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-group mb-3">
                  <div className="form-icon-container">
                    <div
                      className={`${errors.password
                        ? 'input-control error'
                        : 'input-control'
                        }`}
                    >
                      <div className="form-floating">
                        <input
                          className="form-control"
                          id="password"
                          type="password"
                          placeholder="Password"
                          {...register('password')}
                          autoComplete="new-password"
                        />

                        <label
                          className="text-700 form-icon-label"
                          htmlFor="password"
                        >
                          Password
                        </label>
                      </div>

                      <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>

                      {errors.password && (
                        <p className="error-text">{errors.password?.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer p-0">
                <button
                  type="button"
                  className="btn btn-secondary p-2 px-3"
                  onClick={() => setEmployeeModal(false)}
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="btn btn-success p-2 px-3"
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
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
              onClick={popupFunction === 'delete' ? handleDelete : handleClose}
            >
              {popupFunction === 'delete' ? 'Delete' : 'Update'}
            </button>
          }
        />
      </form>
    </>
  );
}

export default Employeelist;
