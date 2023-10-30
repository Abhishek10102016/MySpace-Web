import { BrowserRouter, Router, Routes } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import {
    Login,
    Dashboard,
    Profile,
    EmployeeEdit,
    Employeelist,
    EmployeePersonalDetails
} from "../views";
import { RequireAuth } from "./requireAuth";
import { createMemoryHistory, createBrowserHistory } from "history"
import { Route } from "react-router-dom";
import { History } from "history";

jest.mock('../views', () => {
    return {
        Dashboard: () => <div>Dashboard Component</div>
    }
})
jest.mock('../views/login',() => {
    return {
        Login: () => <div>Login Component</div>
    }
})
jest.mock('../views/profile', () => {
    return {
        Profile: () => <div>Profile Component</div>
    }
})
jest.mock('../views/employee/employee-edit', () => {
    return {
        EmployeeEdit: () => <div>Employee Edit Component</div>
    }
})
jest.mock('../views/employee/employee-personal-details', () => {
    return {
        EmployeePersonalDetails: () => <div>employee Personal Details Component</div>
    }
})
jest.mock('../views/employee/employeelist', () => {
    return{
        Employeelist: () => <div>Employee List Component</div>
    }
})

jest.mock('./requireAuth', () => ({
    RequireAuth: () => <div>Mocked RequireAuth</div>,
    WithoutLogin: () => <div>Mocked WithoutLogin</div>,
}));


describe('App router', () => {
    it('test dashboard route', () => {
        const history = createBrowserHistory();
        history.push('/dashboard')
        window.history.pushState({}, "", "/dashboard")
        render(
            <BrowserRouter>
               <Dashboard />
            </BrowserRouter>

        )
        expect(screen.getByText('Dashboard Component')).toBeInTheDocument();
    })

    it('render employeeList', () => {
        const history = createMemoryHistory();
        window.history.pushState({}, "", "/employeelist")
        render(
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Employeelist />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
        expect(screen.getByText('Employee List Component')).toBeInTheDocument();
    })

    it('render employeeEdit', () => {
        const history = createMemoryHistory();
        window.history.pushState({}, "", "/employee/edit/:id")
        render(
            <BrowserRouter>
                <Routes>
                    <Route>
                        <EmployeeEdit />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
        expect(screen.getByText('Employee Edit Component')).toBeInTheDocument();
    })

    it('render empoyee/personalDetails', () => {
        const history = createMemoryHistory();
        window.history.pushState({}, "", "/employee/personaldetails")
        render(
            <BrowserRouter>
                <Routes>
                    <Route>
                        <EmployeePersonalDetails />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
        expect(screen.getByText('employee Personal Details Component')).toBeInTheDocument();
    })

    it('render Profile', () => {
        const history = createMemoryHistory();
        history.push('/Profile')
        window.history.pushState({}, "", "/profile")
        render(
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Profile />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
        expect(screen.getByText('Profile Component')).toBeInTheDocument();
    })

    it('render Login', () => {
        const history = createMemoryHistory();
        window.history.pushState({}, "", "/login" )
        render(
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Login />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
        expect(screen.getByText('Login Component')).not.toBeInTheDocument();
    })
})