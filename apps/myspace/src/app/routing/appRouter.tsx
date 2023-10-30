import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RequireAuth, WithoutLogin } from './requireAuth';
import {
  Login,
  Dashboard,
  Profile,
  Employeelist,
  EmployeeEdit,
  EmployeePersonalDetails,
  Leavestable,
  Leaveapply,
  Departmentlist,
  EmployeeBankDetails,
  EmployeeEmploymentDetail,
} from '../views';
import MyLeaves from '../views/leave/myleaves/myleaves';
import MyDetails from '../views/employee/my-details/my-details';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<RequireAuth />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/employees" element={<RequireAuth />}>
          <Route index element={<Employeelist />} />
        </Route>
        <Route path="/employee/:id" element={<RequireAuth />}>
          <Route index element={<MyDetails />} />
        </Route>
        <Route path="/mydetails" element={<RequireAuth />}>
          <Route index element={<MyDetails />} />
        </Route>
        {/* <Route path="/employee/bankdetails" element={<RequireAuth />}>
          <Route index element={<EmployeeBankDetails />} />
        </Route>
        <Route path="/employee/employmentdetails" element={<RequireAuth />}>
          <Route index element={<EmployeeEmploymentDetail />} />
        </Route> */}
        <Route path="/profile" element={<RequireAuth />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/leaves" element={<RequireAuth />}>
          <Route index element={<Leavestable />} />
        </Route>
        <Route path="/myleaves" element={<RequireAuth />}>
          <Route index element={<MyLeaves />} />
        </Route>
        {/* <Route path="/leaveapply" element={<RequireAuth />}>
          <Route index element={<Leaveapply />} />
        </Route> */}
        <Route path="/department" element={<RequireAuth />}>
          <Route index element={<Departmentlist />} />
        </Route>
        <Route path="/" element={<WithoutLogin />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
