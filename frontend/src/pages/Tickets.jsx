import { getTickets, reset } from '../features/tickets/ticketSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import TicketItem from '../components/TicketItem'

const Tickets = () => {
    const { tickets, isLoading, isSuccess } = useSelector(state => state.tickets)

    const dispatch = useDispatch()

    // To clear state if the component is unmount:
    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        // Get user tickets:
        dispatch(getTickets())
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url='/' />
            <h1>Tickets</h1>
            <div className='tickets'>
                <div className='ticket-headings'>
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div><button></button></div>
                </div>

                { tickets.map(ticket => (
                    <TicketItem key={ticket._id} ticket={ticket} />
                )) }
            </div>
        </>
    )
}

export default Tickets