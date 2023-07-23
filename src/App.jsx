import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/pages/Login'
import Home from './components/pages/Home'
import PageOne from './components/pages/PageOne'
import UserRoute from './components/routes/UserRoute'
import NoneUserRoute from './components/routes/NoneUserRoute'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login } from './store/userSlice'
import { auth } from './components/firebase'
import axios from 'axios'

function App() {
  const dispatch = useDispatch()

  const currentUser = async (authtoken) => {
    return axios.post('http://192.168.0.145:8080/api/currentuser', {}
      ,{
        headers: {
          authtoken
        }
      }
    )
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(user) => {
      if (user) {
        const idToken = await user.getIdTokenResult()
        // console.log('idToken', idToken.token);
        // console.log('useEffect', user.email);
        currentUser(idToken.token)
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
      }
    })
    
    return ()=> unsubscribe()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<NoneUserRoute><Login/></NoneUserRoute>} />

      <Route path="/home" element=
        {
          <UserRoute>
            <Home/>
          </UserRoute> 
        } 
      />

      <Route path="/page1" element=
        {
          <UserRoute>
            <PageOne/>
          </UserRoute>
        } 
      />
    </Routes>
  )
}

export default App
