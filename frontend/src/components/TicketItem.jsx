import { Link } from 'react-router-dom'

const ticketItem = ({ ticket }) => {
    return (
        <div className='ticket'>
            <div>{new Date(ticket.createdAt).toLocaleString('en-GB')}</div>
            <div>{ticket.product}</div>
            <div className={`status status-${ticket.status}`}>{ticket.status}</div>
            <Link className='btn btn-reverse btn-sm' to={`/ticket/${ticket._id}`}>View</Link>
        </div>
    )
}

export default ticketItem