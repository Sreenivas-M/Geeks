import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Menu() {
  const context = useContext(GlobalContext);

  const [isLogged, setIsLogged] = context.authApi.isLogged;
  const [isAdmin, setIsAdmin] = context.authApi.isAdmin;
  const [isUser, setIsUser] = context.authApi.isUser;

  const navigate = useNavigate();

  const logoutUser = async () => {
    if (window.confirm(`Are you sure to logout?`)) {
       await axios.get(`/api/v1/auth/logout`);
          localStorage.clear();
          if (isAdmin) {
            setIsAdmin(false);
          }
          if (isUser) {
            setIsUser(false);
          }
          setIsLogged(false);
      toast.success('Successfully Logout');
      navigate('/');
      window.location.href="/";
    } else {
      toast.warning('Logout terminated')
    }
  }
    
  /* common route */
  const commonRoute = () => {
    return (
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
           <NavLink to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                Account
          </NavLink>
          <ul className="dropdown-menu">
            <li><NavLink to={`/profile`} className="dropdown-item">Profile</NavLink></li>
            <li>                
                {
                  isUser ? null : <NavLink to={`/admin/dashboard`} className="dropdown-item">Admin Dashboard</NavLink>
                }
              </li>              
              <li className="dropdown-divider"></li>
            <li>
                <NavLink to={`/`} onClick={logoutUser} className="btn btn-outline-danger dropdown-item">Logout</NavLink>
              </li>
          </ul>
        </li>       
      </ul>
    )
      
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
      <div className="container">
        <NavLink to={`/`} className="navbar-brand">
              { isAdmin ? "Geeks-Admin" :  "GEEKSYNERGY"}
        </NavLink>

        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-md-between" id="menu">

              <ul className="navbar-nav ms-5">
                  <li className="nav-item">
                    <NavLink to={`/`} className="nav-link">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={`/info`} className="nav-link">Company Info</NavLink>
                  </li>
                  
                </ul>


          {
            isLogged ? commonRoute() : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to={`/login`} className="nav-link">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={`/register`} className="nav-link">Register</NavLink>
                </li>
              </ul>
             )
          }
        </div>
        </div>
    </nav>
  )
}

export default Menu