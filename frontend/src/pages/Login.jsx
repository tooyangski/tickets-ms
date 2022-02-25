import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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
  };

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
