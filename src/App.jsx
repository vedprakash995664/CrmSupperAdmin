import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './Components/Login'
import MainDashboard from './Pages/MainDashboard'
import AddUser from './Pages/AddUser'
import ManageUser from './Pages/ManageUser'
import UsersFullPage from './Pages/UsersFullPage'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<MainDashboard/>}/>
          <Route path='/addUser' element={<AddUser/>}/>
          <Route path='/manageUser' element={<ManageUser/>}/>
          <Route path='/manageUser/userFullPage' element={<UsersFullPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
