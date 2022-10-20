import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

function useAuth(token) {
    const [user, setUser] = useState(null)
    const [isLogged, setIsLogged] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [allUsers, setAllUsers] = useState([])    
    const [callback,setCallback] = useState(false);

    useEffect(() => {
        if (token) {
            const getData = async () => {
                const res = await axios.get(`/api/v1/auth/userinfo`, {
                    headers: { Authorization: token }
                    });                   
                setUser(res.data.user)                
                setIsLogged(true)

                if (res.data.user.role === "superadmin") {
                    setIsAdmin(true);
                    readAllUsers(token);
                  }
                if (res.data.user.role === "user") {
                    setIsUser(true)
                }
            }

            getData()
        }
    },[token])

    // readAll users 
    const readAllUsers =async () => {
        const useList = await axios.get(`/api/v1/auth/allUsers`,{
            headers: {Authorization: token}
        })
        setAllUsers(useList.data.users)
    }


    return {
        userData: [user, setUser],
        isLogged: [isLogged, setIsLogged],
        isUser: [isUser, setIsUser],
        isAdmin: [isAdmin,setIsAdmin],        
        allUsers: [allUsers, setAllUsers],
        callback: [callback,setCallback]
  }
}

export default useAuth

