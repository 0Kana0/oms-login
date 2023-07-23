import React from 'react'
import { useSelector } from 'react-redux'
import NoneLoadingToRedirect from './NoneLoadingToRedirect'

const NoneUserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({...state}))
  // console.log('Route', user);

  return user.user && user.user.token
  ? <NoneLoadingToRedirect/> // true
  : children// false
}

export default NoneUserRoute