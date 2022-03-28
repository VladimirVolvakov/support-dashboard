import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const useAuthStatus = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)

    // Get user from the state:
    const {user} = useSelector(state => state.auth)

    useEffect(() => {
        // Check if user is logged in:
        if (user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }

        setIsLoading(false)
    }, [user])

    return {loggedIn, isLoading}
}