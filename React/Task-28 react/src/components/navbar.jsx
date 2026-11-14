import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => {
  return (
    <>
      <div className='navbar'>
        <a className='logo' href="/"><img className='logo-1 ' src="logo.avif" alt="logo" /></a>
        <a className='home' href="/">Home</a>
        <div className='navbar-2'>
          <a className='login' href="/login">Login</a>
          <a className='signup' href="/signup">SignUp</a>
        </div>
        
      </div>
    </>
  )
}

export default navbar
