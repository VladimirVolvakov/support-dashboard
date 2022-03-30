import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import NewTicket from './pages/NewTicket'
import PrivateRoute from './components/PrivateRoute'
import Register from './pages/Register'
import React from 'react'
import Tickets from './pages/Tickets'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return <>
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/new-ticket' element={<PrivateRoute />}>
            <Route path='/new-ticket' element={<NewTicket />} />
          </Route>
          <Route path='/tickets' element={<PrivateRoute />}>
            <Route path='/tickets' element={<Tickets />} />
          </Route>
        </Routes>
      </div>
    </Router>

    <ToastContainer />
  </>
}

export default App
