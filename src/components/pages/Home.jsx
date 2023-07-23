import React from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../store/userSlice'
import axios from 'axios'

const Home = () => {
  const { user } = useSelector((state) => ({...state}))
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logOutUser = async (email, name) => {
    return axios.post('http://192.168.0.145:8080/api/logoutuser', {}
      ,{
        headers: {
          email, name
        }
      }
    )
  }

  const handleLogout = () => {
    logOutUser(user.user.email, user.user.name)
    auth.signOut()
    dispatch(logout())
    window.location.href = '/'
  }

  return (
    <div>
      Home
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home