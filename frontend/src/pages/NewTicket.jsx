import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import Spinner from '../layout/Spinner';
import BackButton from '../components/BackButton';

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [type, setType] = useState('Incident');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate('/tickets');
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ type, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url='/' />
      <section>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section>
        <div>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' value={name} disabled />
        </div>

        <div>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' value={email} disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor='type'>Type</label>
            <select
              name='type'
              id='type'
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value='Service Request'>Service Request</option>
              <option value='Change Request'>Change Request</option>
              <option value='Incident'>Incident</option>
              <option value='Problem'>Problem</option>
            </select>
          </div>

          <div>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <button>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
