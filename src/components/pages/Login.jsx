import React from 'react'

import { auth, googleAuthProvider } from '../firebase'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../store/userSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const { user } = useSelector((state) => ({...state}))
  
  const dispatch = useDispatch()
  const navigate = useNavigate();
  console.log(user.value);

  const createAndUpdateUser = async (authtoken) => {
    return axios.post('http://192.168.0.145:8080/api/auth', {}
      ,{
        headers: {
          authtoken
        }
      }
    )
  }

  const handleLoginByGoogle = async () => {
    auth.signInWithPopup(googleAuthProvider)
    .then(async(result)=>{
      // console.log('result', result);
      const {user} = result
      const idToken = await user.getIdTokenResult()
      // console.log(user.email.split("@")[1]);
 
      if (user.email.split("@")[1] == 'kdr.co.th') {
        createAndUpdateUser(idToken.token)
        .then((res)=>{
          // console.log(res);
          // go redux
          dispatch(login({
            email: res.data.email,
            name: res.data.name,
            token: idToken.token,
            image: res.data.image,
            loginStatus: res.data.loginStatus,
            role: res.data.role
          }))
        })
        .catch((err)=>{
          console.log(err);
        })
        navigate('/home')
      } else {
        auth.signOut()
        window.location.href = '/'
        console.log('test');
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div>
      <h1>{user.value}</h1>
      <button onClick={handleLoginByGoogle}>SignIn Google</button>
      <hr />
      <button onClick={() => dispatch(login())}>Login</button>
      
    </div>
  )
}

export default Login