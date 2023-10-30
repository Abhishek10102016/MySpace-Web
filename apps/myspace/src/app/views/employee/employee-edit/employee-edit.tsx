import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { employeeService } from '../../../../services/API/Employee';
import Employeeform from '../../../common/employeedetails/employeeform';
import { ZodType, z } from 'zod';
import {
  department,
  designation,
  employee,
  mentor,
} from '../../../../types/types';
import {
  fetchDepartments,
  fetchMentors,
  fetchDesignaitons,
} from '../../../../constants/Static';
import { regAadharNumber, regName, regPan } from '../../../../constants/regex';
import { ToastrService } from '../../../../services/Toastr';
import { GET_EMPLOYEE_BY_ID } from '../../../../services/graphql/employeeQueries';
import { useQuery } from '@apollo/client';

/* eslint-disable-next-line */
export interface EmployeeEditProps { }

export function EmployeeEdit(props: EmployeeEditProps) {
  const { id } = useParams();

  const [empData, setEmpData] = useState<employee>();
  const [departments, setDepartments] = useState<department[]>([]);
  const [designations, setDesignations] = useState<designation[]>([]);
  const [mentors, setMentors] = useState<mentor[]>([]);
  const navigate = useNavigate();

  const validationSchema: ZodType<employee | unknown> = z.object({
    firstName: z
      .string()
      .nonempty('Enter First Name')
      .refine((val) => regName.test(val), {
        message: 'Enter Valid First Name',
      }),
    middleName: z.string(),
    email: z
      .string()
      .nonempty({ message: 'Email is required' })
      .email({ message: 'Invalid Email' }),
    lastName: z
      .string()
      .nonempty('Enter Last Name')
      .refine((val) => regName.test(val), {
        message: 'Enter Valid Last Name',
      }),
    dateOfBirth: z.date().refine((value) => value !== null, {
      message: 'Invalid Date',
      path: ['dateOfBirth'],
    }),
    // dateOfBirth: z.date(),
    gender: z.string().nonempty('Gender is required'),
    maritalStatus: z.string().nonempty('Select Marital status'),
    status: z.string().nonempty('Select Status'),
    pan: z
      .string()
      .nonempty('Pan number is required')
      .refine((val) => regPan.test(val), {
        message: 'Enter Valid Pan Number ',
      }),
    aadhar: z
      .string()
      .nonempty('Aadhar is required')
      .refine((val) => regAadharNumber.test(val), {
        message: 'Enter Valid Aadhar Number',
      }),
    nationality: z.string().min(1, { message: 'choose natioality' }),
    fatherName: z
      .string()
      .nonempty('Father Name is required')
      .refine((val) => regName.test(val), {
        message: 'Enter valid Aadhar Number',
      }),
    spouseName: z.string().nullable(),
    nomineeName: z.string().nullable(),
    nomineeRelation: z.string().nullable(),
    mentorId: z.number().min(1, { message: 'Please select a valid mentor' }),
    employment: z.object({
      employmentId: z.optional(z.number()),
      employeId: z.optional(z.number()),
      dateOfJoining: z.date(),
      departmentId: z
        .number()
        .min(1, { message: 'Please select your department' }),
      designationId: z
        .number()
        .min(1, { message: 'Please select your designation' }),
      employmentType: z
        .string()
        .nonempty({ message: 'Please select employment type' }),
      workMode: z
        .string()
        .nonempty({ message: 'Please select valid work mode' }),
      uan: z.string().nullable(),
      esic: z.string().nullable(),
      ctc: z.number().nullable(),
      companyProvidedBankAccountId: z.optional(z.number()).nullable(),
      status: z.optional(z.number()).nullable(),
    }),
    bankDetails: z
      .array(
        z.object({
          bankDeatilsId: z.optional(z.number()),
          userId: z.optional(z.number()),
          employeeId: z.optional(z.number()),
          accountNumber: z.string().min(1), // Assuming at least one character is required
          ifscCode: z.string(),
          branch: z.string(),
          name: z.optional(z.string()),
          isCompanyProvided: z.optional(z.boolean()),
        })
      )
      .min(1, { message: 'Please add bank Account' }),
  });

  const { data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: {
      empId: Number(id),
    },
    fetchPolicy: 'no-cache',
  });

  console.log(id);
  if (data) console.log(data.employeeById);

  const fetchEmployeeData = async () => {
    await employeeService.getEmployeeById(Number(id)).then((data) => {
      if (data) {
        console.log(data);
        console.log(data.result);
        setEmpData(data.result);
        console.log(empData);
      }
    });
  };

  useEffect(() => {
    fetchEmployeeData();
    fetchDepartments(setDepartments);
    fetchMentors(setMentors);
    fetchDesignaitons(setDesignations);
  }, []);

  useEffect(() => {
    console.log(empData, mentors);
  }, [empData, departments, mentors, designations]);

  const onSubmit: SubmitHandler<employee> = async (reqObj) => {
    console.log(reqObj);
    reqObj.userId = Number(id);
    reqObj.employeeId = Number(empData?.employeeId);
    if (reqObj.bankDetails === null) {
      reqObj.bankDetails = [];
    } else {
      reqObj.bankDetails &&
        reqObj.bankDetails.map(
          (item) => (item.employeeId = empData?.employeeId)
        );
    }
    if (reqObj.employment) reqObj.employment.employeeId = empData?.employeeId;
    console.log(reqObj);
    await employeeService.updateEmployee(reqObj).then((res) => {
      console.log(res);
      navigate('/employeelist');
      ToastrService.success('Employee updated successfully');
    });
  };

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
                  <ol className="breadcrumb mb-0 p-0 bg-transparent">
                    <li className="breadcrumb-item">
                      <Link to="/employeelist">Employee List</Link>
                    </li>
                    <li className="breadcrumb-item active d-flex align-items-center">
                      Employee Edit
                    </li>
                  </ol>
                </div>
              </div>
              <div className="col-md-12">
                <div className="d-flex align-items-center">
                  <div>
                    <h3 className="text-dark mb-0">Employee Edit</h3>
                  </div>
                </div>
              </div>
            </div>
            {/* insert employee details component here  start from card */}

            {/* {data && (
              <Employeeform
                onSubmit={onSubmit}
                data={data.employeeById as employee}
                departments={departments}
                mentors={mentors}
                designations={designations}
                validationSchema={validationSchema}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeEdit;
