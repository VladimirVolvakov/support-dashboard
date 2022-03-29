import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new ticket:
export const createTicket = createAsyncThunk(
    'ticket/create', 
    async (ticketData, thunkAPI) => {
        try {
            // Get user token:
            const token = thunkAPI.getState().auth.user.token
            // Create a ticket:
            return await ticketService.createTicket(ticketData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Create slice:
export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

// Reset state:
export const { reset } = ticketSlice.actions

export default ticketSlice.reducer