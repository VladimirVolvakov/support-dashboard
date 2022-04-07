import { closeTicket, getTicket } from '../features/tickets/ticketSlice'
import { FaPlus } from 'react-icons/fa'
import { getNotes, reset as notesReset } from '../features/notes/noteSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Modal from 'react-modal'
import NoteItem from '../components/NoteItem'
import Spinner from '../components/Spinner'

const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative'
    }
}

Modal.setAppElement('#root')

const Ticket = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')

    const { notes, isLoading: notesIsLoading } = useSelector(state => state.notes)
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
        dispatch(getNotes(ticketId))
    }, [isError, ticketId, message])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        navigate('/tickets')
    }

    // Open / close modal window for adding a note:
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    // Note submitting:
    const onNoteSubmit = e => {
        e.preventDefault()
        closeModal()
    }

    if (isLoading || notesIsLoading) {
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

                <h2>Notes</h2>
            </header>

            { ticket.status !== 'closed' && (
                <button className='btn' onClick={openModal}><FaPlus /> Add Note</button>
            ) }

            <Modal 
                contentLabel='Add Note' 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                style={customStyles}
            >
                <h2>Add note</h2>

                <button 
                    className='btn-close' 
                    onClick={closeModal}
                >X</button>

                <form onSubmit={onNoteSubmit}>
                    <div className='form-group'>
                        <textarea 
                            className='form-control' 
                            id='noteText' 
                            name='noteText' 
                            onChange={e => setNoteText(e.target.value)} 
                            placeholder='Add a note' 
                            value={noteText}
                        ></textarea>
                    </div>

                    <div className='form-group'>
                        <button 
                            className='btn' 
                            type='submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

            { notes.map(note => (
                <NoteItem key={note._id} note={note} />
            )) }

            { ticket.status !== 'closed' && (
                <button className='btn btn-block btn-danger' onClick={onTicketClose}>Close Ticket</button>
            ) }
        </div>
    )
}

export default Ticket