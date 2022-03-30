import { getTickets, reset } from '../features/tickets/ticketSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

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
        <>Tickets</>
    )
}

export default Tickets