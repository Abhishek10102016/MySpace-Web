import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';
import {
  department,
  designation,
  employee,
  mentor,
} from '../../../types/types';
// import { useLocation } from 'react-router-dom';
import {
  genders,
  employmentTypes,
  workModes,
  maritalStatus,
  employeeStatus,
} from '../../../constants/Static';

/* eslint-disable-next-line */
export interface EmployeeformProps {
  onSubmit: SubmitHandler<employee>;
  validationSchema: ZodType<employee | unknown>;
  data?: employee;
  departments?: department[];
  mentors?: mentor[];
  designations?: designation[];
}

export function Employeeform(props: EmployeeformProps) {
  // const preLoadedValues = props.data && props.data;
  const preLoadedValues = props.data && JSON.parse(JSON.stringify(props.data));
  if (preLoadedValues?.dateOfBirth) {
    preLoadedValues.dateOfBirth = preLoadedValues.dateOfBirth
      .toString()
      .split('T')[0];
    if (preLoadedValues.employment) {
      preLoadedValues.employment.dateOfJoining =
        preLoadedValues.employment.dateOfJoining.toString().split('T')[0];
    }
  }

  // const location = useLocation();
  const disableEmpForm: boolean =
    window.location.pathname === '/employee/personaldetails' ? true : false;
  // let disableEmpForm = true;
  // if (props.data?.bankDetails) {
  //   props.data.isProfileCompleted = true;
  //   disableEmpForm = props.data?.isProfileCompleted ? false : true;
  // }
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<employee>({
    resolver: zodResolver(props.validationSchema),
    defaultValues: preLoadedValues && preLoadedValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: 'bankDetails',
    control,
  });

  return (
    <div className="card">
      <div className="card-body">
        <div className="row" style={{ maxWidth: '1150px' }}>
          <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className=" col-12">
              <div className="border-bottom rounded border-300 mb-4">
                <div className="p-4 bg-white border rounded mb-6 box-shadow">
                  <h4 className="mb-2">Personal Details 11</h4>
                  <div className="row g-3">
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.firstName
                                ? 'form-control error'
                                : 'form-control'
                            }
                            placeholder="First Name"
                            type="text"
                            id="firstName"
                            {...register('firstName')}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="firstName"
                          >
                            First Name
                          </label>
                          {errors.firstName && (
                            <p className="error-text">
                              {errors.firstName?.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.middleName
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="text"
                            placeholder="Middle Name"
                            id="middleName"
                            {...register('middleName')}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="middleName"
                          >
                            Middle Name
                          </label>
                          {errors.middleName && (
                            <p className="error-text">
                              {errors.middleName?.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.lastName
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="text"
                            id="lastName"
                            placeholder="Last Name"
                            {...register('lastName')}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="lastName"
                          >
                            Last Name
                          </label>
                          {errors.lastName && (
                            <p className="error-text">
                              {errors.lastName?.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.dateOfBirth
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="date"
                            id="dateOfBirth"
                            placeholder="Date of birth"
                            {...register('dateOfBirth', { valueAsDate: true })}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="dateOfBirth"
                          >
                            Date Of Birth
                          </label>
                          {errors.dateOfBirth && (
                            <p className="error-text">
                              {errors.dateOfBirth?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <select
                            className={
                              errors.gender
                                ? 'form-select error'
                                : 'form-select'
                            }
                            id="gender"
                            {...register('gender')}
                            autoComplete="off"
                          >
                            <option value="" defaultValue="">
                              Select Your Gender
                            </option>
                            {genders &&
                              genders.map((item) => (
                                <option key={item.id} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="gender"
                          >
                            Gender
                          </label>
                          {errors.gender && (
                            <p className="error-text">
                              {errors.gender?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <select
                            className={
                              errors.maritalStatus
                                ? 'form-select error'
                                : 'form-select'
                            }
                            id="maritalStatus"
                            {...register('maritalStatus')}
                          >
                            <option value="" defaultValue="">
                              Select Your Marital Status
                            </option>
                            {maritalStatus &&
                              maritalStatus.map((item) => (
                                <option key={item.id} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="maritalStatus"
                          >
                            Marital Status
                          </label>
                          {errors.maritalStatus && (
                            <p className="error-text">
                              {errors.maritalStatus?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.fatherName
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="text"
                            id="fatherName"
                            placeholder="Father Name"
                            {...register('fatherName')}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="fatherName"
                          >
                            Father Name
                          </label>
                          {errors.fatherName && (
                            <p className="error-text">
                              {errors.fatherName?.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.spouseName
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="text"
                            id="spouseName"
                            placeholder="Spouse Name"
                            {...register('spouseName')}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="spouseName"
                          >
                            Spouse Name
                          </label>
                          {errors.spouseName && (
                            <p className="error-text">
                              {errors.spouseName?.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.nomineeName
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="text"
                            id="nomineeName"
                            placeholder="Nominee Name"
                            {...register('nomineeName')}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="nomineeName"
                          >
                            Nominee Name
                          </label>
                          {errors.nomineeName && (
                            <p className="error-text">
                              {errors.nomineeName?.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.nomineeRelation
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="text"
                            id="nomineeRelation"
                            placeholder="Nominee Relation"
                            {...register('nomineeRelation')}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="nomineeRelation"
                          >
                            Nominee Relation
                          </label>
                          {errors.nomineeRelation && (
                            <p className="error-text">
                              {errors.nomineeRelation?.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.email
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="email"
                            id="email"
                            placeholder="Email"
                            {...register('email')}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          {errors.email && (
                            <p className="error-text">
                              {errors.email?.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <select
                            className={
                              errors.nationality
                                ? 'form-select error'
                                : 'form-select'
                            }
                            id="nationality"
                            {...register('nationality')}
                            autoComplete="off"
                          >
                            {/* replace with constant */}
                            <option value="">Select Your Nationality</option>
                            <option value="Indian">Indian</option>
                            <option value="American">American</option>
                          </select>
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="nationality"
                          >
                            Nationality
                          </label>
                          {errors.nationality && (
                            <p className="error-text">
                              {errors.nationality?.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className=" col-12">
              <div className="border-bottom rounded border-300 mb-4">
                <div className="p-4 bg-white border rounded mb-6 box-shadow">
                  <h4 className="mb-2">Bank Account Details</h4>
                  <div className="row g-3">
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.firstName && errors.firstName
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="text"
                            id="firstName"
                            placeholder="firstName"
                            {...register('firstName')}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="firstName"
                          >
                            Bank Account
                          </label>
                          {errors.firstName && (
                            <p className="error-text">
                              {errors.firstName?.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.pan ? 'form-control error' : 'form-control'
                            }
                            type="text"
                            id="pan"
                            placeholder="Enter Pan Details"
                            {...register('pan')}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="pan"
                          >
                            Pan
                          </label>
                          {errors.pan && (
                            <p className="error-text">{errors.pan?.message}</p>
                          )}
                        </div>
                        <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.aadhar
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="text"
                            id="aadhar"
                            placeholder="Aadhar"
                            {...register('aadhar')}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="aadhar"
                          >
                            Aadhar
                          </label>
                          {errors.aadhar && (
                            <p className="error-text">
                              {errors.aadhar?.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className=" col-12">
              <div className="border-bottom rounded border-300 mb-4">
                <div className="p-4 bg-white border rounded mb-6 box-shadow">
                  <h4 className="mb-2">Bank Account Details</h4>

                  <div className="row g-3">
                    <div className="row">
                      <div className="col-12 col-4">
                        {errors.bankDetails && (
                          <p className="error-text">
                            {errors.bankDetails?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {fields.map((field, index) => {
                      return (
                        <div className="row g-3" key={field.id}>
                          {/* bank details here  */}
                          <div>
                            <div>Bank Account {index + 1}</div>
                            <div
                              className="text-danger"
                              onClick={() => {
                                remove(index);
                              }}
                            >
                              remove
                            </div>
                          </div>

                          <div className="col-12 col-sm-6">
                            <div className="form-icon-container">
                              <div className="form-floating">
                                <input
                                  className={
                                    errors.bankDetails?.[index]?.accountNumber
                                      ? 'form-control error'
                                      : 'form-control'
                                  }
                                  type="text"
                                  id="accountNumber"
                                  placeholder="Account Number"
                                  {...register(
                                    `bankDetails.${index}.accountNumber`
                                  )}
                                  autoComplete="off"
                                />
                                <label
                                  className="text-700 form-icon-label"
                                  htmlFor="accountNumber"
                                >
                                  Account Number
                                </label>
                                {errors.bankDetails && (
                                  <p className="error-text">
                                    {
                                      errors.bankDetails?.[index]?.accountNumber
                                        ?.message
                                    }
                                  </p>
                                )}
                              </div>
                              <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                            </div>
                          </div>

                          <div className="col-12 col-sm-6">
                            <div className="form-icon-container">
                              <div className="form-floating">
                                <input
                                  className={
                                    errors.bankDetails?.[index]?.ifscCode
                                      ? 'form-control error'
                                      : 'form-control'
                                  }
                                  type="text"
                                  id="isfcCode"
                                  placeholder="ISFC Code"
                                  {...register(`bankDetails.${index}.ifscCode`)}
                                  autoComplete="off"
                                />

                                <label
                                  className="text-700 form-icon-label"
                                  htmlFor="isfcCode"
                                >
                                  ISFC Code
                                </label>

                                {errors.bankDetails && (
                                  <p className="error-text">
                                    {
                                      errors.bankDetails?.[index]?.ifscCode
                                        ?.message
                                    }
                                  </p>
                                )}
                              </div>

                              <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                            </div>
                          </div>

                          <div className="col-12 col-sm-6">
                            <div className="form-icon-container">
                              <div className="form-floating">
                                <input
                                  className={
                                    errors.bankDetails?.[index]?.branch
                                      ? 'form-control error'
                                      : 'form-control'
                                  }
                                  type="text"
                                  id="branch"
                                  placeholder="Branch"
                                  {...register(`bankDetails.${index}.branch`)}
                                  autoComplete="off"
                                />

                                <label
                                  className="text-700 form-icon-label"
                                  htmlFor="branch"
                                >
                                  Branch
                                </label>

                                {errors.bankDetails && (
                                  <p className="error-text">
                                    {
                                      errors.bankDetails?.[index]?.branch
                                        ?.message
                                    }
                                  </p>
                                )}
                              </div>

                              <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                            </div>
                          </div>

                          <div className="col-12 col-sm-6">
                            <div className="form-icon-container">
                              <div className="form-floating">
                                <input
                                  className={
                                    errors.bankDetails?.[index]?.name
                                      ? 'form-control error'
                                      : 'form-control'
                                  }
                                  type="text"
                                  id="name"
                                  placeholder="Name"
                                  {...register(`bankDetails.${index}.name`)}
                                  autoComplete="off"
                                />

                                <label
                                  className="text-700 form-icon-label"
                                  htmlFor="name"
                                >
                                  Name
                                </label>

                                {errors.bankDetails && (
                                  <p className="error-text">
                                    {errors.bankDetails?.[index]?.name?.message}
                                  </p>
                                )}
                              </div>

                              <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                            </div>
                          </div>

                          {/* bank details end;  */}
                        </div>
                      );
                    })}

                    <div className="col-12 col-sm-4">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          append({
                            accountNumber: '',
                            ifscCode: '',
                            branch: '',
                            name: '',
                          });
                        }}
                      >
                        Add Bank Account
                      </button>
                    </div>

                    <div className="col-12 col-sm-4"></div>

                    <div className="col-12 col-sm-4"></div>

                    <div className="col-12 col-sm-6">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.pan ? 'form-control error' : 'form-control'
                            }
                            type="text"
                            id="pan"
                            placeholder="Enter Pan Details"
                            {...register('pan')}
                            autoComplete="off"
                          />

                          <label
                            className="text-700 form-icon-label"
                            htmlFor="pan"
                          >
                            Pan
                          </label>

                          {errors.pan && (
                            <p className="error-text">{errors.pan?.message}</p>
                          )}
                        </div>

                        <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.aadhar
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="text"
                            id="aadhar"
                            placeholder="Aadhar"
                            {...register('aadhar')}
                            autoComplete="off"
                          />

                          <label
                            className="text-700 form-icon-label"
                            htmlFor="aadhar"
                          >
                            Aadhar
                          </label>

                          {errors.aadhar && (
                            <p className="error-text">
                              {errors.aadhar?.message}
                            </p>
                          )}
                        </div>

                        <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" col-12">
              <div className="border-bottom rounded border-300 mb-4">
                <div className="p-4 bg-white border rounded mb-6 box-shadow">
                  <h4 className="mb-2">Employment Details</h4>
                  <div className="row g-3">
                    {/* date of joining */}
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.employment?.dateOfJoining
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="date"
                            id="dateOfJoining"
                            placeholder="Date of Joining"
                            {...register('employment.dateOfJoining', {
                              valueAsDate: true,
                            })}
                            disabled={disableEmpForm}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="dateOfJoining"
                          >
                            Date Of Joining
                          </label>
                          {errors.employment?.dateOfJoining && (
                            <p className="error-text">
                              {errors.employment?.dateOfJoining.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* department */}

                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <select
                            className={
                              errors.employment?.departmentId
                                ? 'form-select error'
                                : 'form-select'
                            }
                            id="departmentId"
                            placeholder=""
                            {...register('employment.departmentId', {
                              valueAsNumber: true,
                            })}
                            disabled={disableEmpForm}
                            autoComplete="off"
                          >
                            {/* {!preLoadedValues?.employment?.departmentId && (
                              <option value={0} defaultValue={0}>
                                Select Your Department
                              </option>
                            )} */}

                            <option value={0} defaultValue={0}>
                              Select Your Department
                            </option>

                            {props.departments &&
                              props.departments.map((dep) => (
                                <option
                                  key={dep.departmentId}
                                  value={dep.departmentId}
                                >
                                  {dep.name}
                                </option>
                              ))}
                          </select>
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="departmentId"
                          >
                            Department
                          </label>
                          {errors.employment?.departmentId && (
                            <p className="error-text">
                              {errors.employment?.departmentId.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* designation */}
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <select
                            className={
                              errors.employment?.designationId
                                ? 'form-select error'
                                : 'form-select'
                            }
                            id="designationId"
                            placeholder=""
                            {...register('employment.designationId', {
                              valueAsNumber: true,
                            })}
                            disabled={disableEmpForm}
                            autoComplete="off"
                          >
                            {/* {!preLoadedValues?.employment?.designationId && (
                              <option value={0} defaultValue={0}>
                                Select Your Designation
                              </option>
                            )} */}

                            <option value={0} defaultValue={0}>
                              Select Your Designation
                            </option>

                            {props.designations &&
                              props.designations.map((des) => (
                                <option
                                  key={des.designationId}
                                  value={des.designationId}
                                >
                                  {des.name}
                                </option>
                              ))}
                          </select>
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="designation"
                          >
                            Designation
                          </label>
                          {errors.employment?.designationId && (
                            <p className="error-text">
                              {errors.employment?.designationId.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Employment type */}
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <select
                            className={
                              errors.employment?.employmentType
                                ? 'form-select error'
                                : 'form-select'
                            }
                            id="employmentType"
                            placeholder=""
                            {...register('employment.employmentType')}
                            disabled={disableEmpForm}
                            autoComplete="off"
                          >
                            <option value="" defaultValue="">
                              Select Employment Type
                            </option>
                            {employmentTypes &&
                              employmentTypes.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="maritalStatus"
                          >
                            Employment Type
                          </label>
                          {errors.employment?.employmentType && (
                            <p className="error-text">
                              {errors.employment?.employmentType.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Employment status */}
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <select
                            className={
                              errors.status
                                ? 'form-select error'
                                : 'form-select'
                            }
                            id="status"
                            placeholder=""
                            {...register('status')}
                            disabled={disableEmpForm}
                            autoComplete="off"
                          >
                            {/* {!preLoadedValues?.employment?.departmentId && (
                              <option value={0} defaultValue={0}>
                                Select Your Department
                              </option>
                            )} */}

                            <option value="" defaultValue="">
                              Select Employee Status
                            </option>

                            {employeeStatus &&
                              employeeStatus.map((item) => (
                                <option key={item.id} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="status"
                          >
                            Status
                          </label>
                          {errors.status && (
                            <p className="error-text">
                              {errors.status.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Work Mode */}
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <select
                            className={
                              errors.employment?.workMode
                                ? 'form-select error'
                                : 'form-select'
                            }
                            id="workMode"
                            placeholder=""
                            {...register('employment.workMode')}
                            disabled={disableEmpForm}
                            autoComplete="off"
                          >
                            <option value="" defaultValue="">
                              Select Work Mode
                            </option>
                            {workModes &&
                              workModes.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                          </select>
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="maritalStatus"
                          >
                            Work Mode
                          </label>
                          {errors.employment?.workMode && (
                            <p className="error-text">
                              {errors.employment?.workMode.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* UAN */}
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.employment?.uan
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="text"
                            id="uan"
                            placeholder="UAN"
                            {...register('employment.uan')}
                            disabled={disableEmpForm}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="uan"
                          >
                            UAN
                          </label>
                          {errors.employment?.uan && (
                            <p className="error-text">
                              {errors.employment?.uan.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                      </div>
                    </div>

                    {/* ESIC */}
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.employment?.esic
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="text"
                            id="esic"
                            placeholder="ESIC"
                            {...register('employment.esic')}
                            disabled={disableEmpForm}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="esic"
                          >
                            ESIC
                          </label>
                          {errors.employment?.esic && (
                            <p className="error-text">
                              {errors.employment?.esic.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                      </div>
                    </div>

                    {/* CTC */}
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <input
                            className={
                              errors.employment?.ctc
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="number"
                            id="ctc"
                            placeholder="CTC"
                            {...register('employment.ctc', {
                              valueAsNumber: true,
                            })}
                            disabled={disableEmpForm}
                            autoComplete="off"
                          />
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="ctc"
                          >
                            CTC
                          </label>
                          {errors.employment?.ctc && (
                            <p className="error-text">
                              {errors.employment?.ctc.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-envelope text-900 fs--1 form-icon"></span>
                      </div>
                    </div>

                    {/* Mentor */}
                    <div className="col-12 col-sm-4">
                      <div className="form-icon-container">
                        <div className="form-floating">
                          <select
                            className={
                              errors.mentorId
                                ? 'form-select error'
                                : 'form-select'
                            }
                            id="mentorId"
                            placeholder=""
                            {...register('mentorId', {
                              valueAsNumber: true,
                            })}
                            disabled={disableEmpForm}
                            autoComplete="off"
                          >
                            {/* {!preLoadedValues?.mentorId && (
                              <option value={0} defaultValue={0}>
                                Select Your Mentor
                              </option>
                            )} */}
                            <option value={0} defaultValue={0}>
                              Select Your Mentor
                            </option>
                            {props.mentors &&
                              props.mentors.map((emp) => (
                                <option
                                  key={emp.employeeId}
                                  value={emp.employeeId}
                                >
                                  {emp.employeeName}
                                </option>
                              ))}
                          </select>
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="mentorId"
                          >
                            Mentor
                          </label>
                          {errors?.mentorId && (
                            <p className="error-text">
                              {errors.mentorId.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-end my-4">
              <div>
                <button className="btn btn-secondary me-2" type="reset">
                  Cancel Changes
                </button>
                <button className="btn btn-success" type="submit">
                  Save Information
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Employeeform;
