import React from 'react'
import '../App.css'


const Home = () => {
  
  return (
    <>
      <div className='heading-main'>
        <div>
          <img className='image-1' src="./image-1.avif" alt="image-1" />
          <h1 className='heading-1'>This is Title</h1>
          <p className='para-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Hic voluptate pariatur ducimus illum doloremque, veritatis
            assumenda animi magni repellat explicabo odit corporis
            aliquam similique modi.</p>
        </div>
        <div>
          <img className='image-2' src="./image-2.avif" alt="" />
        </div>
      </div>
    </>
  )
}

export default Home
