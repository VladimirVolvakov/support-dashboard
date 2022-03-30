import { createTicket, reset } from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const NewTicket = () => {
    // Get user & tickets from the state:
    const {user} = useSelector(state => state.auth)
    const {isLoading, isSuccess, isError, message} = useSelector(state => state.tickets)

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [product, setProduct] = useState('iPhone')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            dispatch(reset())
            navigate('/tickets')
        }

        dispatch(reset())
    }, [dispatch, isError, isSuccess, navigate, message])
    
    const onSubmit = e => {
        e.preventDefault()

        dispatch(createTicket({product, description}))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url='/' />
            <section className='heading'>
                <h1>Create new ticket</h1>
                <p>Please fill the form below</p>
            </section>

            <section className='form'>
                <div className='form-group'>
                    <label htmlFor='name'>Customer name</label>
                    <input 
                        className='form-control' 
                        disabled 
                        type='text' 
                        value={name} 
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='name'>Customer email</label>
                    <input 
                        className='form-control' 
                        disabled 
                        type='email' 
                        value={email} 
                    />
                </div>

                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='product'>Product</label>
                        <select 
                            id='product' 
                            name='product' 
                            onChange={e => e.target.value(product)} 
                            value={product}
                        >
                            <option value='iPhone'>iPhone</option>
                            <option value='iPad'>iPad</option>
                            <option value='Macbook Pro'>Macbook Pro</option>
                            <option value='Apple Watch'>Apple Watch</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='description'>Description of issue</label>
                        <textarea 
                            className='form-control' 
                            id='description' 
                            name='description' 
                            onChange={e => setDescription(e.target.value)} 
                            placeholder='Describe your issue' 
                            value={description}
                        ></textarea>
                    </div>

                    <div className='form-group'>
                        <button className='btn btn-block'>
                            Submit
                        </button>
                    </div>

                </form>
            </section>
        </>
    )
}

export default NewTicket