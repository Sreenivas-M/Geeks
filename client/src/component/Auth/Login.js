import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
 const navigate = useNavigate()

  const readValue = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name]:value})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
      try {
        await axios.post(`/api/v1/auth/login`, user).then(res => {
          toast.success("User Login successful")
          localStorage.setItem('loginToken', true);
            navigate("/")
          window.location.href = "/";
        }).catch(err => toast.error(err.response.data.msg));

      } catch (error) {
        toast.error(error.response.data.msg)
      }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3">Login</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-3">
            <div className="card">
            <div className="card-body">
              <form autoComplete="off" onSubmit={submitHandler} >

                <div className="form-group mt-2 mb-2">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" value={user.email} onChange={readValue} className="form-control" required />
                  </div>
                  <div className="form-group mt-2 mb-2">
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" value={user.password} onChange={readValue} id="password" className="form-control" required />
                  </div>
                <div className="form-group mt-3 mb-2 text-center" >
                  <input type="submit" value="Login" className="btn btn-outline-success" />
                  </div>
              </form>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login