import React from 'react'
import '../App.css'

const signUp = () => {
  return (
    <>
    <div className='login-page'>
      <div>
        <div>
          <h1 className='login-text'>Sign-up</h1>
        </div>
        <p className='Email'>Name</p>
        <input className='input' type="text" />
        <p className='Email'>Email</p>
        <input className='input' type="text" />
        <p className='pass'>Password</p>
        <input className='input' type="text" />
        <div>
          <button className='btn-submit'>SignUp</button>
        </div>
      </div>

    </div>
    </>
  )
}

export default signUp
