import { employeeService } from '../services/API/Employee';
import { designationService } from '../services/API/Designations';
import { departmentService } from '../services/API/Department';
import { SetStateAction, Dispatch } from 'react';
import { department, designation, mentor } from '../types/types';

export const genders = [
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' },
  { id: 3, name: 'Other' },
];

export const employmentTypes = [
  { id: 'FULLTIME', name: 'Full Time' },
  { id: 'PARTTIME', name: 'Part Time' },
];

export const employeeStatus = [
  { id: 'ACTIVE', name: 'Active' },
  { id: 'INACTIVE', name: 'In Active' },
];

export const workModes = [
  { id: 'WHO', name: 'Work From Home' },
  { id: 'WFO', name: 'Work From Office' },
  { id: 'HYBRID', name: 'Hybrid' },
];

export const maritalStatus = [
  { id: 1, name: 'Single' },
  { id: 2, name: 'Married' },
  { id: 3, name: 'Divorced' },
];

export const leaveTypes = [
  { id: 'FULLDAY', name: 'Full Day' },
  { id: 'HALFDAY', name: 'Half Day' },
];

export const RequestedForTypes = [
  { id: 'LEAVE', name: 'Leave' },
  { id: 'WFH', name: 'Work From Home' },
];

export const leaveCategories = [
  { id: 'CL', name: 'Casual Leave' },
  { id: 'LOP', name: 'Leave Without Pay' },
  { id: 'SL', name: 'Sick Leave' },
];

export const leaveStatus = [
  { id: 'PENDING', name: 'Pending' },
  { id: 'APPROVED', name: 'Approved' },
  { id: 'REJECTED', name: 'Rejected' },
  { id: 'CANCELLED', name: 'Cancelled' },
];

export const leaveStatusAction = [
  { id: 'PENDING', name: 'Pending' },
  { id: 'APPROVED', name: 'Approve' },
  { id: 'REJECTED', name: 'Reject' },
  { id: 'CANCELLED', name: 'Cancel' },
];

export const fetchDepartments = async (
  setDepartments: Dispatch<SetStateAction<department[]>>
) => {
  await departmentService.getAllDepartments().then((res) => {
    console.log(res);
    setDepartments(res.result.departmentList);
  });
};

export const fetchMentors = async (
  setMentors: Dispatch<SetStateAction<mentor[]>>
) => {
  await employeeService.getMentorList().then((res) => {
    console.log(res);
    setMentors(res.result);
  });
};

export const fetchDesignaitons = async (
  setDesignations: Dispatch<SetStateAction<designation[]>>
) => {
  await designationService.getAllDesignations().then((res) => {
    console.log(res);
    setDesignations(res.result);
  });
};
