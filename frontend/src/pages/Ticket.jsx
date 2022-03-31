import { closeTicket, getTicket, reset } from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const Ticket = () => {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector(state => state.tickets)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const { ticketId } = useParams()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
    }, [isError, ticketId, message])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        navigate('/tickets')
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='ticket-page'>
            <header className='ticket-header'>
                <BackButton url='/tickets' />

                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>

                <h3>Date submitted: {new Date(ticket.createdAt).toLocaleString('en-GB')}</h3>

                <h3>Product: {ticket.product}</h3>
                
                <hr />

                <div className='ticket-desc'>
                    <h3>Issue description</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>

            { ticket.status !== 'closed' && (
                <button className='btn btn-block btn-danger' onClick={onTicketClose}>Close Ticket</button>
            ) }
        </div>
    )
}

export default Ticket