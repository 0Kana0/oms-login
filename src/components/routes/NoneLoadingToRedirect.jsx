import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NoneLoadingToRedirect = () => {
  const navigate = useNavigate()
	const [ count, setCount ] = useState(1)

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCount((currentCount)=> --currentCount)
    },1000)
    // Redirect
    count === 0 && navigate('/home')
    return () => clearInterval(interval)
  },[count])

  return (
    <div>
      <h1></h1>
    </div>
  )
}

export default NoneLoadingToRedirect