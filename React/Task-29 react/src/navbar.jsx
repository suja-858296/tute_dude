import React from 'react'
import './App.css'

const Navbar = () => {
  return (
    <>
    <div className='Navbar'>
        <div >
            <h1><img className='nav-img' src="./image-8.jpeg" alt="" /></h1>
        </div>
        <div className='Nav-links'>
            <a href="#">Home</a>
            <a href="#">Categories</a>
            <a href="#">About-Us</a>
        </div>
    </div>
    </>
  )
}

export default Navbar
