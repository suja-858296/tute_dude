import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => {
  return (
    <>
      <div className='navbar'>
        <a className='logo' to="/"><img className='logo-1 ' src="logo.avif" alt="logo" /></a>
        <Link className='home' to="/">Home</Link>
        <div className='navbar-2'>
          <Link className='login' to="/login">Login</Link>
          <Link className='signup' to="/signup">SignUp</Link>
          <Link className='dashboard' to="/dashboard">Dashboard</Link>
        </div>
        
      </div>
    </>
  )
}

export default navbar
