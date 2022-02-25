import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <>
      <section>
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to='/new-ticket'>
        <FaQuestionCircle /> Create New Ticket
      </Link>

      <Link to='/tickets'>
        <FaTicketAlt /> View My Tickets
      </Link>
    </>
  );
};

export default Home;
