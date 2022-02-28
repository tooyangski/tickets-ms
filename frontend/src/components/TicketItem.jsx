import { Link } from 'react-router-dom';

const TicketItem = ({ ticket }) => {
  return (
    <div>
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.product}</div>
      <div>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`}>View</Link>
    </div>
  );
};

export default TicketItem;
