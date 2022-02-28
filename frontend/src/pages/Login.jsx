import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // if register is error, create a toast
    if (isError) {
      toast.error(message);
    }

    // redirect when logged in if success
    if (isSuccess) {
      navigate('/');
    }

    dispatch(reset());
  }, [dispatch, navigate, isError, isSuccess, message, user]);

  // reusable by all input fields
  // gets the previousState then changes the current target only
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login your account</p>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>

          <div>
            <input
              type='password'
              id='password'
              name='password'
              autoComplete='on'
              value={password}
              onChange={onChange}
              placeholder='Enter your password'
              required
            />
          </div>

          <div>
            <button>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
