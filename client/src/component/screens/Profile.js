import React, { useState, useContext } from 'react'
import {GlobalContext} from '../../GlobalContext'
import { NavLink } from "react-router-dom";

function Profile() {
  const data = useContext(GlobalContext);
  const [user] = data.authApi.userData;
  const [isUser] = data.authApi.isUser;

  const [isEdit, setEdit] = useState(false)

  const toggleEdit = () => {
    setEdit(!isEdit)
  }

  return (
   <div className="container">
    <div className="row">
        <div className="col-md-12 text-center">
          <h5 className="display-5 text-success p-5">Profile Info</h5>
        </div>
    </div>

    <div className="row">
        
        <div className="col-md-6 offset-md-3 mb-2">
          <div className="card">
            <div className="card-header">
                <h5 className="text-center display-5"> {user.name} </h5>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Email</strong>
                  <span className="text-secondary float-end"> {user.email} </span>
                </li>
                <li className="list-group-item">
                  <strong>Mobile</strong>
                  <span className="text-secondary float-end"> {user.mobile} </span>
                </li>
                <li className="list-group-item">
                  <strong>Profession</strong>
                  <span className="text-secondary float-end"> {user.profession} </span>
                </li>
                <li className="list-group-item">
                  <strong>Role</strong>
                  <span className="text-secondary float-end"> {user.role} </span>
                </li>
                <li className="list-group-item text-center">
                      <NavLink to={`/profile/userupdate/${user._id}`}>
                        <button className='btn btn-success'>Update</button>
                      </NavLink>
                </li>               
              </ul>
            </div>
            </div>
        </div>
    </div>
   </div>
  )
}

export default Profile