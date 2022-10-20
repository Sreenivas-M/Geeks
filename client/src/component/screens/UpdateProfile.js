import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { GlobalContext } from "../../GlobalContext";
import { useNavigate, useParams } from "react-router-dom";
import useValidation from '../Util/FormValidation'

function UpdateProfile() {
      //context
  const data = useContext(GlobalContext);
  const [user] = data.authApi.userData;
  const [isUser] = data.authApi.isUser;
  const [allUsers] = data.authApi.allUsers;
  const [token] = data.token;

  //ref for navigation
  const navigate = useNavigate();
  const params = useParams();
  const {errors, validate} = useValidation()

  
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    profession: ""   
  });


  useEffect(()=> {
    const single = allUsers.find((item) => item._id === params.id)
    setUserData(single)
  },[])


  const submitHandler = async (e) => {
    e.preventDefault(); 

    const res = await axios.patch(
      `/api/v1/auth/updateProfile/${params.id}`,
      { ...userData },
      {
        headers: {
          Authorization: token,
        },
      }
    );   
    toast.success("Profile Updated successfully");
    navigate(`/profile`);
  };

  const readValue = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3">Update Profile</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-3">
            <div className="card">
            <div className="card-body">
              <form autoComplete="off" onSubmit={submitHandler} >
                  <div className="form-group mt-2 mb-2">
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" id="name" value={userData.name} onChange={readValue} className="form-control" required />
                    {
                      errors && errors.name ? (
                        <div className="alert alert-danger">{errors.name}</div>
                      ) : null
                    }
                  </div>
                  <div className="form-group mt-2 mb-2">
                                  <label htmlFor="category">Profession</label>
                                  <select name="profession" id="profession" value={userData.profession} onChange={readValue} className="form-select" required>
                                          <option value="">Select Profession</option>
                                          <option value="employee">Employee</option>                                           
                                          <option value="unemployed">UnEmployed</option>                                            
                                          <option value="student">Student</option>
                                  </select>
                              </div>
                <div className="form-group mt-2 mb-2">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" value={userData.email} onChange={readValue} className="form-control" required />
                  {
                      errors && errors.email ? (
                        <div className="alert alert-danger">{errors.email}</div>
                      ) : null
                    }
                  </div>
                <div className="form-group mt-2 mb-2">
                  <label htmlFor="mobile">Mobile</label>
                  <input type="number" name="mobile" id="mobile" value={userData.mobile} onChange={readValue} className="form-control" required />
                  {
                      errors && errors.mobile ? (
                        <div className="alert alert-danger">{errors.mobile}</div>
                      ) : null
                    }
                  </div>                  
                <div className="form-group mt-2 mb-2">
                  <input type="submit" value="Update" className="btn btn-outline-success" />
                  </div>
              </form>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile