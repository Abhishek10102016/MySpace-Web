import { Link, useParams, useSearchParams } from 'react-router-dom';
import styles from './my-details.module.css';
import EmployeePersonalDetails from '../employee-personal-details/employee-personal-details';
import { useEffect, useState } from 'react';
import EmployeeBankDetails from '../employee-bank-details/employee-bank-details';
import EmployeeEmploymentDetail from '../employee-employment-detail/employee-employment-detail';

/* eslint-disable-next-line */
export interface MyDetailsProps { }

export function MyDetails(props: MyDetailsProps) {

  const [showPersonalDetails, setShowPersonalDetails] = useState<boolean>(true);
  const [showBankDetails, setShowBankDetails] = useState<boolean>(false);
  const [showEmployment, setShowEmployment] = useState<boolean>(false);
  const [employeeId, setEmployeeId] = useState<number>(0);
  const [otherEmployeeId, setOtherEmployeeId] = useState<any>(0);
  const params = useParams();

  useEffect(() => {
    if (params !== null && params !== undefined) {
      setOtherEmployeeId(params.id);
    }
  }, [otherEmployeeId, params])

  console.log(otherEmployeeId, "otherEmployeeId");

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="reverse-mode">
          <div
            className="overflow-hidden dashboard-part"
            style={{ height: '100%' }}
          >
            {showPersonalDetails && <EmployeePersonalDetails setShowPersonalDetails={setShowPersonalDetails} setShowBankDetails={setShowBankDetails} setEmployeeId={setEmployeeId} otherEmployeeId={otherEmployeeId} />}
            {showBankDetails && <EmployeeBankDetails setShowPersonalDetails={setShowPersonalDetails} setShowBankDetails={setShowBankDetails} setShowEmployment={setShowEmployment} employeeId={employeeId} otherEmployeeId={otherEmployeeId}/>}
            {showEmployment && <EmployeeEmploymentDetail setShowBankDetails={setShowBankDetails} setShowEmployment={setShowEmployment} employeeId={employeeId} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDetails;
