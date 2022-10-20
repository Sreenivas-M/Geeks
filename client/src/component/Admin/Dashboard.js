import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


function Dashboard() {
  const data = useContext(GlobalContext);
  const [allUsers] = data.authApi.allUsers;
  const [token] = data.token;

  const navigate = useNavigate();
  const params = useParams();


const delHandler = async (userId) =>  {

  if (window.confirm(`Are you sure to delete user is = ${userId}?`)){
    const res = await axios.delete(
      `/api/v1/auth/deleteProfile/${userId}`,      
      {
        headers: {
          Authorization: token,
        },
      }
    );   
    toast.success("Profile Deleted successfully");
    window.location.reload("/");    
  } else {
    toast.warning("delete terminated");
  }
}

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3">All Users</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr className="text-center">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Profession</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers && allUsers.map((item, index) => {
                                return (
                                    <tr className="text-center" key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.profession}</td>
                                        <td>{item.role}</td>
                                        <td className="d-flex justify-content-evenly">
                                            <NavLink to={`/profile/update/${item._id}`}>
                                                <button className='btn btn-success'>Update</button>
                                            </NavLink>
                                            <button className="btn btn-sm btn-danger" onClick={() => delHandler(item._id)} >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Dashboard