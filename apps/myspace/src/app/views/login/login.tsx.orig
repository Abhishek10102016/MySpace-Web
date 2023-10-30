import { authService } from '../../../services/API/Login'
import { ToastrService } from '../../../services/Toastr';
import { useNavigate } from 'react-router-dom';
import { ILoginFormValues, userDetails } from '../../../types/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, z } from 'zod';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addToken } from '../../../store/slices/tokenSlice';
import { useQuery } from '@apollo/client';
import { userQueries } from '../../../services/graphql/userQueries';
import { addUserPermissions } from '../../../store/slices/userSlice';
/* eslint-disable-next-line */
export interface LoginProps { }

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const validationSchema: ZodType<ILoginFormValues> = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z.string().refine((val) => passwordRegex.test(val), {
    message:
      'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:',
  }),
});

export function Login(props: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    resolver: zodResolver(validationSchema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ILoginFormValues> = (reqObj) => {
    authService
      .getToken(reqObj)
      .then((data) => {
        dispatch(addToken(String(data)));

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', String(data));
        navigate('/dashboard');
        ToastrService.success('Logged in successfully');
      })
      .catch((err) => {
        ToastrService.error('Something went wrong Authentication failed');
      });
  };

  const { data, loading, error } = useQuery(userQueries.GET_USER_DETAILS);

  if (data) {
    dispatch(addUserPermissions(data.userPermissions.result as userDetails))
  }
  const token = useAppSelector((state) => state.token.value);

  return (
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-4 col-lg-4 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <a
                    href="dashboard.html"
                    className="text-nowrap logo-img text-center d-block py-3 w-100"
                  >
                    <h1 className="logo-text">
                      My <span className="text-indigo">Space</span>
                    </h1>
                  </a>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <div className="form-icon-container">
                        <div>
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <input
                            className={
                              errors.email
                                ? 'form-control error'
                                : 'form-control'
                            }
                            type="text"
                            id="email"
                            placeholder="Email"
                            {...register('email')}
                            autoComplete="off"
                          />

                          {errors.email && (
                            <p className="error-text">
                              {errors.email?.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="form-icon-container">
                        <div>
                          <label
                            className="text-700 form-icon-label"
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <input
                            className={
                              errors.password
                                ? 'form-control error'
                                : 'form-control'
                            }
                            id="password"
                            type="password"
                            placeholder="password"
                            {...register('password')}
                            autoComplete="off"
                          />

                          {errors.password && (
                            <p className="error-text">
                              {errors.password?.message}
                            </p>
                          )}
                        </div>
                        <span className="fa-solid fa-user text-900 fs--1 form-icon"></span>
                      </div>
                    </div>
                    {/* 
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="form-check p-0">
                        <input
                          type="checkbox"
                          id="vehicle1"
                          name="vehicle1"
                          value="Bike"
                        />
                        <label
                          className="form-check-label text-dark ml-2"
                          htmlFor="flexCheckChecked"
                        >
                          Remeber this Device
                        </label>
                      </div>
                      <a className="text-primary fw-bold" href="dashboard.html">
                        Forgot Password ?
                      </a>
                    </div> */}
                    <button
                      className="btn btn-success w-100 py-8 fs-4 mb-4 rounded-2"
                      type="submit"
                    >
                      Sign In
                    </button>
                    {/* <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-4 mb-0 fw-bold">My Space</p>
                      <a
                        className="text-primary fw-bold ms-2"
                        href="authentication-register.html"
                      >
                        Create an account
                      </a>
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
