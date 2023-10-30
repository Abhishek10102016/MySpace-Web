import { useEffect, useState } from 'react';
import {
  IAddDepartment,
  IAddDepartmentResponse,
  IDepartment,
  IDepartmentById,
  IDepartmentResponse,
  IUpdateDepartment,
} from '../../../../types/types';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Popup } from '../../../popup/popup';
import { Link } from 'react-router-dom';
import { departmentService } from '../../../../services/API/Department';
import { ToastrService } from '../../../../services/Toastr';

/* eslint-disable-next-line */
export interface DepartmentlistProps { }

export function Departmentlist(props: DepartmentlistProps) {
  const [dataSource, setDataSource] = useState<IDepartment[]>([]);
  const [show, setShow] = useState(false);
  const [departmentId, setDepartmentId] = useState(0);
  const [popupFunction, setPopupFunction] = useState('');
  const [departmentName, setDepartmentName] = useState<string>('');

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const displayPopup = (id?: number, action?: string) => {
    id && setDepartmentId(id);
    action && setPopupFunction(action);
    handleShow();
    if (action === 'edit') id && getDepartmentById(id);
  };

  const getDepartmentById = (id: number) => {
    departmentService.getDepartmentById(id).then((resp: IDepartmentById) => {
      setDepartmentName(resp.result.name);
    });
  };

  const columns: TableColumn<IDepartment>[] = [
    {
      name: 'Department Id',
      selector: (row) => row.departmentId,
      sortable: true,
      sortField: 'departmentId',
    },
    {
      name: 'Department Name',
      selector: (row) => row.name,
      sortable: true,
      sortField: 'name',
    },
    {
      name: 'Action',

      selector: (row) => row.departmentId,
      cell: (row) => (
        <>
          <button
            onClick={() => displayPopup(row.departmentId, 'edit')}
            style={{ border: 'none', backgroundColor: 'white' }}
          >
            <i className="material-icons pr-5">edit </i>
          </button>
          <button
            style={{ border: 'none', backgroundColor: 'white' }}
            onClick={() => displayPopup(row.departmentId, 'delete')}
          >
            <i className="material-icons pl-5">delete_outline</i>
          </button>
        </>
      ),
    },
  ];

  const getDepartmentList = () => {
    departmentService.getAllDepartments().then((resp: IDepartmentResponse) => {
      setDataSource(resp.result.departmentList);
    });
  };

  useEffect(() => {
    getDepartmentList();
  }, []);

  const addDepartment = () => {
    const reqDep: IAddDepartment = {
      departmentName: departmentName,
    };
    departmentService
      .addDepartment(reqDep)
      .then((res: IAddDepartmentResponse) => {
        ToastrService.success('Department added successfully');
        setDepartmentName('');
        handleClose();
        getDepartmentList();
      });
  };

  const handleDelete = () => {
    departmentService
      .deleteDepartment(departmentId)
      .then((resp: IAddDepartmentResponse) => {
        ToastrService.success('Department deleted successfully');
        getDepartmentList();
        handleClose();
      });
  };

  const handleUpdateDepartment = () => {
    const reqBody: IUpdateDepartment = {
      departmentId: departmentId,
      departmentName: departmentName,
    };

    departmentService
      .updateDepartment(reqBody)
      .then((resp: IAddDepartmentResponse) => {
        ToastrService.success('Department updated successfully');
        getDepartmentList();
        setDepartmentName('');
        handleClose();
      });
  };

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
                        Department List
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="d-flex align-items-center">
                    <div>
                      <h3 className="text-dark mb-0">Department List</h3>
                    </div>
                    <div className="ms-auto">
                      <button
                        className="btn btn-sm btn-success p-2 px-3 mb-0"
                        onClick={() => displayPopup(0, 'add')}
                      >
                        {/* <i className="material-icons text-white lh-175">add</i> */}
                        Add department
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
                        <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="table-responsive mt-3 no-wrap">
                      <DataTable
                        columns={columns}
                        data={dataSource}
                        pagination
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form>
        <Popup
          show={show}
          setShow={setShow}
          setValues={setDepartmentName}
          title={
            popupFunction === 'delete'
              ? 'Delete'
              : popupFunction === 'edit'
                ? 'Edit'
                : 'Add Department'
          }
          body={
            popupFunction === 'delete' ? (
              'Are you sure want to delete ?'
            ) : (
              <div className="mb-3">
                <div className="form-group mb-3">
                  <div className="form-icon-container">
                    <div className="form-floating">
                      <input
                        className="form-control"
                        id="departmentName"
                        type="text"
                        placeholder="Department Name"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                      />
                      <label
                        className="text-700 form-icon-label"
                        htmlFor="firstName"
                      >
                        Department Name
                      </label>
                    </div>
                    <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                  </div>
                </div>
              </div>
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
              onClick={
                popupFunction === 'delete'
                  ? handleDelete
                  : popupFunction === 'edit'
                    ? handleUpdateDepartment
                    : addDepartment
              }
            >
              {popupFunction === 'delete'
                ? 'Delete'
                : popupFunction === 'edit'
                  ? 'Update'
                  : 'Add'}
            </button>
          }
        />
      </form>
    </>
  );
}

export default Departmentlist;
