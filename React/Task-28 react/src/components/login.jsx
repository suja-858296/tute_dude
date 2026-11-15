import React from 'react'
import '../App.css' 

function Login() {
  return (
    <>
    <div className='login-page'>
      <div>
        <div>
          <h1 className='login-text'>Login</h1>
        </div>
        <p className='user-name'>UserName</p>
        <input className='input' type="text" />
        <p className='pass'>Password</p>
        <input className='input' type="text" />
        <div>
          <button className='btn-submit'>Login</button>
        </div>
      </div>

    </div>
    </>
  )
}

export default Login
