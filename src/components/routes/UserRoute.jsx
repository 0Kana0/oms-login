import React from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({...state}))
  // console.log('Route', user);

  return user.user && user.user.token
  ? children // true
  : <LoadingToRedirect/> // false
}

export default UserRoute