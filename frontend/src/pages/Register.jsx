import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../layout/Spinner';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

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

    if (password !== confirmPassword) {
      toast.error('Passwords does not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Full Name'
              required
            />
          </div>

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
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              autoComplete='on'
              value={confirmPassword}
              onChange={onChange}
              placeholder='Confirm your password'
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

export default Register;
