import React, {useContext} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Menu from './screens/Menu'
import Home from './screens/Home'
import ProtectedRoute from "./middleware/ProtectedRoute";
import Profile from './screens/Profile'
import UpdateProfile from './screens/UpdateProfile'
import AdminDashboard from './Admin/Dashboard'
import Pnf from './Util/Pnf'

/* react toast */
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Company from './screens/Company'
import Userupdate from './screens/Userupdate'

function Main() {
  const context = useContext(GlobalContext)

  const [isLogged, setIsLogged] = context.authApi.isLogged;

  return (
    <Router>
    <Menu />
    <ToastContainer autoClose={1000} position="top-center" />
    <Routes>
        <Route path={`/`} element={<Home/>} />              
        <Route path={`/info`} element={<Company/>} />              
        <Route path={`/login`} element={ isLogged ? <Pnf/> : <Login/>} />
        <Route path={`/register`} element={isLogged ? <Pnf/>: <Register/>} />
        <Route path={`/profile`}  element={<ProtectedRoute auth={isLogged}> <Profile /> </ProtectedRoute>} />
        <Route path={`/profile/update/:id`} element={ <ProtectedRoute auth={isLogged}> <UpdateProfile /> </ProtectedRoute> } />
        <Route path={`/profile/userupdate/:id`} element={ <ProtectedRoute auth={isLogged}> <Userupdate /> </ProtectedRoute> } />
        <Route path={`/admin/dashboard`} element={  <ProtectedRoute auth={isLogged}> <AdminDashboard />  </ProtectedRoute>  }/>
        <Route path={`/login`} element={  <ProtectedRoute auth={isLogged}> <Company />  </ProtectedRoute>  }/>
        <Route path={`/*`} element={<Pnf/>} />
    </Routes>
</Router>
  )
}

export default Main