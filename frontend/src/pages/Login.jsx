import { FaSignInAlt } from 'react-icons/fa'
import { login } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import Spinner from '../components/Spinner'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const dispatch = useDispatch()

    const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.auth)

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = e => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>

                <p>Please log in to get support</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
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
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login