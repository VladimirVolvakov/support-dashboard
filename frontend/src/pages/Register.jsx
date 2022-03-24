import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        // Redirect when logged in:
        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = e => {
        e.preventDefault()

        if (password !== password2) {
            toast.error('Entered passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>

                <p>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input 
                            className='form-control' 
                            id='name' 
                            name='name'
                            onChange={onChange} 
                            placeholder='Enter your name' 
                            required
                            type='text' 
                            value={name} 
                        />
                    </div>

                    <div className='form-group'>
                        <input 
                            className='form-control' 
                            id='email' 
                            name='email'
                            onChange={onChange} 
                            placeholder='Enter your email' 
                            required
                            type='email' 
                            value={email}  
                        />
                    </div>

                    <div className='form-group'>
                        <input 
                            className='form-control' 
                            id='password' 
                            name='password'
                            onChange={onChange} 
                            placeholder='Enter your password' 
                            required
                            type='password' 
                            value={password} 
                        />
                    </div>

                    <div className='form-group'>
                        <input 
                            className='form-control' 
                            id='password2' 
                            name='password2'
                            onChange={onChange} 
                            placeholder='Confirm password' 
                            required
                            type='password' 
                            value={password2} 
                        />
                    </div>

                    <div className='form-group'>
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register